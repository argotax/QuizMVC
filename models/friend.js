/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('friend', {
    friend_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    friend1_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'broquiz_user',
        key: 'user_id'
      }
    },
    friend2_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'broquiz_user',
        key: 'user_id'
      }
    },
    friend_status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'status_friend',
        key: 'status_friend_id'
      }
    }
  }, {
    tableName: 'friend'
  });
};
