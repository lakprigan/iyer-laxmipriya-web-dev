/**
 * Created by PriyaArun on 5/31/16.
 */
module.exports = function(app){
    var Users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post("/api/user",createUser);
    app.get("/api/user", GetUsers);
    app.get("/api/user/:userId", FindUserById);
    app.put("/api/user/:userId", UpdateUser);
    app.delete("/api/user/:userId", DeleteUser);

    function DeleteUser(req, res) {
        var id = req.params.userId;
        for(var i in Users){
            if(Users[i]._id === id){
                Users.splice(i);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function createUser(req, res) {
        var user = req.body;
        Users.push(user);
        res.send(user);
    }
    
    function GetUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        if(username && password){
            FindUserByCredentials(username, password, res)
        }
        else if(username){
            FindUserByUserName(username,res);
        }
        else{
            res.send(Users);
        }
    }

    function FindUserByCredentials(username, password, res) {
        for(var i in Users){
            if(Users[i].username===username && Users[i].password===password){
                res.send(Users[i]);
                return
            }
        }
        res.send({});
    }

    function FindUserByUserName(username,res){
        for(var i in Users){
            if(Users[i].username===username){
                res.send(Users[i]);
                return
            }
        }
        res.send({});
    }
    
    function  FindUserById(req, res) {
     var id = req.params.userId;
        for(var i in Users){
            if(Users[i]._id===id){
                res.send(Users[i]);
                return
            }
        }
        res.send({});
    }

    function UpdateUser(req, res) {
        var id = req.params.userId;
        var updatedUser = req.body;
        for(var i in Users){
            if(Users[i]._id === id){
                Users[i].firstName = updatedUser.firstName;
                Users[i].lastName = updatedUser.lastName;
                res.send(200);
                return
            }
        }
        res.send(400);
    }
};