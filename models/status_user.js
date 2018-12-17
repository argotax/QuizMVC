/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('status_user', {
    status_user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    status_user_label: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'status_user'
  });
};
