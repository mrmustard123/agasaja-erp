import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { test, expect, vi } from 'vitest'
import App from '../App'

test('keeps pre-login pages in a centered public layout', () => {
  const { unmount } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  )

  expect(screen.getByRole('main').className).toContain('public-page')
  unmount()

  render(
    <MemoryRouter initialEntries={['/register']}>
      <App />
    </MemoryRouter>,
  )

  expect(screen.getByRole('main').className).toContain('public-page')
})

test('renders welcome page and navigates via login submit to dashboard', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ token: 'demo-token' }),
    }),
  )

  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>,
  )

  const submitButton = screen.getByRole('button', { name: /Iniciar sesión|Login/i })
  expect(submitButton).toBeTruthy()

  const form = submitButton.closest('form')
  expect(form).toBeTruthy()
  if (form) fireEvent.submit(form)

  expect(await screen.findByRole('heading', { name: /Panel principal|Dashboard/i })).toBeTruthy()
})

test('shows dashboard sidebar with collapsible menu sections', async () => {
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <App />
    </MemoryRouter>,
  )

  const contabilidadButton = await screen.findByRole('button', { name: /contabilidad|accounting/i })
  expect(contabilidadButton).toBeTruthy()

  fireEvent.click(contabilidadButton)

  expect(await screen.findByRole('link', { name: /asientos|entries/i })).toBeTruthy()
})

test('allows opening and closing the dashboard sidebar with a hamburger button', async () => {
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <App />
    </MemoryRouter>,
  )

  const closeButton = await screen.findByRole('button', { name: /cerrar menú|close menu/i })
  expect(closeButton).toBeTruthy()

  fireEvent.click(closeButton)

  const openButton = await screen.findByRole('button', { name: /abrir menú|open menu/i })
  expect(openButton).toBeTruthy()

  fireEvent.click(openButton)

  expect(await screen.findByRole('button', { name: /cerrar menú|close menu/i })).toBeTruthy()
})

test('renders the product movement form on the warehouse route and submits it to the API', async () => {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ message: 'Movement saved' }),
  })

  vi.stubGlobal('fetch', fetchMock)

  render(
    <MemoryRouter initialEntries={['/dashboard/nuevo-movimiento-producto']}>
      <App />
    </MemoryRouter>,
  )

  expect(await screen.findByRole('heading', { name: /nuevo movimiento de producto|new product movement/i })).toBeTruthy()

  fireEvent.change(screen.getByLabelText(/producto|product/i), { target: { value: '12' } })
  fireEvent.change(screen.getByLabelText(/cantidad|quantity/i), { target: { value: '4' } })
  fireEvent.submit(screen.getByRole('button', { name: /guardar movimiento|save movement/i }).closest('form') as HTMLFormElement)

  expect(fetchMock).toHaveBeenCalledWith(
    '/api/movements',
    expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({ Accept: 'application/json' }),
    }),
  )
})

test('uses the local datetime format with a clear validation message for malformed values', async () => {
  render(
    <MemoryRouter initialEntries={['/dashboard/nuevo-movimiento-producto']}>
      <App />
    </MemoryRouter>,
  )

  const dateInput = await screen.findByLabelText(/fecha|date/i)
  expect((dateInput as HTMLInputElement).getAttribute('type')).toBe('text')
  expect((dateInput as HTMLInputElement).value).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)

  fireEvent.change(dateInput, { target: { value: '2026/11/09 20:00:00' } })
  fireEvent.submit((dateInput as HTMLInputElement).closest('form') as HTMLFormElement)

  expect(await screen.findByText(/Formato de fecha inválido|Invalid date format/i)).toBeTruthy()
})
