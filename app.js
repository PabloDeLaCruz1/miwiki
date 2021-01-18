const express = require('express')
const chalk = require('chalk')
const morgan = require('morgan')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')

const wikiRouter = require('./routes/wiki');
const models = require('./models');

const app = express()
const PORT = 3000

//middleware
app.use(express.static('public'))
// app.use(function (req, res, next) {
//     console.log('Time:', Date.now())
//     // console.log( res.status(201));
//     next()
// })

// //route specific middleware
// app.use("/special",function (req, res, next) {
//     console.log(chalk.yellow("this is special"))
//     next()
// })

// app.use(morgan('combined'))

app.set('view engine', 'html')
app.engine('html', nunjucks.render)
// nunjucks.configure('views'); // point nunjucks to the proper directory for templates

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    noCache:true
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// nunjucks.render('index.html', people)

// app.use('/', routes);
app.use('/wiki', wikiRouter);

app.get('/', function (req, res) {
  res.render('index');
})

// app.get('/', (req, res, next) => {
//     res.render( 'index', people);
//     console.log("Hlellloo");
//     next();
// })

// app.get('/', (req, res, next) => {});
// app.get('/tweets', (req, res, next) => {});
// app.post('/tweets', (req, res, next) => {});

// app.get('/tweets/:id', (req, res, next) => {
//     res.render( 'index', people);

// })
// app.get('/news', (req, res, next) => {
//     res.send("News")
//     next();
// })
// app.listen(PORT, () => {
//     console.log(chalk.blue("Server is listening on port 3000"));
// })
// this drops all tables then recreates them based on our JS definitions
// models.db.sync({force: true})

//sync without dropping tables

//error handling middleware, express knows because 4args are being used
app.use(function(err, req, res, next){
  console.error(err);
  res.status(500).send(err.message)
})

models.db.sync( )
.then(function () {
    console.log('All tables created!');
    app.listen(3000, function () {
      console.log(chalk.blue("Server is listening on port 3000"));
    });
})
.catch(console.error.bind(console));