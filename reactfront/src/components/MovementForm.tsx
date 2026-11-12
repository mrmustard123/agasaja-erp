import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { t, type Language } from '../i18n'

const DATETIME_FORMAT = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/

const formatLocalDateTime = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, '0')

  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ].join('-') + ' ' + [
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join(':')
}

const isValidDateTime = (value: string) => {
  if (!DATETIME_FORMAT.test(value)) {
    return false
  }

  const normalized = value.replace(' ', 'T')
  const parsed = new Date(normalized)

  return !Number.isNaN(parsed.getTime())
}

type MovementFormState = {
  mov_date: string
  mov_type: 'ENTRADA' | 'SALIDA'
  product_id: string
  mov_cant: string
  mov_lot: string
  reason: string
  comments: string
}

type ProductSuggestion = {
  product_id: number
  product_name: string
  stock: number | string | null
  unit?: string | null
}

type RecentMovement = {
  mov_id: number
  mov_date: string
  mov_type: string
  mov_cant: number
  product_name: string
  comments?: string | null
}

type MovementFormProps = {
  language: Language
}

const getMovementTypeLabel = (value: string, language: Language) => {
  const labels: Record<Language, Record<string, string>> = {
    es: {
      ENTRADA: 'ENTRADA',
      SALIDA: 'SALIDA',
    },
    en: {
      ENTRADA: 'ENTRY',
      SALIDA: 'EXIT',
    },
  }

  return labels[language]?.[value] ?? value
}

const getMovementReasonLabel = (value: string, language: Language) => {
  const labels: Record<Language, Record<string, string>> = {
    es: {
      PRODUCCION: 'PRODUCCION',
      COSECHA: 'COSECHA',
      VENTA: 'VENTA',
      CONSIGNACION: 'CONSIGNACION',
      DEVOLUCION: 'DEVOLUCIÓN',
      ALMACENAJE: 'ALMACENAJE',
    },
    en: {
      PRODUCCION: 'PRODUCTION',
      COSECHA: 'HARVEST',
      VENTA: 'SALE',
      CONSIGNACION: 'CONSIGNMENT',
      DEVOLUCION: 'RETURN',
      ALMACENAJE: 'STORAGE',
    },
  }

  return labels[language]?.[value] ?? value
}

const initialFormState: MovementFormState = {
  mov_date: formatLocalDateTime(new Date()),
  mov_type: 'ENTRADA',
  product_id: '',
  mov_cant: '1',
  mov_lot: '',
  reason: 'PRODUCCION',
  comments: '',
}

export function MovementForm({ language }: MovementFormProps) {
  const [form, setForm] = useState<MovementFormState>(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [dateError, setDateError] = useState('')
  const [productQuery, setProductQuery] = useState('')
  const [productSuggestions, setProductSuggestions] = useState<ProductSuggestion[]>([])
  const [recentMovements, setRecentMovements] = useState<RecentMovement[]>([])
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const fetchRecentMovements = async () => {
    try {
      const response = await fetch('/api/movements/recent?limit=5', {
        headers: {
          Accept: 'application/json',
          ...(localStorage.getItem('auth_token')
            ? { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
            : {}),
        },
      })

      if (!response.ok) {
        return
      }

      const data = (await response.json()) as RecentMovement[]
      setRecentMovements(Array.isArray(data) ? data : [])
    } catch {
      setRecentMovements([])
    }
  }

  const fetchProducts = async (searchValue: string) => {
    const trimmed = searchValue.trim()

    if (!trimmed) {
      setProductSuggestions([])
      setShowSuggestions(false)
      return
    }

    setIsFetchingSuggestions(true)

    try {
      const response = await fetch(`/api/products?search=${encodeURIComponent(trimmed)}&limit=6`, {
        headers: {
          Accept: 'application/json',
          ...(localStorage.getItem('auth_token')
            ? { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
            : {}),
        },
      })

      if (!response.ok) {
        setProductSuggestions([])
        return
      }

      const data = (await response.json()) as ProductSuggestion[]
      const options = Array.isArray(data) ? data : []
      setProductSuggestions(options)
      setShowSuggestions(options.length > 0)
    } catch {
      setProductSuggestions([])
      setShowSuggestions(false)
    } finally {
      setIsFetchingSuggestions(false)
    }
  }

  useEffect(() => {
    void fetchRecentMovements()
  }, [])

  const handleProductChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value
    setProductQuery(nextValue)

    if (/^\d+$/.test(nextValue.trim())) {
      setForm((current) => ({ ...current, product_id: nextValue.trim() }))
      setProductSuggestions([])
      setShowSuggestions(false)
      return
    }

    setForm((current) => ({ ...current, product_id: '' }))
    setShowSuggestions(true)
    void fetchProducts(nextValue)
  }

  const handleProductSelect = (product: ProductSuggestion) => {
    setProductQuery(product.product_name)
    setForm((current) => ({ ...current, product_id: String(product.product_id) }))
    setProductSuggestions([])
    setShowSuggestions(false)
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target

    if (name === 'mov_date') {
      setForm((current) => ({ ...current, mov_date: value }))
      if (!value) {
        setDateError(t('movement.form.invalidDateFormat', language))
        return
      }

      if (!isValidDateTime(value)) {
        setDateError(t('movement.form.invalidDateFormat', language))
        return
      }

      setDateError('')
      return
    }

    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess('')

    if (!isValidDateTime(form.mov_date)) {
      const invalidMessage = t('movement.form.invalidDateFormat', language)
      setDateError(invalidMessage)
      setIsSubmitting(false)
      return
    }

    setDateError('')

    try {
      const token = localStorage.getItem('auth_token')
      const response = await fetch('/api/movements', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          mov_date: form.mov_date,
          mov_type: form.mov_type,
          product_id: Number(form.product_id),
          mov_cant: Number(form.mov_cant),
          mov_lot: form.mov_lot,
          reason: form.reason,
          comments: form.comments,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message || t('movement.form.error', language))
      }

      setSuccess(t('movement.form.success', language))
      setForm(initialFormState)
      setProductQuery('')
      setProductSuggestions([])
      setShowSuggestions(false)
      void fetchRecentMovements()
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : t('movement.form.error', language)
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="movement-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field">
          <span>{t('movement.form.date', language)}</span>
          <input
            name="mov_date"
            type="text"
            value={form.mov_date}
            onChange={handleChange}
            placeholder="yyyy-mm-dd HH:mm:ss"
            inputMode="numeric"
            required
          />
          {dateError && <small className="input-error-message">{dateError}</small>}
        </label>

        <label className="field">
          <span>{t('movement.form.type', language)}</span>
          <select name="mov_type" value={form.mov_type} onChange={handleChange}>
            {(['ENTRADA', 'SALIDA'] as const).map((value) => (
              <option key={value} value={value}>
                {getMovementTypeLabel(value, language)}
              </option>
            ))}
          </select>
        </label>

        <label className="field product-search-field">
          <span>{t('movement.form.product', language)}</span>
          <input
            name="product_id"
            type="text"
            value={productQuery}
            onChange={handleProductChange}
            placeholder={t('movement.form.product.placeholder', language)}
            autoComplete="off"
            required
          />

          {showSuggestions && productSuggestions.length > 0 && (
            <div className="autocomplete-list" role="listbox">
              {productSuggestions.map((product) => (
                <button
                  key={product.product_id}
                  type="button"
                  className="autocomplete-item"
                  onClick={() => handleProductSelect(product)}
                >
                  <span>{product.product_name}</span>
                  <small>
                    {product.stock ?? 0} {product.unit ?? ''}
                  </small>
                </button>
              ))}
            </div>
          )}

          {isFetchingSuggestions && productQuery.trim() && (
            <small className="autocomplete-status">{t('movement.form.searching', language)}</small>
          )}
        </label>

        <label className="field">
          <span>{t('movement.form.quantity', language)}</span>
          <input
            name="mov_cant"
            type="number"
            min="0"
            step="0.01"
            value={form.mov_cant}
            onChange={handleChange}
            required
          />
        </label>

        <label className="field">
          <span>{t('movement.form.lot', language)}</span>
          <input name="mov_lot" type="text" value={form.mov_lot} onChange={handleChange} />
        </label>

        <label className="field">
          <span>{t('movement.form.reason', language)}</span>
          <select name="reason" value={form.reason} onChange={handleChange}>
            {(
              [
                'PRODUCCION',
                'COSECHA',
                'VENTA',
                'CONSIGNACION',
                'DEVOLUCION',
                'ALMACENAJE',
              ] as const
            ).map((value) => (
              <option key={value} value={value}>
                {getMovementReasonLabel(value, language)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="field full-width">
        <span>{t('movement.form.comments', language)}</span>
        <textarea name="comments" value={form.comments} onChange={handleChange} rows={4} />
      </label>

      {error && <p className="alert-banner" role="alert">{error}</p>}
      {success && <p className="success-banner">{success}</p>}

      <div className="form-actions">
        <button type="submit" className="primary-button" disabled={isSubmitting}>
          {isSubmitting ? t('movement.form.saving', language) : t('movement.form.save', language)}
        </button>
      </div>

      <section className="recent-movements-panel">
        <h3>{t('movement.recent.title', language)}</h3>
        {recentMovements.length > 0 ? (
          <ul>
            {recentMovements.map((movement) => (
              <li key={movement.mov_id}>
                <strong>{movement.product_name}</strong>
                <span>
                  {getMovementTypeLabel(movement.mov_type, language)} · {movement.mov_cant}
                </span>
                <small>{movement.mov_date}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>{t('movement.recent.empty', language)}</p>
        )}
      </section>
    </form>
  )
}
