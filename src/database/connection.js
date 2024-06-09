import sql from 'mssql'

const dbSettings = {
    user: "sa",
    password: "Root1234+",
    server: "localhost",
    database: "ToDoDB",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
};

export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.error(error);
    }
};

