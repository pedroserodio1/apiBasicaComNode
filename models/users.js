const con = require('./connection');
const nodemailer = require('nodemailer');
const credentials = require('../config/credentials.json');

const user = credentials.user;
const pass = credentials.pass;
class Users{
    createUser(data, res){
        const sql = "INSERT INTO Users SET ?";
        con.query(sql, data, async (error, result) => {
            if(error){
                return res.json(error);
            }
            res.json({status: "Registro concluido", dados: {Name: data.name, email: data.email}});
            
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth:{
                    user,
                    pass
                }
            });

            try{
                await transporter.sendMail({
                    from: 'rennofelipe3@gmail.com',
                    to: data.email,
                    replyTo: 'rennofelipe3@gmail.com',
                    subject: "teste",
                    text: "Teste de envio de email com node mailer"

                });
            }catch(error){
                return res.status(400).json(error);
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
        const sql = "DELETE FROM users WHERE id = ?";
        con.query(sql, id, (error) => {
            if(error){
                return res.json(error);
            }
            res.json({status: "Usuario excluido", id: id});
        });
    }

    editUser(id, data, res){
        const sql = `UPDATE users SET name = '${data.name}', email = '${data.email}', senha = '${data.senha}' WHERE id = ?`;
        con.query(sql, id, (error, result) => {
            if(error){
                return res.json(error);
            }
            res.json({status: "Usuario Atualizado", id: id});
             
        });
    }

}

module.exports = new Users;