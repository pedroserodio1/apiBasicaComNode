const user = require("../models/users");

module.exports = (app) => {

    app.get("/listUsers", (req, res) => {
        user.listUser(res);
    });

    app.post("/createUser", (req, res) => {

        const data = req.body;
        user.createUser(data, res);
    })

    app.delete("/deleteUser/:id", (req, res) => {
        
        const id = req.params.id;
        user.deleteUser(id, res);
    })

    app.put("/editUser/:id", (req, res) => {
        
        const id = req.params.id;
        const data = req.body;
        user.editUser(id, data, res);
    })
}