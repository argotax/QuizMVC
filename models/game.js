/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('game', {
    game_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    game_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    game_p1_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    game_p2_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    game_p1_score: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    game_p2_score: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    game_p1_points: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    game_p2_points: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'game'
  });
};
