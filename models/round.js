/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('round', {
    round_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    round_game_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    round_category: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    round_p1_score: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    round_p2_score: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'round'
  });
};
