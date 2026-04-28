import sqlite3 from 'sqlite3';

export const queryDatabase = (dbPath: string, sql: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath);
        db.all(sql, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
            db.close();
        });
    });
};
