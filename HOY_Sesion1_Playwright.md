# SESION 1: Aprender Playwright desde cero (19 Abr 2026)

> **Objetivo de hoy:** al terminar la sesion tienes UN proyecto real con 3 tests corriendo y subido a GitHub.
> **Tiempo estimado:** 2-2.5 horas | **Nivel:** principiante con base de codigo

---

## BLOQUE 1 — Setup (20-30 min)

### 1.1 Crear el proyecto
Abre terminal en VS Code y ejecuta:
```bash
mkdir playwright-portfolio
cd playwright-portfolio
npm init playwright@latest
```
Cuando pregunte:
- TypeScript: **Yes**
- Tests folder: dejar **tests** (por defecto)
- GitHub Actions: **No** (lo anadimos mas tarde)
- Browsers: **chromium** solo (para empezar rapido)

### 1.2 Explorar lo que se genero (5 min)
Antes de tocar nada, mira los archivos:
- `playwright.config.ts` — configuracion global
- `tests/example.spec.ts` — test de ejemplo generado automaticamente

### 1.3 Ejecutar los tests de ejemplo
```bash
npx playwright test
npx playwright show-report
```
Esto abre el reporte HTML en el navegador. **Ya tienes tests corriendo.** Respira.

---

## BLOQUE 2 — Tu primer test real (45-60 min)

### Target: https://www.saucedemo.com
Web de practica para QA, siempre disponible, no necesita registro.

Crea el archivo `tests/saucedemo.spec.ts` y escribe esto (escribe tu el codigo, usa Copilot para entender, no para copiar):

```typescript
import { test, expect } from '@playwright/test';

test('login exitoso con usuario valido', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('.title')).toHaveText('Products');
});

test('login fallido con usuario bloqueado', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'locked_out_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('anadir producto al carrito', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
```

### Ejecutar y ver en tiempo real
```bash
npx playwright test tests/saucedemo.spec.ts --headed
```
El flag `--headed` abre el navegador. Veras como se mueve solo.

### Si algo falla: modo debug
```bash
npx playwright test tests/saucedemo.spec.ts --debug
```
Pausa el test y te deja inspeccionar paso a paso.

### Ver el reporte final
```bash
npx playwright show-report
```

---

## BLOQUE 3 — Entender lo que escribiste (15-20 min)

Abre **playwright.dev** y lee SOLO estas 3 secciones (no mas):
1. **Locators** — como encuentra elementos (`page.locator`, `page.fill`, `page.click`)
2. **Assertions** — como verifica resultados (`expect().toHaveText`, `expect().toBeVisible`)
3. **page.goto** — como navega

10-15 minutos. No mas. El objetivo es entender QUE hiciste, no memorizarlo todo.

---

## BLOQUE 4 — Subir a GitHub (10-15 min)

### Crear .gitignore
Crea el archivo `.gitignore` en la raiz:
```
node_modules/
test-results/
playwright-report/
```

### Commit y push
```bash
git init
git add .
git commit -m "feat: primer framework Playwright con tests de saucedemo"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/playwright-portfolio.git
git push -u origin main
```
(Primero crea el repositorio en github.com con ese nombre)

---

## CHECKPOINT FINAL

Al terminar, responde SI/NO a estas preguntas:

- [ ] Proyecto creado y tests corriendo localmente?
- [ ] Tengo 3 tests: login exitoso, login fallido, carrito?
- [ ] He ejecutado con `--headed` y he visto el navegador moverse?
- [ ] He visto el reporte HTML?
- [ ] El codigo esta en GitHub?

**5/5 SIs = sesion completada. Siguiente sesion: Page Object Model.**

---

## Proxima sesion (Sesion 2)
- Page Object Model (POM): separar locators de la logica de tests
- Refactorizar estos 3 tests con POM
- Screenshot automatico cuando un test falla
- Anadir un 4o test: checkout completo
