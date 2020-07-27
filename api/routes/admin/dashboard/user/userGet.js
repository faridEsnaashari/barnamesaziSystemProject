const sqlConnection = require('../../../../sqlConnection');

function handleUser(req, res) {
    if(!req.session.token){
        res.redirect("/admin/login");
        return;
    }

    if(!req.query.lownumber && !req.query.highnumber){
        res.render("dashboard/user",
            {
                title : "user management",
                scriptSrc : "/views/scripts/dashboard/user.js",
                cssSrc : "/views/styles/dashboard/table.css"
            }
        );
        return;
    }

    const limit = req.query.highnumber - req.query.lownumber;
    const offset = req.query.lownumber;
    if(limit < 0 || offset < 0){
        const response = {
            message : "bad parameter provided"
        }
        res.status(400).json(response);
        return;
    }

    const query = "select * from user limit " + limit + " offset " + offset;

    sqlConnection.query(query, function (err, result, fields) {
        if(result.length === 0){
            const response = {
                message : "no more user"
            }
            res.status(404).json(response);
            return;
        }

        let usersArray = [];
        result.forEach(function(user){
            userObject = {
                userId : user.userId,
                username : user.username,
                phonenumber : user.phonenumber,
                name : user.name,
                teamcolor : user.teamcolor,
                health : user.health,
                ticket : user.ticket,
                coin : user.coin,
                score : user.score,
                active : Boolean(user.active)
            };
            usersArray.push(userObject);
        });

        const response = {
            users : usersArray
        };
        res.status(200).json(response);
        return;
    });
}

module.exports = handleUser;
