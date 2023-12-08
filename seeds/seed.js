const sequelize = require("../config/connection");
const { User, BlogPost, Comment } = require("../models");

const userData = require("./userData.json");
const blogPostData = require("./blogPostData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    try {
      const users = [];
      for (const userDataItem of userData) {
        const user = await User.create(userDataItem);
        users.push(user);
      }
      console.log("\n-----USER SEEDED -----\n");
      await BlogPost.bulkCreate(blogPostData);
      console.log("\n----- BLOG POST SEEDED! -----\n");
      await Comment.bulkCreate(commentData);
      console.log("\n----- BLOG COMMENTS SEEDED! -----\n");
    } catch (error) {
      console.error("Error seeding db", error);
    } finally {
      await sequelize.close();
    }
  };
  
seedDatabase();