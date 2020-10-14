const sqlConnection = require(`${ global.path.tools.mysqlConnection }`);

function handleGetRequest(req, res) {
    const checkGameTimeQuery = "select * from gamestatus where active = true";
    sqlConnection.query(checkGameTimeQuery, function (err, result, fields) {
        if (err) throw err;

        const duration = result[0].duration;
        const startedTime = result[0].startedtime;
        const id = result[0].id;
        if(itsTheTime(duration, startedTime)){
            const now = getNow();
            const setTheNextGameQuery = "call activeNextGame(" + parseInt(id) + ", \'" + now + "\')";
            console.log(setTheNextGameQuery);
            sqlConnection.query(setTheNextGameQuery, function (err, result, fields) {
                if(err) throw err;
                prepareResponse(req, res);
            });
        }
        else{
            prepareResponse(req, res);
        }
    });
}

function itsTheTime(duration, startedTime){
    gameTime = new Date(startedTime);
    gameTimeInMiliSecond = gameTime.getTime();
    gameTimeInSecond = Math.round(gameTimeInMiliSecond / 1000);

    currentTime = new Date();
    currentTimeInMiliSecond = currentTime.getTime();
    currentTimeInSecond = Math.round(currentTimeInMiliSecond / 1000);

    durationInSecond = duration * 3600;

    if((currentTimeInSecond - (gameTimeInSecond + durationInSecond)) > 0){
        return true;
    }
    return false;
}

function getNow(){
    now = new Date();
    return now.toISOString();
}

function prepareResponse(req, res){
    let getGameStatusQuery;
    if(req.query.activegame != undefined && req.query.activegame === "true"){
        getGameStatusQuery = "select * from gamestatus where active = true";
    }
    else{
        getGameStatusQuery = "select * from gamestatus";
    }
    sqlConnection.query(getGameStatusQuery, function (err, result, fields) {
        if (err) throw err;

//        if(result[0] == undefined)
//        {
//            const responseJson = {
//              "message": "game not found"
//            };
//            responseGenerator.sendJson(res, 404, responseJson);
//            return;
//        }
        
        let games = [];
        for(game in result) {
            gameObject = {
                label : result[game].label,
                duration : result[game].duration,
                startedTime : result[game].startedtime,
                active : result[game].active
            }
            games.push(gameObject);
        }
        const response = {
            games : games
        };
        res.responseController.send(200, null, response);
        return;
    });

}
module.exports = handleGetRequest;
