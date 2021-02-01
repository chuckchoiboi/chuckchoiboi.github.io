const db = require('../config/database')

const newQuestion = (req, res) => {

    const context = {
        user: req.user,
    }

    res.render('questions/new', context)
}

const createQuestion = (req, res) => {

    req.body.author = req.user._id
    req.body.authorUsername = req.user.username

    const data = req.body


    db.Question.create(data, (err, createdQuestion) => {
        if(err) return console.log(err);
        console.log(createdQuestion._id);
        res.redirect(`/questions/show/${createdQuestion._id}`)
    })

}

const showQuestion = (req, res) => {

    const id = req.params.id;

    db.Question.findById(id, (err, foundQuestion) => {
    
        const context = {
            user: req.user,
            question: foundQuestion
        }
        
        console.log(context.question);

        res.render('questions/show', context)

    })

    
}

module.exports = {
    newQuestion,
    createQuestion,
    showQuestion,
}