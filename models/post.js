module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        defaultValue: "Love"
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