import { test, expect } from '@playwright/test';

test('Flujo de Integración: Pokémon API con Headers Reales', async ({ request }) => {
    
    
    const headers = {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
    };

    
    const pokemonResponse = await request.get('https://pokeapi.co/api/v2/pokemon/pikachu', { headers });
    
    
    if (pokemonResponse.status() !== 200) {
        console.log("Error de Red detectado:", await pokemonResponse.text());
    }
    
    expect(pokemonResponse.status()).toBe(200);
    const pokemonData = await pokemonResponse.json();

    
    const abilityUrl = pokemonData.abilities[0].ability.url;
    console.log(`🔗 Navegando a la URL: ${abilityUrl}`);

    
    const abilityResponse = await request.get(abilityUrl, { headers });
    expect(abilityResponse.ok()).toBeTruthy();
    
    const abilityData = await abilityResponse.json();
    expect(abilityData.name).toBeDefined();

    console.log('✅ ¡PASS! Conexión exitosa y datos validados.');
});
