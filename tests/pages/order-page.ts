import { expect, Locator, Page } from '@playwright/test'

export class OrderPage {
  readonly page: Page
  readonly statusButton: Locator
  readonly nameField: Locator
  readonly phoneField: Locator
  readonly commentField: Locator
  readonly createOrderButton: Locator
  readonly successfulCreationPopup: Locator
  readonly logoutButton: Locator

  constructor(page: Page) {
    this.page = page
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.nameField = page.getByTestId('username-input')
    this.phoneField = page.getByTestId('phone-input')
    this.commentField = page.getByTestId('comment-input')
    this.createOrderButton = page.getByTestId('createOrder-button')
    this.successfulCreationPopup= page.locator('main > .popup')
    this.logoutButton = page.getByTestId('logout-button')
  }

  async checkInnerComponentsVisible(): Promise<void> {
    await expect (this.statusButton).toBeVisible();
    await expect (this.statusButton).toBeEnabled();
    await expect (this.nameField).toBeEnabled();
    await expect (this.phoneField).toBeEnabled();
    await expect (this.commentField).toBeEnabled();
    await expect (this.createOrderButton).toBeEnabled();
  }
   async checkCreationPopupVisible(visible = true): Promise<void> {
    await expect(await this.successfulCreationPopup.getAttribute('class')).toContain(visible ? 'popup_opened': 'undefined')
   }
}
