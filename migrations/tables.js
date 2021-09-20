const con = require("../models/connection");

class Tables{
    init(con){
        this.con = con;
        this.usersTable();
    }

    usersTable(){
        const sql = "CREATE TABLE IF NOT EXISTS Users(id int not null auto_increment, name varchar(100) not null, email varchar(100) not null unique, senha varchar(32) not null, primary key(id))";

        con.query(sql, (error) =>{ 
            if(error){
                console.log("Erro: ", error);
            }else{
                console.log("Tabela criada")
            }
        })
    }
}

module.exports = new Tables;