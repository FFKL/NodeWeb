module.exports = {
    login: (req, res) => {
        if (req.isAuthenticated()) {
            res.redirect('/user');
        } else {
            console.log(req.session);
            if (req.session.flash)
                res.render('index', {message: req.session.flash.error});
            else
                res.render('index');
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    }
};