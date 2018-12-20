/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('answer', {
    answer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    answer_question_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    answer_label: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    answer_image: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    answer_status: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'answer'
  });
};
