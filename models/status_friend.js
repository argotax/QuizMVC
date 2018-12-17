/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('status_friend', {
    status_friend_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    status_friend_label: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'status_friend'
  });
};
