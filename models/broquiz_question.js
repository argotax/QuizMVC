/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('broquiz_question', {
    question_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    question_creator: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    question_validator: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'broquiz_user',
        key: 'user_id'
      }
    },
    question_category: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'broquiz_category',
        key: 'category_id'
      }
    },
    question_label: {
      type: DataTypes.STRING(2500),
      allowNull: false
    },
    question_image: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    question_status: {
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
    tableName: 'broquiz_question'
  });
};
