const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite',(err)=>{
    if(err){
        console.error('erreur de connexion :',err.message);
    }else{
        db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL, role TEXT NOT NULL)');
        db.run('CREATE TABLE IF NOT EXISTS annonces(id INTEGER PRIMARY KEY AUTOINCREMENT, userId TEXT NOT NULL,name TEXT NOT NULL,price INTEGER NOT NULL,category TEXT NOT NULL,description TEXT NOT NULL,dateCreation DATE NOT NULL,dateEnd DATE,visibility BOOL NOT NULL)');
        console.log('connecté à la bdd');
    }
});

module.exports=db;