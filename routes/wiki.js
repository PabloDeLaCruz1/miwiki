const express = require('express');
const router = express.Router();
const models = require('../models')
const Page = models.Page
const User = models.User
module.exports = router;

router.get('/', (req, res, next) => {
    Page.findAll({})
        .then(function (thePages) {
            res.render('index', {
                pages: thePages
            })
        })
        .catch(next)
});
router.get('/users', function(req, res, next){
    User.findAll({})
    .then(function(users){
        res.render('userspage', {
            users: users
        })
    })
    .catch(next)
})

router.post('/', (req, res, next) => {

    User.findOrCreate({
            where: {
                email: req.body.authorEmail,
                name: req.body.authorName
            }
        })
        .then(function (values) { //.spread for [pageThatWasFoundOrCreated, createdBoolean]

            const user = values[0]
            const createdBool = values[1]

            return Page.create({
                    title: req.body.title,
                    content: req.body.content,
                    status: req.body.status
                })
                .then(function (createdPage) {
                    return createdPage.setAuthor(user)
                })
        })
        .catch(next)
    // const newPage = Page.build(req.body)

    // newPage.save()
    // .then(function(savedPage){
    //     console.log("Page Saved Successfully");
    //     res.redirect(savedPage.route)
    // })
    // .catch(next)
});

router.get('/add', (req, res) => {
    res.render("addpage")
});


router.get('/:urlTitle', function (req, res, next) {
    const urlTitleOfAPage = req.params.urlTitle;

    Page.findOne({
            where: {
                urlTitle: urlTitleOfAPage
            }
        })
        .then(function (page) {
            if (page === null) {
                return next(new Error('This page was not found!'))
            }
            return page.getAuthor()
                .then(function (author) {
                    page.author = author;

                    res.render('wikipage', {
                        page: page
                    })
                })
                .catch(next)
        })
})

router.get('/users', function(req, res, next){
    Users.findAll({})
    .then(function(users){
        res.render('userspage', {
            users: users
        })
    })
    .catch(next)
})