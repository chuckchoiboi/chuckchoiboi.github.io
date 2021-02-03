const db = require('../config/database')

const newQuestion = (req, res) => {

    const context = {
        user: req.user,
    }

    res.render('questions/new', context)
}

const addQuestion = (req, res) => {

    req.body.authorId = req.user._id
    req.body.authorUsername = req.user.username

    const data = req.body


    db.Question.create(data, (err, createdQuestion) => {
        if(err) return console.log(err);
        res.redirect(`/questions/show/${createdQuestion._id}`)
    })

}

const showQuestion = (req, res) => {

    const id = req.params.id;

    db.Question.findById(id, (err, foundQuestion) => {

        db.Answer.find({questionId: id}, (err, foundAnswers) => {
            if(err) return console.log(err);

            let answerSelected = false

            foundAnswers.forEach(answer => {
                if (answer.selected) answerSelected = true 
            })

            console.log(answerSelected);
            
            const context = {
                user: req.user,
                question: foundQuestion,
                answers: foundAnswers,
                answerSelected: answerSelected
            }            

            res.render('questions/show', context)
        })


    
        

    })

    
}

const addAnswer = (req, res) => {
    req.body.authorId = req.user._id
    req.body.authorUsername = req.user.username
    req.body.selected = false
    req.body.questionId = req.params.id

    const data = req.body


    db.Answer.create(data, (err, createdAnswer) => {
        
        db.Question.findByIdAndUpdate(createdAnswer.questionId, {
            $push: { answers: createdAnswer._id }
        }, (err, updated) => {
            if(err) return console.log(err);
            res.redirect(`/questions/show/${createdAnswer.questionId}`)
        })


    })

}

const selectAnswer = (req, res) => {
    db.Answer.findById(req.params.id, (err, foundAnswer) => {
        
        if(err) return console.log(err);

        if(foundAnswer.selected) {
            foundAnswer.selected = false
            foundAnswer.save()
            db.User.findByIdAndUpdate(foundAnswer.authorId, {$inc: {'answersSelected' : -1}}).exec()
        } else {
            foundAnswer.selected = true
            foundAnswer.save()
            db.User.findByIdAndUpdate(foundAnswer.authorId, {$inc: {'answersSelected' : 1}}).exec()
        }

        res.redirect(`/questions/show/${foundAnswer.questionId}`)

    })

}

module.exports = {
    newQuestion,
    addQuestion,
    showQuestion,
    addAnswer,
    selectAnswer,
}