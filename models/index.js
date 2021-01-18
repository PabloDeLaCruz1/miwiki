const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/miwiki', {
    logging: false
});

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    // status: {
    //     type: Sequelize.ENUM('open', 'closed')
    // },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    hooks: {
        beforeValidate: function(page) {
            if (page.title){
                page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/, '')
                console.log(page);
            }
        }
    },
    getterMethods: {
        route: function() {
            return '/wiki/' + this.urlTitle;
        }
    }
});

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { //better way to validate, allows customization, app level 
            isEmail: true
        }
    }
});

Page.belongsTo(User, { as: 'author'});

module.exports = {
    Page: Page,
    User: User,
    db: db,
};
//test connection
// async function asyncCall() {
//     try {
//         await db.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }
// asyncCall();