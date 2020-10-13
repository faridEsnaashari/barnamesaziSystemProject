function handleGetLogin(req, res) {
    if(req.session.token){
        res.redirect("/admin/dashboard");
        return;
    }

    res.render(
        "login",
        {
            title : "login",
            scriptSrc : "/views/scripts/login.js"
        }
    );
}
module.exports = handleGetLogin;
