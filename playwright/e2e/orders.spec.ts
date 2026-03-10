import { test, expect } from '@playwright/test';

import { generateOrderCode } from '../suport/helpers';

/// AAA - Arrange, Act, Assert
/* AAA é um padrão de design para escrever testes de forma clara e organizada. 
   O Arrange é o setup, 
   o Act é a ação 
   e o Assert é a verificação. 
*/

test.describe('Consultar Pedido', () => {

  // test.beforeAll(async () => {
  //   console.log(
  //     'beforeAll: roda uma vez antes de todos os testes.'
  //   )
  // });
  
  test.beforeEach(async ({ page }) => {
    // console.log(
    //   'beforeEach: roda antes de cada teste.'
    // )
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
  });
  
  // test.afterEach(async () => {
  //   console.log(
  //     'afterEach: roda depois de cada teste.'
  //   )
  // });
  
  // test.afterAll(async () => {
  
  //   console.log(
  //     'afterAll: roda uma vez depois de todos os testes.'
  //   )
  // });

  test('Deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    const orderNumber = 'VLO-HEHRNA';
    const orderStatus = 'APROVADO';
  
    // Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(orderNumber);
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();
  
    // Assert
    // await expect(page.getByText('orderNumber')).toBeVisible({timeout:7_000});
    // await expect(page.getByText('orderNumber')).toContainText('orderNumber');
  
    // await expect(page.getByText('orderStatus')).toBeVisible({timeout:7_000});
    // await expect(page.getByText('orderStatus')).toContainText('orderStatus');
  
    // Assert do papitoQA
    const containerPedido = page.getByRole('paragraph')
      .filter({ hasText: /^Pedido$/ })
      .locator('..');
  
      await expect(containerPedido).toContainText(orderNumber, {timeout:7_000});
      await expect(page.getByText(orderStatus)).toBeVisible();
  
    });

    test('Deve consultar um pedido aprovado Snapshot', async ({ page }) => {

      // Test Data
      const orderNumber = 'VLO-HEHRNA';
      const orderStatus = 'APROVADO';
    
      // Act
      await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(orderNumber);
      await page.getByRole('button', { name: 'Buscar Pedido' }).click();
      
      // Assert do papitoQA
      await expect(page.getByTestId(`order-result-${orderNumber}`)).toMatchAriaSnapshot(`
        - img
        - paragraph: Pedido
        - paragraph: ${orderNumber}
        - img
        - text: ${orderStatus}
        - img "Velô Sprint"
        - paragraph: Modelo
        - paragraph: Velô Sprint
        - paragraph: Cor
        - paragraph: Midnight Black
        - paragraph: Interior
        - paragraph: cream
        - paragraph: Rodas
        - paragraph: sport Wheels
        - heading "Dados do Cliente" [level=4]
        - paragraph: Nome
        - paragraph: Eduardo Rezes
        - paragraph: Email
        - paragraph: duduhfoz@gmail.com
        - paragraph: Loja de Retirada
        - paragraph
        - paragraph: Data do Pedido
        - paragraph: /\\d+\\/\\d+\\/\\d+/
        - heading "Pagamento" [level=4]
        - paragraph: À Vista
        - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
        `);
    });
  
    test('Deve consultar um pedido quando não é encontrado', async ({ page }) => {
  
      // Test Data
      const orderNumber =  generateOrderCode();
  
      // Act
      await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(orderNumber);
      await page.getByRole('button', { name: 'Buscar Pedido' }).click();
  
      // Formas do codegen utilizando root que pega toda a pagina
      // await expect(page.locator('#root')).toContainText('Pedido não encontrado');
      // await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente', {timeout:7_000});
  
      const title = page.getByRole('heading', {name: 'Pedido não encontrado'});
      await expect(title).toBeVisible();
  
      const message = page.locator('p', {hasText: 'Verifique o número do pedido e tente novamente'});
      await expect(message).toBeVisible();
  
    });
  
    test('Deve consultar um pedido quando não é encontrado Usando Snapshot', async ({ page }) => {
  
      // Test Data
      const orderNumber = generateOrderCode();
  
      await page.goto('http://localhost:5173/');
      await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  
      await page.getByRole('link', { name: 'Consultar Pedido' }).click();
      await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
  
      // Act
      await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(orderNumber);
      await page.getByRole('button', { name: 'Buscar Pedido' }).click();
  
      await expect(page.locator('#root')).toMatchAriaSnapshot(`
        - img
        - heading "Pedido não encontrado" [level=3]
        - paragraph: Verifique o número do pedido e tente novamente   
      `);
    });
});
