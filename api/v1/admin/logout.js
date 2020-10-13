function handleLogout(req, res) {
    if(req.session.token){
        req.session.destroy(function(){
            res.render("logout", {title : "logout"});
        });
    }
    else{
        res.render("logout", {title : "logout"});
    }
}
module.exports = handleLogout;
