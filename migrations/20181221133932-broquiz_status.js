'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.createTable('broquiz_status',
            {
                "status_id": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "status_type": {
                    "type": "INTEGER(11)",
                    "allowNull": false,
                    "references": {
                        "model": "broquiz_status_type",
                        "key": "status_type_id"
                    }
                },
                "status_label": {
                    "type": "VARCHAR(255)",
                    "allowNull": false
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
            }).then(function () {
                queryInterface.sequelize.query("insert into broquiz_status (status_type, status_label) values (1,'Validé'),(1,'En cours de validation'),(2,'Administrateur'),(2,'Joueur'),(3,'Ami'),(3,'Demande envoyée'),(4,'Vraie'),(4,'Fausse'),(5,'Connecté'),(5,'Déconnecté'),(5,'Absent')");
            });
        })

        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.dropTable('broquiz_status');
        })
        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    }
};
