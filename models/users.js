const con = require('./connection');

class Users{
    createUser(data, res){
        const sql = "INSERT INTO Users SET ?";
        con.query(sql, data, (error, result) => {
            if(error){
                return res.json(error);
            }
            res.json({status: "Registro concluido"});
        });
    }

    listUser(res){
        const sql = "SELECT * FROM users";
        con.query(sql, (error, result) => {
            if(error){
                return res.json(error);
            }
            res.json(result);
        });
    }

    deleteUser(id, res){
        const sql = "DELETE FROM users WHERE id = ?"
        con.query(sql, id, (error) => {
            if(error){
                return res.json(error);
            }
            res.json({status: "Usuario excluido", id : id})
        });
    }

    editUser(id, data, res){
        const sql = "UPDATE users SET name = ?, email = ?, senha = ? WHERE id = ?"
        con.query(sql, data, id, (error, result) => {
            if(error){
                return res.json(error);
            }
            res.json({status: "Usuario Atualizado", id: id});
            
        });
    }
}

module.exports = new Users;