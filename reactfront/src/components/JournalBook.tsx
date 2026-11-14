import { useEffect, useState } from 'react'
import { t, type Language } from '../i18n'

type JournalEntry = {
  entry_id: number
  entry_date: string
  account_code: string | null
  account_name: string | null
  details: string | null
  balance: number | string | null
  document_number: string | null
}

const formatInputDate = (value: Date) => {
  const year = value.getFullYear()
  const month = `${value.getMonth() + 1}`.padStart(2, '0')
  const day = `${value.getDate()}`.padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const normalizeDateValue = (value: string, language: Language) => {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return ''
  }

  const isoMatch = /^\d{4}-\d{2}-\d{2}$/.exec(trimmedValue)
  if (isoMatch) {
    return trimmedValue
  }

  const yearFirstMatch = /^\d{4}[/-]\d{1,2}[/-]\d{1,2}$/.exec(trimmedValue)
  if (yearFirstMatch) {
    const [year, month, day] = trimmedValue.split(/[/-]/)
    const normalizedMonth = Number(month).toString().padStart(2, '0')
    const normalizedDay = Number(day).toString().padStart(2, '0')

    return `${year}-${normalizedMonth}-${normalizedDay}`
  }

  const localizedMatch = /^\d{1,2}[/-]\d{1,2}[/-]\d{4}$/.exec(trimmedValue)
  if (!localizedMatch) {
    return trimmedValue
  }

  const [firstPart, secondPart, yearPart] = trimmedValue.split(/[/-]/)
  const firstValue = Number(firstPart)
  const secondValue = Number(secondPart)
  const year = Number(yearPart)

  if (!Number.isFinite(year) || !Number.isFinite(firstValue) || !Number.isFinite(secondValue)) {
    return trimmedValue
  }

  const isDayFirst = language === 'es'
  const day = isDayFirst ? firstValue : secondValue
  const month = isDayFirst ? secondValue : firstValue

  if (month < 1 || month > 12) {
    return trimmedValue
  }

  const date = new Date(Date.UTC(year, month - 1, day))

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return trimmedValue
  }

  return [
    date.getUTCFullYear(),
    `${date.getUTCMonth() + 1}`.padStart(2, '0'),
    `${date.getUTCDate()}`.padStart(2, '0'),
  ].join('-')
}

const getDefaultStartDate = () => {
  const date = new Date()
  date.setDate(date.getDate() - 30)
  return formatInputDate(date)
}

const getDefaultEndDate = () => formatInputDate(new Date())

const formatMoney = (value: number | string | null, language: Language) => {
  const numericValue = typeof value === 'number' ? value : Number(value ?? 0)

  if (!Number.isFinite(numericValue)) {
    return '0.00'
  }

  return new Intl.NumberFormat(language === 'es' ? 'es-AR' : 'en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(numericValue))
}

const getDebit = (value: number | string | null) => {
  const numericValue = typeof value === 'number' ? value : Number(value ?? 0)

  return numericValue > 0 ? Math.abs(numericValue) : 0
}

const getCredit = (value: number | string | null) => {
  const numericValue = typeof value === 'number' ? value : Number(value ?? 0)

  return numericValue < 0 ? Math.abs(numericValue) : 0
}

export function JournalBook({ language }: { language: Language }) {
  const [startDate, setStartDate] = useState<string>(getDefaultStartDate)
  const [endDate, setEndDate] = useState<string>(getDefaultEndDate)
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const loadEntries = async (nextStartDate = startDate, nextEndDate = endDate) => {
    const trimmedStart = normalizeDateValue(nextStartDate.trim(), language)
    const trimmedEnd = normalizeDateValue(nextEndDate.trim(), language)

    if (!trimmedStart || !trimmedEnd) {
      setEntries([])
      setError(t('journalBook.invalidRange', language))
      return
    }

    if (trimmedStart > trimmedEnd) {
      setEntries([])
      setError(t('journalBook.invalidRange', language))
      return
    }

    const nextRequestUrl = `/api/journal-entries?start_date=${encodeURIComponent(trimmedStart)}&end_date=${encodeURIComponent(trimmedEnd)}`

    setIsLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('auth_token')
      const response = await fetch(nextRequestUrl, {
        headers: {
          Accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        throw new Error(payload.message ?? t('journalBook.error', language))
      }

      const payload = await response.json()
      const nextEntries = Array.isArray(payload) ? payload : []
      setEntries(nextEntries)
    } catch (loadError) {
      setEntries([])
      setError(loadError instanceof Error ? loadError.message : t('journalBook.error', language))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadEntries()
  }, [])

  const applyFilter = async () => {
    await loadEntries(startDate, endDate)
  }

  return (
    <section className="journal-book" aria-live="polite">
      <div className="journal-filter-panel">
        <div className="journal-filter-row">
          <label className="journal-field">
            <span>{t('journalBook.filter.from', language)}</span>
            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(normalizeDateValue(event.target.value, language))}
            />
          </label>

          <label className="journal-field">
            <span>{t('journalBook.filter.to', language)}</span>
            <input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(normalizeDateValue(event.target.value, language))}
            />
          </label>

          <button type="button" className="primary-button" onClick={applyFilter} disabled={isLoading}>
            {isLoading ? t('journalBook.filter.loading', language) : t('journalBook.filter.apply', language)}
          </button>
        </div>
      </div>

      {error && <p className="alert-banner">{error}</p>}

      {isLoading ? (
        <p className="status-banner">{t('journalBook.filter.loading', language)}</p>
      ) : entries.length === 0 ? (
        <p className="status-banner">{t('journalBook.empty', language)}</p>
      ) : (
        <div className="journal-table-wrapper">
          <table className="journal-table">
            <thead>
              <tr>
                <th>{t('journalBook.table.entryId', language)}</th>
                <th>{t('journalBook.table.date', language)}</th>
                <th>{t('journalBook.table.accountCode', language)}</th>
                <th>{t('journalBook.table.accountName', language)}</th>
                <th>{t('journalBook.table.details', language)}</th>
                <th>{t('journalBook.table.debit', language)}</th>
                <th>{t('journalBook.table.credit', language)}</th>
                <th>{t('journalBook.table.documentNumber', language)}</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={`${entry.entry_id}-${entry.account_code ?? 'account'}`}>
                  <td>{entry.entry_id}</td>
                  <td>{entry.entry_date ? entry.entry_date.slice(0, 16).replace('T', ' ') : '-'}</td>
                  <td>{entry.account_code ?? '-'}</td>
                  <td>{entry.account_name ?? '-'}</td>
                  <td>{entry.details ?? '-'}</td>
                  <td>{entry.balance !== null && Number(entry.balance) > 0 ? formatMoney(getDebit(entry.balance), language) : ' '}</td>
                  <td>{entry.balance !== null && Number(entry.balance) < 0 ? formatMoney(getCredit(entry.balance), language) : ' '}</td>
                  <td>{entry.document_number ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
