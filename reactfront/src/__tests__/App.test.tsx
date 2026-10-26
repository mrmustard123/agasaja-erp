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
