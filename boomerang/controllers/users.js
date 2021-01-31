const db = require('../config/database')

const newUser = (req, res) => {

    const context = {
        user: req.user,
    }

    res.render('users/new', context)
}

const updateUser = (req, res) => {

    const userId = req.params.id

    const newUsername = req.body.username

    db.User.findById(userId, (err, foundUser) => {
        if(err) return console.log(err);

        db.User.findOne({username: newUsername}, (err, nameTaken) => {
            if (err) return console.log(err);

            if(nameTaken) {
                return console.log('name taken');
            }

            foundUser.username = newUsername

            foundUser.save()

            res.redirect(req.session.returnTo)

        })
    })
    
}

module.exports = {
    newUser,
    updateUser
}