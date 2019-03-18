/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('broquiz_round', {
    round_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    round_game: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'broquiz_game',
        key: 'game_id'
      }
    },
    round_category: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'broquiz_category',
        key: 'category_id'
      }
    },
    round_p1_score: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    round_p2_score: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    round_q1: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'broquiz_question',
        key: 'question_id'
      }
    },
    round_q2: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'broquiz_question',
        key: 'question_id'
      }
    },
    round_q3: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'broquiz_question',
        key: 'question_id'
      }
    },
    round_q1_p1: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'broquiz_status',
        key: 'status_id'
      }
    },
    round_q1_p2: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'broquiz_status',
        key: 'status_id'
      }
    },
    round_q2_p1: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'broquiz_status',
        key: 'status_id'
      }
    },
    round_q2_p2: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'broquiz_status',
        key: 'status_id'
      }
    },
    round_q3_p1: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'broquiz_status',
        key: 'status_id'
      }
    },
    round_q3_p2: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
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
    tableName: 'broquiz_round'
  });
};
