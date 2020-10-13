const sqlConnection = require(`${ global.path.tools.mysqlConnection }`);

function handleUser(req, res) {
    if(!req.session.token){
        const response = {
            message : "access denied. please login first."
        }
        res.status(403).json(response);
        return;
    }

    if(!checkParameters(req)){
        const response = {
            message : "bad parameter provided"
        }
        res.status(400).json(response);
        return;
    }
    const query = generateUpdateQuery(req);

    sqlConnection.query(query, function(err, result, field){
        if(err){
            if(err.code === "ER_DUP_ENTRY"){
                const response = {
                    message : "item already existed"
                }
                res.status(409).json(response);
                return;
            }
            else{
                console.error(err);
            }
        }


        const response = {
            message : "item created"
        }
        res.status(200).json(response);
        return;
    });
}

function generateUpdateQuery(req){
    const query = `insert into store(name, count, price) value(\'${ req.body.name }\', ${ req.body.count }, ${ req.body.price })`;
    return query;
}

function checkParameters(req){
    if(Object.keys(req.body).length !== 3){
        return false;
    }

    if(!req.body.name || !req.body.count || !req.body.price){
        return false;
    }

    return true;
}

module.exports = handleUser;
