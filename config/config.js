module.exports={
    dbpost: {
        database: 'fraccpost',
        user: 'postgres',
        password: "holi123",
        options: {
            dialect: 'postgres',
            host: 'localhost',
        }
    },

    dbmysql: {
        database: 'fraccmysql',
        user: 'root',
        password: 'amor123',
        options: {
            dialect: 'mysql',
            host: '192.168.1.78'
        }
    }
}