const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite',(err)=>{
    if(err){
        console.error('erreur de connexion :',err.message);
    }else{
        db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL, role TEXT NOT NULL)');
        db.run('CREATE TABLE IF NOT EXISTS annonces(id INTEGER PRIMARY KEY AUTOINCREMENT, userName TEXT NOT NULL,title TEXT NOT NULL,price INTEGER NOT NULL,category TEXT NOT NULL,description TEXT NOT NULL,dateCreation DATE NOT NULL,dateEnd DATE,visibility BOOL NOT NULL, FOREIGN KEY (userName) REFERENCES users(username))');
        db.run('CREATE TABLE IF NOT EXISTS paniers(userId INTEGER NOT NULL, annonceId INTEGER NOT NULL, PRIMARY KEY (userId,annonceId), FOREIGN KEY (userId) REFERENCES users(id), FOREIGN KEY (annonceId) REFERENCES annonces(id))');
        console.log('connecté à la bdd');
    }
});

module.exports=db;