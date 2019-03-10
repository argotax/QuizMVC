'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.createTable('broquiz_category',
            {
                "category_id": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "category_label": {
                    "type": "VARCHAR(255)",
                    "allowNull": false
                },
                "createdAt": {
                    "type": "DATETIME",
                    "allowNull": false,
                    "defaultValue": {
                        "val": "CURRENT_TIMESTAMP"
                    }
                },
                "updatedAt": {
                    "type": "DATETIME",
                    "allowNull": false,
                    "defaultValue": {
                        "val": "CURRENT_TIMESTAMP"
                    }
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
            return queryInterface.dropTable('broquiz_category');
        })
        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    }
};