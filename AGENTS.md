# AGENTS.md — playwright-portfolio

## Comportamiento del agente

- NUNCA reescribir un archivo completo — siempre hacer ediciones quirúrgicas insertando solo el código nuevo
- Antes de editar cualquier archivo, leerlo completo para entender su estructura actual
- Al añadir un test nuevo, insertarlo AL FINAL del archivo, antes del cierre del último bloque
- Si el archivo ya tiene un `beforeEach` con login, el nuevo test NO debe repetir el login — solo añadir lo específico del test
- Excepción: si el test necesita credenciales distintas (ej. locked_out_user), usar `page.goto('/')` y login propio dentro del test

## Comandos

- Correr todos los tests: `npx playwright test`
- Correr solo Chromium: `npx playwright test --project=chromium`
- Correr un test específico: `npx playwright test tests/saucedemo.spec.ts --project=chromium`
- Ver reporte HTML: `npx playwright show-report`
- No hay scripts en package.json — usar siempre `npx playwright`

## Sitio bajo test

- URL base: `https://www.saucedemo.com` (configurada en `playwright.config.ts`)
- Usuario válido: `standard_user` / `secret_sauce`
- No usar `page.goto('https://...')` — usar `page.goto('/')` o el método `goto()` del page object

## Estructura

```
pages/
  LoginPage.ts
  InventoryPage.ts
  Cart.ts
  ShippingData.ts
  CheckoutOverview.ts
  OrderPlaced.ts
tests/
  login.spec.ts
  saucedemo.spec.ts
  example.spec.ts
playwright.config.ts
```

## Convenciones de selectores

- SIEMPRE usar atributos `data-test`: `page.locator('[data-test="username"]')`
- NUNCA usar `getByPlaceholder`, `getByRole`, o XPath
- Ejemplos de data-test del sitio: `username`, `password`, `login-button`, `error`, `title`, `inventory-item`, `add-to-cart-sauce-labs-backpack`, `shopping-cart-link`

## Convenciones de Page Objects

- Locators definidos en el constructor como properties `readonly`
- Métodos async para cada acción: `goto()`, `login()`, `loginError()`, `checkError()`
- Incluir `waitFor({ state: 'visible' })` antes de clicks críticos
- Incluir assertions de URL dentro del método: `expect(this.page).toHaveURL('/inventory.html')`
- Exportar con `export class` (named export), no `export default`

## Convenciones de Tests

- `beforeEach` para login compartido — no repetir login en cada test
- Tests independientes — cada test verifica una sola cosa
- Assertions en cada paso, no solo al final
- Nombres de test en español descriptivo

## Config relevante

- `baseURL`: `https://www.saucedemo.com`
- `actionTimeout`: 10 segundos
- `trace`: on-first-retry, `screenshot`: only-on-failure, `video`: retain-on-failure
- Browsers activos: chromium, firefox, webkit
