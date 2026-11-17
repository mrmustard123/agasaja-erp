/*
READ ME AGENT
TO DO IN THIS VIEW:
- Implement an excel file export function.


*/
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import type { Locale } from 'date-fns'
import { enUS } from 'date-fns/locale/en-US'
import { es } from 'date-fns/locale/es'
import 'react-datepicker/dist/react-datepicker.css'
import { t, type Language } from '../i18n'
import { useAuth } from '../auth/authContext'


type JournalEntry = {
  entry_id: number
  entry_date: string
  account_code: string | null
  account_name: string | null
  details: string | null
  balance: number | string | null
  document_number: string | null
}

// Locale del calendario por idioma de la app. Al ser un Record<Language, ...>,
// TypeScript te obliga a agregar una entrada cuando sumes un idioma nuevo.
const DATEPICKER_LOCALES: Record<Language, Locale> = {
  es,
  en: enUS,
}

// Formato que ve el usuario (fijo para todos los idiomas). Ojo: MM = mes, mm = minutos.
const DATE_DISPLAY_FORMAT = 'yyyy-MM-dd'

const formatInputDate = (value: Date) => {
  const year = value.getFullYear()
  const month = `${value.getMonth() + 1}`.padStart(2, '0')
  const day = `${value.getDate()}`.padStart(2, '0')

  return `${year}-${month}-${day}`
}

// Inversa de formatInputDate. Construye la fecha con componentes locales
// (new Date('2024-03-05') se interpreta como UTC y puede mostrar el día anterior).
const parseInputDate = (value: string): Date | null => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) {
    return null
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(year, month - 1, day)

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null
  }

  return date
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

type DateFieldProps = {
  id: string
  value: string // siempre yyyy-mm-dd, o '' si está vacío
  language: Language
  onChange: (value: string) => void
}

function DateField({ id, value, language, onChange }: DateFieldProps) {
  return (
    <DatePicker
      id={id}
      selected={parseInputDate(value)}
      onChange={(date: Date | null) => onChange(date ? formatInputDate(date) : '')}
      dateFormat={DATE_DISPLAY_FORMAT}
      locale={DATEPICKER_LOCALES[language]}
      placeholderText={t('journalBook.filter.datePlaceholder', language)}
      strictParsing
      autoComplete="off"
      showMonthDropdown
      showYearDropdown
      showIcon
      dropdownMode="select"
    />
  )
}

export function JournalBook({ language }: { language: Language }) {

  const { apiFetch } = useAuth()
  const [startDate, setStartDate] = useState<string>(getDefaultStartDate)
  const [endDate, setEndDate] = useState<string>(getDefaultEndDate)
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')



  const loadEntries = async (nextStartDate = startDate, nextEndDate = endDate) => {
    // Las fechas del estado ya son yyyy-mm-dd (o ''), así que se comparan como texto
    if (!nextStartDate || !nextEndDate || nextStartDate > nextEndDate) {
      setEntries([])
      setError(t('journalBook.invalidRange', language))
      return
    }

    const nextRequestUrl = `/api/journal-entries?start_date=${encodeURIComponent(nextStartDate)}&end_date=${encodeURIComponent(nextEndDate)}`

    setIsLoading(true)
    setError('')

    try {
      
      const response = await apiFetch(nextRequestUrl)

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
          {/* div + label htmlFor (no <label> envolvente): dentro de un <label>, los clicks
              del calendario se reenvían al input y el calendario se vuelve a abrir */}
          <div className="journal-field">
            <label htmlFor="journal-start-date">
              <span>{t('journalBook.filter.from', language)}</span>
            </label>
            <DateField
              id="journal-start-date"
              value={startDate}
              language={language}
              onChange={setStartDate}
            />
          </div>

          <div className="journal-field">
            <label htmlFor="journal-end-date">
              <span>{t('journalBook.filter.to', language)}</span>
            </label>
            <DateField
              id="journal-end-date"
              value={endDate}
              language={language}
              onChange={setEndDate}
            />
          </div>

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
