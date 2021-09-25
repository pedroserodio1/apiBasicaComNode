# API Basica de usuarios

### Essa API foi desenvolvida a fins de estudo e aprendizado, ela conta com um CRUD  de usuários,  sistema de envio de email e criação de pdf

<h2 align="center"> 
	🚧 Em construção... 🚧
</h2>

### Features
	
- [x] Cadastro de usuarios

- [x] Edição de usuario

- [x] Deletar usuario

- [x] Listagem de usuario

- [x] Procura de usuario

- [x] Criação de pdf com todos os usuarios cadastrados (Bugs ja identificados)

- [x] Envio de email quando usuario é cadastrado

- [x] Envio de email com pdf dos usuarios cadastrados


### Rotas

|       Funcionalidade       |                            Descrição                            |           Endpoint           | metódo | parâmetro opcional? |  Qual parâmetro     |
|:--------------------------:|:---------------------------------------------------------------:|:----------------------------:|:------:|:-------------------:|:-------------------:|
| Cadastrar usuario          | Cria um novo usuario                                            | /createUser                  |  post  |    sem parâmetro    |                     |
| Edição de usuario          | Edita um registro referente a um usuario                        | /editUser/id                 |  patch |         não         |     Id Do usuario   |
| deletar um usuario         | Exclui um registro referente a um usuario                       | /deleteUser/:id              | delete |         não         |     Id Do usuario   |
| Listar usuarios            | Lista todos os usuarios cadastrados                             | /listUsers                   | Get    |    sem parâmetro    |                     |
| listar usuarios por nome   | lista usuarios pelos nomes especificos                          | /listUsers/name              |   get  |         nâo         |     Nome do usuario |
| Cria pdf                   | Cria um pdf com todos os usuarios cadastrados                   | /createPDF                   |   get  |    sem parâmetro    |                     |



### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [express](https://expressjs.com/pt-br/)
- [consign](https://github.com/jarradseers/consign)
- [mysql](https://github.com/mysqljs/mysql)
- [nodemailer](https://nodemailer.com/about/)
- [jsPDF](https://github.com/parallax/jsPDF)

### Autor
---

<a href="https://www.facebook.com/pedrohenrique.serodio30/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/48389538?s=400&u=ab8fd6f5b69523af3dbb47b6a59613551a809abb&v=4" width="100px;" alt=""/>
 <br />
 <h2><b>Pedro Serôdio</b></h2></a>

[![Linkedin Badge](https://img.shields.io/badge/-pedro%20serodio-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/pedroserodio1) 
[![Gmail Badge](https://img.shields.io/badge/-serodiomg@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:serodiomg@gmail.com)](mailto:serodiomg@gmail.com)

