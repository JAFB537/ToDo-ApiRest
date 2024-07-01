import sql from 'mssql'

const DEFAULT_CONFIG = {
    user: "ToDoUser",
    password: "Admin1234+",
    server: "localhost",
    database: "ToDoDB",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
};

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

export const getConnection = async () => {
    try {
        const pool = await sql.connect(connectionString);
        return pool;
    } catch (error) {
        console.error(error);
    }
};

