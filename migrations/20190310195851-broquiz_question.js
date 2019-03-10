'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.createTable('broquiz_question',
            {
                "question_id": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "question_creator": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "references": {
                        "model": "broquiz_user",
                        "key": "user_id"
                    }
                },
                "question_validator": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "references": {
                        "model": "broquiz_user",
                        "key": "user_id"
                    }
                },
                "question_category": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "references": {
                        "model": "broquiz_category",
                        "key": "category_id"
                    }
                },
                "question_label": {
                    "type": "VARCHAR(2500)",
                    "allowNull": false
                },
                "question_image": {
                    "type": "VARCHAR(1000)",
                    "allowNull": false
                },
                "question_status": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "references": {
                        "model": "broquiz_status",
                        "key": "status_id"
                    }
                },
                "createdAt": {
                    "type": "DATETIME",
                    "allowNull": false,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP')
                },
                "updatedAt": {
                    "type": "DATETIME",
                    "allowNull": false,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP')
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
            return queryInterface.dropTable('broquiz_question');
        })
        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    }
};
