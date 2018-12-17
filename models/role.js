/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role', {
    role_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    role_label: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'role'
  });
};
