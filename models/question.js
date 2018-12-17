/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('question', {
    question_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    question_category: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    question_image: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    question_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    question_creator_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    question_moderator_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    question_status: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    question_label: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'question'
  });
};
