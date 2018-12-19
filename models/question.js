/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('question', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
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
      allowNull: false
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
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'question'
  });
};
