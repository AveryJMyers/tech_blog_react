const router = require('express').Router();
const Sequelize = require('sequelize');
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');
const dayjs = require('dayjs');

// get one blog posts for homepage
router.get('/', async (req, res) => {
  console.log('homepage route hit')
  try{
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      limit: 1,
    });
    const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));
    console.log(blogPosts)
    res.render('homepage', {
      blogPosts,
      logged_in: req.session.logged_in,
      username: req.session.username,
      user_id: req.session.user_id,
    });
  }catch (err) {
    res.status(500).json(err);
  }
});



router.get('/feed', async (req, res) => {
  console.log('feed route hit')
  try{
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: Comment,
          attributes: ['content', 'date_posted'],
          include: {
            model: User,
            attributes: ['username'],
            as: 'comment_author' // Alias to access the User model for comment author
          }
        },
        {
          model: User,
          attributes: ['username'],
        }
      ],
      order: [['date_posted', 'asc']]
    });
    const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

    console.log(blogPosts)
  
    res.render('feed', {
      blogPosts,
      logged_in: req.session.logged_in,
      username: req.session.username,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




router.get('/myBlogs', async (req, res) => {
  console.log('blogpost route hit')
  console.log(req.session.user_id)
  try{
    const myBlogData = await BlogPost.findAll({
      where: {
        author: req.session.user_id,
      },
    });
    const myBlogs = myBlogData.map((myBlog) => myBlog.get({ plain: true }));
    console.log(myBlogs);

    res.render("myBlogs", {
      myBlogs,
      logged_in: req.session.logged_in,
      username: req.session.username,
      user_id: req.session.user_id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

  

// Render the login page
router.get('/login', async (req,res) => {
  console.log('login route hit')
  try{
    res.render('login',{
      username: req.session.username,
      logged_in: req.session.logged_in,
    })
  }catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// login route
router.post('/login', async (req, res) => {
  console.log('login post route hit')
  let username = req.body.username
  let password = req.body.password

  try{
    const user = await User.findOne({ where: { username: username } });
    const now = dayjs();
    console.log(user);
    if (user && user.checkPassword(password)) {
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
        req.session.username = username;
        req.session.last_logged = now.format('YYYY-MM-DD HH:mm:ss');
        res.redirect('/');
        console.log('-------------login successful----------------')
      });
      console.log("user id " + req.session.user_id + " logged in " + req.session.logged_in + " user name " + req.session.username);
    } else {
      res.render("login", { error: "Invalid credentials" }); // Display error message
    }
  } catch (error) {
    res.render("login", { error: "An error occurred" }); // Display error message

  }
});


// render signup page
router.get("/signup", async (req, res) => {
  try {
    res.render("signup", {
      user_name: req.session.user_name,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Fly you fools. Server Error");
  }
});

// sign user up

router.post("/signup", async (req, res) => {
  console.log('signup post route hit')
  try{
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    console.log(user);
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      req.session.username = user.username;
      res.redirect("/");
    });
  }catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  console.log("is this happening")
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      // confirm that user by name has been logged out in console
      req.session.logged_in = false; // Set logged_in to false
      console.log('User logged out:', req.session.user_id);
      res.redirect('/'); // Redirect to homepage
    });
  } else {
    res.status(404).end();
  }
});





module.exports = router;
