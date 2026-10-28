/**
 * First Purchase (Easy) · Flows › E-commerce
 *
 * 1. Start at the shop and add one Wireless Mouse to the cart.
 * 2. Go to checkout. Don't apply a promo code.
 * 3. Fill the shipping details and keep Standard shipping:
 *      Full name  Priya Shah
 *      Email      priya@example.com
 *      Address    221 MG Road
 *      City       Bengaluru
 *      Country    India
 *      PIN code   560001
 *      Phone      9876543210
 * 4. Pay with the approved test card 4242 4242 4242 4242, expiry 12/30, CVV 123.
 * 5. Wait for the order confirmation page and print the order number it shows.
 */
const { chromium } = require('playwright');

(async () => {
  // ---- TestDojo setup: connects to the browser the checks started. Don't change. ----
  const browser = await chromium.connectOverCDP(process.env.TESTDOJO_CDP || 'http://127.0.0.1:9222');
  const context = browser.contexts()[0];
  const page = context.pages()[0] || (await context.newPage());
  const baseUrl = process.env.TESTDOJO_URL || 'https://testdojo.dev';

  // ---- Your code ----
  await page.goto(`${baseUrl}/flows/shop.html`);

  // TODO: buy one Wireless Mouse, then print the order number,
  // for example: console.log(`Order number: ${orderNumber}`);
  await page.goto(`${baseUrl}/flows/shop.html`);

  await page.getByTestId('add-to-cart-M100').click();
  await page.locator('#cart-count', { hasText: /^1$/ }).waitFor();
  await page.getByRole('button', { name: 'Proceed to checkout' }).click();

  await page.getByRole('button', { name: 'Continue to shipping' }).click();
  await page.getByLabel('Full name').fill('Priya Shah');
  await page.getByLabel('Email').fill('priya@example.com');
  await page.getByLabel('Street address').fill('221 MG Road');
  await page.getByLabel('City').fill('Bengaluru');
  await page.getByLabel('PIN code').fill('560001');
  await page.getByLabel('Phone').fill('9876543210');
  await page.getByRole('button', { name: 'Continue to payment' }).click();

  await page.getByLabel('Name on card').fill('Priya Shah');
  await page.getByLabel('Card number').fill('4242 4242 4242 4242');
  await page.getByLabel('Expiry (MM/YY)').fill('12/30');
  await page.getByLabel('CVV').fill('123');
  await page.locator('#place-order').click();

  const orderNumber = page.getByTestId('order-id').filter({ hasText: /^TD-/ });
  await orderNumber.waitFor();
  console.log(`Order number: ${await orderNumber.textContent()}`);

  // ---- Done. This only disconnects; the browser stays open for the checks. ----
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
