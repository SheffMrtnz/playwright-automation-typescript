import { test, expect } from '@playwright/test';

test.describe('API Testing - Pokémon API', () => {

    test('Debe obtener datos de Pikachu correctamente', async ({ request }) => {
        
        const response = await request.get('https://pokeapi.co/api/v2/pokemon/pikachu');

      
        expect(response.status()).toBe(200);

        const body = await response.json();
        
       
        expect(body.name).toBe('pikachu');
        
        expect(body.abilities.length).toBeGreaterThan(0);

        console.log('✅ PokeAPI conectada. Nombre validado:', body.name);
    });
});
