function generateResponse(res, statusCode, responseJson)
{
    res.status(statusCode);
    res.json(responseJson);

    return res;
}


module.exports = generateResponse;
