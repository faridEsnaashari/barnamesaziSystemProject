function handleRoot(req, res) {
    if(req.session.token){
        res.redirect("/admin/dashboard");
    }
    else{
        res.redirect("/admin/login");
    }
}
module.exports = handleRoot;
