function sendJson(res, statusCode, responseJson)
{
    res.status(statusCode);
    res.json(responseJson);

    return res;
}


function sendHtmlPage(res, path, parameters)
{
    res.render(path, parameters);

    return res;
}

const exportObj = {
    sendJson : sendJson,
    sendHtmlPage : sendHtmlPage
};


module.exports = exportObj;
