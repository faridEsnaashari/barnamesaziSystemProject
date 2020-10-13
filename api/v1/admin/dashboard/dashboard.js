function handleDashboard(req, res) {
    if(!req.session.token){
        res.redirect("/admin/login");
        return;
    }

    res.render("dashboard",
        {
            title : "dashboard",
            scriptSrc : "/views/scripts/dashboard.js"
        }
    );
}
module.exports = handleDashboard;
