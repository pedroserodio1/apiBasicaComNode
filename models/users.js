const con = require('./connection');
const nodemailer = require('nodemailer');
const credentials = require('../config/credentials.json');

const user = credentials.user;
const pass = credentials.pass;

//Configurando transportador do email
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user,
        pass
    }
});
class Users{
    createUser(data, res){
        const emailVerification = `SELECT email FROM users WHERE email = ?`;
        con.query(emailVerification, data.email, async (error, result) => {
            if(error){
                res.status(400).json(error);
            }else{
                if(result.length >= 1){
                    res.status(400).json({erro: `O email: ${data.email} ja existe, tente com outro`});
                }else{
                    const sql = "INSERT INTO Users SET ?";
                    con.query(sql, data, async (error, result) => {
                        if(error){
                            return res.json(error);
                        }
            
                        try{
                            await transporter.sendMail({
                                from: `Pedro Henrique" '${user}'`,
                                to: data.email,
                                replyTo: user,
                                subject: "teste", 
                                text: `Obrigado ${data.name} por se cadastar no nosso sistema`
            
                            });
                        }catch(error){
                            return res.status(400).json(error);
                        }
                        res.json({status: "Registro concluido", dados: {Name: data.name, email: data.email}});
                    
                    });
                }
            }

            
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
        const deleteData = `SELECT * FROM users WHERE id = ?`;
        con.query(deleteData, id, (error, result) => {
            if(error){
                return res.json(error);
            }else{

            const sql = "DELETE FROM users WHERE id = ?";
            con.query(sql, id, (error) => {
                if(error){
                    return res.json(error);
                }
                res.json({status: "Usuario excluido", dados: result});

            });
            }

        })
    }

    editUser(id, data, res){
        const emailVerification = `SELECT email FROM users WHERE email = ?`
        con.query(emailVerification, data.email, (error, result) => {
            if(error){
                return res.json(error)
            }else{
                if(result.length >= 1){
                    res.status(400).json({erro: "Email ja cadastrado, tente com outro"})
                }else{
                    const editedData = `SELECT * FROM users WHERE id = ?`;
                    con.query(editedData, id, (error, result) =>{
                        if(error){
                            return res.json(error);
                        }
                        var oldData = result;
                        const sql = `UPDATE users SET name = '${data.name}', email = '${data.email}', senha = '${data.senha}' WHERE id = ?`;
                        con.query(sql, id, (error, result) => {
                            if(error){
                                return res.json(error);
                            }
                            res.json({status: "Usuario Atualizado", "dados antigos": oldData, "dados atualizados": data});
                        })
                         
                    });

                }
            }
        })

    }

    searchUser(name, res){
        const search = "SELECT * FROM users WHERE name = ?";
        con.query(search, name, (error, result)=>{
            if(error){
                return res.json(error);
            }
            res.json(result);
        })
    }

}

module.exports = new Users;