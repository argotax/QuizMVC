/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('broquiz_user', {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_login: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_salt: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_country: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_points: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    user_role: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'broquiz_status',
        key: 'status_id'
      }
    },
    user_status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'broquiz_status',
        key: 'status_id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    connectedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'broquiz_user'
  });
};
