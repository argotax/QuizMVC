'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.createTable('game',
            {
                "game_id": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "game_date": {
                    "type": "DATETIME",
                    "allowNull": false
                },
                "game_p1_id": {
                    "type": "INTEGER(11)",
                    "allowNull": false
                },
                "game_p2_id": {
                    "type": "INTEGER(11)",
                    "allowNull": false
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
            return queryInterface.dropTable('game');
        })
        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    }
};