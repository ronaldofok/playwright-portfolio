# Playwright Portfolio

Framework de testing E2E con Playwright y TypeScript para [Sauce Demo](https://www.saucedemo.com).

![Playwright Tests](https://github.com/ronaldocojocarumain/playwright-portfolio/actions/workflows/playwright.yml/badge.svg)

## Tests incluidos

**Login (login.spec.ts)**
- Usuario bloqueado
- Contraseña incorrecta
- Campos vacios

**Flujo de compra (saucedemo.spec.ts)**
- Verificación de inventario
- Carrito de compra
- Datos de envío
- Resumen de checkout
- Orden completada

## Tecnologias
- [Playwright](https://playwright.dev/) v1.x
- TypeScript
- Page Object Model

## Ejecutar tests

instalar dependencias:
npm install
npx playwright install chromium

Todos los tests:
npx playwright test

Solo Chromium:
npx playwright test --project=chromium

Ver reporte:
npx playwright show-report