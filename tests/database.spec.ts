import { test, expect } from '@playwright/test';
import { queryDatabase } from '../utils/dbUtils';
import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

test('Verificar impacto de datos en la BBDD', async () => {
    
    const dataDir = path.resolve(__dirname, '../data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
    const dbPath = path.resolve(dataDir, 'test_db.sqlite');

    
    const db = new sqlite3.Database(dbPath);
    await new Promise<void>((resolve) => {
        db.serialize(() => {
            db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER, username TEXT)");
            db.run("INSERT INTO users (id, username) VALUES (1, 'franco_qa')", () => resolve());
        });
    });
    db.close();

    
    console.log('🔍 Consultando registro en la base de datos...');
    const sql = "SELECT * FROM users WHERE username = 'franco_qa' LIMIT 1";
    
    const rows = await queryDatabase(dbPath, sql);
    
   
    expect(rows.length).toBeGreaterThan(0);
    expect(rows[0].username).toBe('franco_qa');
    
    console.log('✅ ¡ÉXITO! Registro encontrado en la BBDD:', rows[0].username);
});
