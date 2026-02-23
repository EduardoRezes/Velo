import { test, expect } from '@playwright/test';

/// AAA - Arrange, Act, Assert
/* AAA é um padrão de design para escrever testes de forma clara e organizada. 
   O Arrange é o setup, 
   o Act é a ação 
   e o Assert é a verificação. 
*/

test('Deve consultar um pedido aprovado', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  // Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-HEHRNA');
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  // Assert
  await expect(page.getByText('VLO-HEHRNA')).toBeVisible({timeout:7_000});
  await expect(page.getByText('VLO-HEHRNA')).toContainText('VLO-HEHRNA');

  await expect(page.getByText('APROVADO')).toBeVisible({timeout:7_000});
  await expect(page.getByText('APROVADO')).toContainText('APROVADO');
});