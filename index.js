//Importando Dependencias
const customExpress = require('./config/customExpress');
const con = require('./models/connection');
const migrations = require('./migrations/tables');
//Criando instância do express
const app = customExpress();

con.connect((error) => {
    if(error){
        console.log("Erro: ", error);
    }else{
        migrations.init(con);
        app.listen(3000, () =>{
            console.log("Servidor on");
        });
    }
});