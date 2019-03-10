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
                    "type": "VARCHAR(255)",
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
                    "allowNull": false
                },
                "user_role": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "references": {
                        "model": "broquiz_status",
                        "key": "status_id"
                    }
                },
                "user_status": {
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
                },
                "connectedAt": {
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
            return queryInterface.dropTable('broquiz_user');
        })
        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    }
};