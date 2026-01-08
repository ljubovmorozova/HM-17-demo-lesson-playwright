import { Page, Locator } from '@playwright/test'
import { OrderPage } from './order-page'
import { SERVICE_URL } from '../../config/env-data'
import BasePage from './base-page'

const jwt =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmRyZWlrcm0iLCJleHAiOjE3NjQ2MjY5NDMsImlhdCI6MTc2NDYwODk0M30.qY5NsWSqtybtpPCfwFtvwU66BHEupsapz8o_vONaB3s0POp26lvbaKdhYLeO3m_nrNePiYhmCGl2z0PWgZ228w'

export class LoginPage extends BasePage {
  readonly signInButton: Locator
  readonly usernameField: Locator
  readonly passwordField: Locator

  constructor(page: Page) {
    super(page, `${SERVICE_URL}/signin`)
    this.signInButton = page.getByTestId('signIn-button')
    this.usernameField = page.getByTestId('username-input')
    this.passwordField = page.getByTestId('password-input')
  }

  async signIn(username: string, password: string) {
    await this.fillElement(this.usernameField, username)
    await this.fillElement(this.passwordField, password)
    await this.clickElement(this.signInButton)

    return new OrderPage(this.page)
  }

  async mockAuth(): Promise<void> {
    await this.page.route('**/login/student', async (route) => {
      await route.fulfill({
        status: 200,
        body: jwt,
      })
    })
  }
}
