const dayjs = require("dayjs");
const Handlebars = require('handlebars')
const User = require('../models/user'); // Import the User model
const { request } = require("express");


const format_date = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
  };
  


  // const lookupUsername = async (user_id, req) => {
  //   user_id = request.session.user_id;
  //   try {
  //     const findUsername = await User.findOne({ where: { id: user_id } });
  //     if (findUsername) {
  //       return findUsername.username;
  //     } else {
  //       return "User not found";
  //     }
  //   } catch (error) {
  //     // Handle any errors here
  //     console.error(error);
  //     throw error; // You can choose to re-throw the error or handle it differently.
  //   }
  // }
  



module.exports = {format_date};