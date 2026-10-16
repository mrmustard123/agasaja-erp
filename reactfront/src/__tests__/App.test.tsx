import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

test('renders welcome page and navigates via login submit to dashboard', async () => {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <App />
    </MemoryRouter>,
  )

  // Ensure login form is present
  const submitButton = screen.getByRole('button', { name: /Iniciar sesión|Login/i })
  expect(submitButton).toBeTruthy()

  // Submit the form to trigger navigation to dashboard
  const form = submitButton.closest('form')
  expect(form).toBeTruthy()
  if (form) fireEvent.submit(form)

  // Dashboard heading should show
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
