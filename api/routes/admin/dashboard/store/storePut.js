const sqlConnection = require('../../../../sqlConnection');

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
        if(err) console.error(err);

        const response = {
            message : "item updated"
        }
        res.status(200).json(response);
        return;
    });
}

function generateUpdateQuery(req){
    const query = `update store set name = \'${ req.body.name }\', count = ${ req.body.count }, price = ${ req.body.price } where id = ${ req.body.itemId }`;
    return query;
}

function checkParameters(req){
    if(Object.keys(req.body).length !== 4){
        return false;
    }

    if(!req.body.itemId || !req.body.name || !req.body.count || !req.body.price){
        return false;
    }

    return true;
}

module.exports = handleUser;
