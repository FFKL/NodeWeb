module.exports = {
    login: function(req, res) {
        if (req.user !== undefined) {
            res.render('index', {
                user: req.user
            });
        } else {
            res.render('index');
        }
    },
    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};