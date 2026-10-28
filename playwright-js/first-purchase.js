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