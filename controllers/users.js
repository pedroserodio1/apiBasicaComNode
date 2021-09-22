const user = require("../models/users");

module.exports = (app) => {

    app.get("/listUsers", (req, res) => {
        user.listUser(res);
    });

    app.post("/createUser", async (req, res) => {

        const data = req.body;
        await user.createUser(data, res);
    });

    app.delete("/deleteUser/:id", (req, res) => {
        
        const id = req.params.id;
        user.deleteUser(id, res);
    });

    app.patch("/editUser/:id", (req, res) => {
        
        const id = req.params.id;
        const data = req.body;
        user.editUser(id, data, res);
    });

    app.get("/listUsers/:name", (req, res) => {
        const name = req.params.name;
        user.searchUser(name, res);
    });

    app.get("/createPDF", (req, res) => {
        user.createPDF(res);
    })
}