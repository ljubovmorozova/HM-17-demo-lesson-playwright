import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'

let loginPage: LoginPage

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  await loginPage.open()
})

test('TL-17-3 signIn button disabled when incorrect data inserted', async ({}) => {
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(7))
  await expect(loginPage.signInButton).toBeDisabled()
})

test.skip('TL-17-4 error message displayed when incorrect credentials used', async ({}) => {
  // do not implement test
})

test('TL-17-5 login with correct credentials and verify order creation page', async ({}) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await expect(orderCreationPage.statusButton).toBeVisible()
  await orderCreationPage.checkInnerComponentsVisible()
})

test('TL-17-6 login and create order', async ({ page }) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.nameField.fill('test')
  await orderCreationPage.phoneField.fill('test1234')
  await orderCreationPage.commentField.fill('1234')
  await orderCreationPage.checkCreationPopupVisible(false)
  await orderCreationPage.createOrderButton.click()
  await page.waitForTimeout(1000)
  await orderCreationPage.checkCreationPopupVisible(true)
})

test('TL-17-7 logout', async ({}) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.logoutButton.click()
  await expect(loginPage.signInButton).toBeVisible()
})
