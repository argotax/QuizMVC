'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.createTable('broquiz_game',
            {
                "game_id": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "game_p1": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "references": {
                        "model": "broquiz_user",
                        "key": "user_id"
                    }
                },
                "game_p2": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "references": {
                        "model": "broquiz_user",
                        "key": "user_id"
                    }
                },
                "game_p1_score": {
                    "type": "INTEGER(11)",
                    "allowNull": false
                },
                "game_p2_score": {
                    "type": "INTEGER(11)",
                    "allowNull": false
                },
                "game_p1_points": {
                    "type": "INTEGER(11)",
                    "allowNull": false
                },
                "game_p2_points": {
                    "type": "INTEGER(11)",
                    "allowNull": false
                },
                "game_status": {
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
            return queryInterface.dropTable('broquiz_game');
        })
        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    }
};
