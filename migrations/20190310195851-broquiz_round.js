'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.createTable('broquiz_round',
            {
                "round_id": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "round_game": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "references": {
                        "model": "broquiz_game",
                        "key": "game_id"
                    }
                },
                "round_category": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "references": {
                        "model": "broquiz_category",
                        "key": "category_id"
                    }
                },
                "round_p1_score": {
                    "type": "INTEGER(11)",
                    "allowNull": false
                },
                "round_p2_score": {
                    "type": "INTEGER(11)",
                    "allowNull": false
                },
                "round_q1": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "references": {
                        "model": "broquiz_question",
                        "key": "question_id"
                    }
                },
                "round_q2": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "references": {
                        "model": "broquiz_question",
                        "key": "question_id"
                    }
                },
                "round_q3": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "references": {
                        "model": "broquiz_question",
                        "key": "question_id"
                    }
                },
                "round_q1_p1": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "references": {
                        "model": "broquiz_status",
                        "key": "status_id"
                    }
                },
                "round_q1_p2": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "references": {
                        "model": "broquiz_status",
                        "key": "status_id"
                    }
                },
                "round_q2_p1": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "references": {
                        "model": "broquiz_status",
                        "key": "status_id"
                    }
                },
                "round_q2_p2": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "references": {
                        "model": "broquiz_status",
                        "key": "status_id"
                    }
                },
                "round_q3_p1": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "references": {
                        "model": "broquiz_status",
                        "key": "status_id"
                    }
                },
                "round_q3_p2": {
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
            return queryInterface.dropTable('broquiz_round');
        })
        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    }
};
