/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('broquiz_game', {
    game_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    game_p1: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'broquiz_user',
        key: 'user_id'
      }
    },
    game_p2: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'broquiz_user',
        key: 'user_id'
      }
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
    },
    game_status: {
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
    }
  }, {
    tableName: 'broquiz_game'
  });
};
