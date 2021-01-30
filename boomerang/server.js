/* NOTE External Modules */
const express = require('express')
const methodOverride = require('method-override')
// const session = require('express-session')
// const passport = require('passport')

/* NOTE Internal Modules */
// const routes = require('./routes')
// const logger = require('./middleware/logger')

/* NOTE PORT */
const PORT = 3000;

/* NOTE Authentication */
require('dotenv').config()
// require('./config/passport');


/* NOTE App Instance */
const app = express()

/* NOTE App config */
app.set('view engine', 'ejs')

/* NOTE Middleware */
// mount public folder
app.use( express.urlencoded({extended: true}))
app.use( methodOverride('_method') )
// app.use( logger )
// app.use(session({
//     secret: 'boomerang-chuck',
//     resave: false,
//     saveUninitialized: true
// }))
// app.use( passport.initialize() );
// app.use( passport.session() );

/* NOTE Routes */

// index
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

// users
// app.use('/users', routes.users )

// questions
// app.use('/questions', routes.questions )

/* NOTE App Listening */
app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}\nhttp://localhost:${PORT}`);
})