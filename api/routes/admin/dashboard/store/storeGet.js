const sqlConnection = require('../../../../sqlConnection');

function handleStore(req, res) {
    if(!req.session.token){
        res.redirect("/admin/login");
        return;
    }

    if(!req.query.lownumber && !req.query.highnumber){
        res.render("dashboard/store",
            {
                title : "store item management",
                scriptSrc : "/views/scripts/dashboard/store.js",
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

    const query = "select * from store limit " + limit + " offset " + offset;

    sqlConnection.query(query, function (err, result, fields) {
        if(result.length === 0){
            const response = {
                message : "no more item"
            }
            res.status(404).json(response);
            return;
        }

        let itemsArray = [];
        result.forEach(function(item){
            itemObject = {
                itemId : item.id,
                name : item.name,
                count : item.count,
                price : item.price
            };
            itemsArray.push(itemObject);
        });

        const response = {
            items : itemsArray
        };
        res.status(200).json(response);
        return;
    });
}

module.exports = handleStore;
