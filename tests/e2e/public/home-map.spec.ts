import { test, expect } from '@playwright/test';

/**
 * Smoke público: un visitante anónimo abre la app y el mapa carga.
 * No depende de tiles externos ni de datos sembrados; solo verifica que el
 * mapa de Leaflet se inicializa correctamente del lado del cliente.
 */
test('la app y el mapa público cargan para un visitante anónimo', async ({
  page,
}) => {
  await page.goto('/');

  // El contenedor de Leaflet aparece una vez que el cliente hidrata y monta el mapa.
  await expect(page.locator('.leaflet-container')).toBeVisible({
    timeout: 30_000,
  });

  // Los controles de zoom confirman que el mapa quedó inicializado, no solo el div.
  await expect(page.locator('.leaflet-control-zoom')).toBeVisible();
});
