module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      Date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        defaultValue: "Personal"
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1,400]
        }
      }
      
    });
    return Post;
  };