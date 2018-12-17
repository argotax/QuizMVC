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
      type: DataTypes.STRING(1000),
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
    user_creation: {
      type: DataTypes.DATE,
      allowNull: true
    },
    user_last_co: {
      type: DataTypes.DATE,
      allowNull: true
    },
    user_points: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    user_status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'status_user',
        key: 'status_user_id'
      }
    },
    user_role: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'role',
        key: 'role_id'
      }
    }
  }, {
    tableName: 'broquiz_user'
  });
};
