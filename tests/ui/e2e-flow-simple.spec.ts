import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'

test('TL-17-1 signIn button disabled when incorrect data inserted', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(7))
  await expect(loginPage.signInButton).toBeDisabled()
})

test('TL-17-2 login with correct credentials and verify order creation page', async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.open()
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.checkInnerComponentsVisible()
})
