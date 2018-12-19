'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.createTable('broquiz_user',
            {
                "user_id": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "user_login": {
                    "type": "VARCHAR(255)",
                    "allowNull": false
                },
                "user_email": {
                    "type": "VARCHAR(255)",
                    "allowNull": false
                },
                "user_password": {
                    "type": "VARCHAR(1000)",
                    "allowNull": false
                },
                "user_salt": {
                    "type": "VARCHAR(255)",
                    "allowNull": false
                },
                "user_country": {
                    "type": "VARCHAR(255)",
                    "allowNull": false
                },
                "user_points": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "defaultValue": "0"
                },
                "user_status": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "references": {
                        "model": "status_user",
                        "key": "status_user_id"
                    }
                },
                "user_role": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "references": {
                        "model": "role",
                        "key": "role_id"
                    }
                },
                "createdAt": {
                    "type": "DATETIME",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": "DATETIME",
                    "allowNull": false
                },
                "user_last_connection": {
                    "type": "DATETIME",
                    "allowNull": true
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
            return queryInterface.dropTable('broquiz_user');
        })
        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    }
};