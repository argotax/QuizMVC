'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.createTable('question',
            {
                "id": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "question_id": {
                    "type": "INTEGER(11)",
                    "allowNull": false
                },
                "question_category": {
                    "type": "VARCHAR(255)",
                    "allowNull": false
                },
                "question_image": {
                    "type": "VARCHAR(255)",
                    "allowNull": false
                },
                "question_date": {
                    "type": "DATETIME",
                    "allowNull": false
                },
                "question_creator_id": {
                    "type": "INTEGER(11)",
                    "allowNull": false
                },
                "question_moderator_id": {
                    "type": "INTEGER(11)",
                    "allowNull": false
                },
                "question_status": {
                    "type": "INTEGER(11)",
                    "allowNull": false
                },
                "question_label": {
                    "type": "VARCHAR(255)",
                    "allowNull": false
                },
                "createdAt": {
                    "type": "DATETIME",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": "DATETIME",
                    "allowNull": false
                }
            })
        })

        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.dropTable('question');
        })
        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    }
};