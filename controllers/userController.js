module.exports = {
    login: (req, res) => {
        if (req.isAuthenticated()
        ) {
            res.redirect('/user');
        } else {
            res.render('index', {message: req.session.flash.error});
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    }
};