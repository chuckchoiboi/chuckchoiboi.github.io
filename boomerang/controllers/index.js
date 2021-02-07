const db = require('../config/database')

const index = (req, res) => {
    // code for filters
    const isEmpty = (object) => {
        return Object.keys(object).length === 0 && object.constructor === Object
    }

    const filter = {}
    if(req.query.search){
        filter.search = req.query.search
    }
    if(req.query.filterDate){
        filter.date = req.query.filterDate*-1
    }
    if(req.query.filterEngagement){
        filter.engagement = req.query.filterEngagement*-1
    }
    if(req.query.topic){
        filter.topic = req.query.topic
    }

    if(isEmpty(filter)) {
        db.Question.find({}).sort({createdAt: '-1'}).exec((err, foundQuestions) => {
            if(err) return console.log(err);
    
            const context = {
                user: req.user,
                questions: foundQuestions,
                sort: {}
            }
            res.render('index', context)
        })
    } else {
        // date and enagement filter query
        if(filter.date || filter.engagement) {
            const sortFilter = filter.date ? {createdAt: filter.date} : {numOfAnswers: filter.engagement}

            db.Question.find({}).sort(sortFilter).exec((err, foundQuestions) => {
                if(err) return console.log(err);
        
                const context = {
                    user: req.user,
                    questions: foundQuestions,
                    sort: {}
                }
                if(filter.date) {
                    context.sort.filter = 'sortDate'
                    context.sort.val = filter.date
                } else {
                    context.sort.filter = 'sortEngagement'
                    context.sort.val = filter.engagement
                }

                res.render('index', context)
            })

        } else if (filter.topic) {
            const topic = filter.topic

            db.Question.find({topic: topic}, (err, foundQuestions) => {
                const context = {
                    user: req.user,
                    questions: foundQuestions,
                    sort: {
                        filter: 'sortTopic',
                        val: topic
                    }
                }
                res.render('index', context)
            })

        } else if (filter.search) {
            const searchTerm = filter.search

            db.Question.find({$or: [{'questionTitle': new RegExp(searchTerm, 'i')}, {'questionBody': new RegExp(searchTerm, 'i')}]}, (err, foundQuestions) => {
                const context = {
                    user: req.user,
                    questions: foundQuestions,
                    sort: {
                        filter: 'search',
                        val: filter.search
                    }
                }
                res.render('index', context)
            })

        }
    }
}


module.exports = {
    index,
    users: require('./users'),
    questions: require('./questions'),
}