const con = require('./connection');
const nodemailer = require('nodemailer');
const { jsPDF } = require('jspdf');
const credentials = require('../config/credentials.json');

const user = credentials.user;
const pass = credentials.pass;

//criando instancia do jspdf
const doc = new jsPDF();

doc.setFont('helvetica');
doc.setFontSize(12);


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

                        res.status(200).json({status: "Registro concluido", dados: {Name: data.name, email: data.email}});
                    
                    });
                }
            }

            
        });
    }

    listUser(res){

        const sql = "SELECT * FROM users";
        con.query(sql, (error, result) => {
            if(error){  
                return res.status(400).json(error);
            }
            res.status(200).json(result);

        });
    }

    deleteUser(id, res){

        const deleteData = `SELECT * FROM users WHERE id = ?`;
        con.query(deleteData, id, (error, result) => {

            if(error){
                return res.status(400).json(error);
            }else{

            const sql = "DELETE FROM users WHERE id = ?";
            con.query(sql, id, (error) => {
                if(error){
                    return res.status(400).json(error);
                }

                res.status(200).json({status: "Usuario excluido", dados: result});

            });
            }

        })
    }

    editUser(id, data, res){

        const emailVerification = `SELECT email FROM users WHERE email = ?`
        con.query(emailVerification, data.email, (error, result) => {

            if(error){
                return res.status(400).json(error)
            }else{
                if(result.length >= 1){
                    res.status(400).json({erro: "Email ja cadastrado, tente com outro"})
                }else{

                    const editedData = `SELECT * FROM users WHERE id = ?`;
                    con.query(editedData, id, (error, result) =>{
                        if(error){
                            return res.status(400).json(error);
                        }

                        var oldData = result;

                        const sql = `UPDATE users SET name = '${data.name}', email = '${data.email}', senha = '${data.senha}' WHERE id = ?`;
                        con.query(sql, id, (error, result) => {
                            if(error){
                                return res.status(400).json(error);
                            }
                            res.status(200).json({status: "Usuario Atualizado", "dados antigos": oldData, "dados atualizados": data});
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
                return res.status(400).json(error);
            }

            res.status(200).json(result);
        })
    }

    createPDF(res){
        const date = new Date();

        const sql = "SELECT name, email FROM users";
        con.query(sql, async (error, result) => {

            if(error){
                return res.status(400).json(error);
            }

            try{

                doc.text("Usuários",105, 10, "center");
                let y = 30;
                let num = 1;
                let numMaximo = 27;

                result.forEach((user) => {
                
                    if(num > numMaximo){
                        doc.addPage(); 
                        numMaximo += 30;
                        console.log(numMaximo);
                        
                    }
                    doc.text(`${num}. Nome: ${user.name}` ,60, y);
                    doc.text(` Email: ${user.email}`, 115, y);
                    y+=10;
                    console.log(num, user);
                    num++;
                    
                    

                });
            
            
                doc.save(`./documents/${date.getTime()}.pdf`);

                await transporter.sendMail({
                    from: `Pedro Henrique" '${user}'`,
                    to: "serodiomg@gmail.com",
                    replyTo: user,
                    subject: "Usuarios cadastrados", 
                    text: `Documento com todos os usuarios cadastrados no sistema`,
                    attachments:[{
                        filename: `${date.getTime()}.pdf`,
                        path: `./documents/${date.getTime()}.pdf`,
                        contentType: 'aplication/pdf'
                    }]
                })

                res.status(200).json({status: "Pdf gerado", "Caminho do documento" : `./documents/${date.getTime()}.pdf`})

            }catch(error){
                res.status(500).json(error);
            }
        })
    }
    
}



module.exports = new Users;