const sqlConnection = require('../../../../sqlConnection');

function handleGamestatus(req, res) {
    if(!req.session.token){
        res.redirect("/admin/login");
        return;
    }

    if(!req.query.lownumber && !req.query.highnumber){
        res.render("dashboard/gamestatus",
            {
                title : "games management",
                scriptSrc : "/views/scripts/dashboard/gamestatus.js",
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

    const query = "select * from gamestatus limit " + limit + " offset " + offset;

    sqlConnection.query(query, function (err, result, fields) {
        if(result.length === 0){
            const response = {
                message : "no more game"
            }
            res.status(404).json(response);
            return;
        }

        let gamesArray = [];
        result.forEach(function(game){
            gameObject = {
                gameId : game.id,
                label : game.label,
                duration : game.duration,
                startedtime : game.startedtime,
                active : game.active
            };
            gamesArray.push(gameObject);
        });

        const response = {
            games : gamesArray
        };
        res.status(200).json(response);
        return;
    });
}

module.exports = handleGamestatus;
