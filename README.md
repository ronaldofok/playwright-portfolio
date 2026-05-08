# Playwright Portfolio

Framework de testing E2E con Playwright y TypeScript para [Sauce Demo](https://www.saucedemo.com).

![Playwright Tests](https://github.com/ronaldocojocarumain/playwright-portfolio/actions/workflows/playwright.yml/badge.svg)

## Tests incluidos

**Login (login.spec.ts)**
- Data-driven con JSON: usuario bloqueado, contraseña incorrecta, campos vacíos

**Flujo de compra (saucedemo.spec.ts)**
- Ordenación por precio (dropdown)
- Apertura de producto en nueva tab
- Carrito de compra
- Datos de envío
- Resumen de checkout
- Orden completada

## Características técnicas
- Page Object Model (POM)
- Data-driven testing con JSON + forEach
- Tests organizados en suites con test.describe
- actionTimeout configurado (10s)
- Screenshot y video grabado en caso de fallo
- CI/CD con GitHub Actions en cada push

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