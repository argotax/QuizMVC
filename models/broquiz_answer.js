/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('broquiz_answer', {
    answer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    answer_question: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'broquiz_question',
        key: 'question_id'
      }
    },
    answer_label: {
      type: DataTypes.STRING(1500),
      allowNull: false
    },
    answer_image: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    answer_status: {
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
    tableName: 'broquiz_answer'
  });
};
