const router = require('express').Router();
const { User, BlogPost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const dayjs = require('dayjs');

// Get all blog posts for homepage

router.get('/', async (req, res) => {
    try {
      const blogData = await BlogPost.findAll();
      const blog = blogData.map((blog) => {
        return blog.get({ plain: true });
      });
  
      res.status(200).json(blog);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'server error' });
    }
  });


router.post('/', async (req, res) => {
  try{
    const {title, content} = req.body;

    const newPost = await BlogPost.create({
      title,
      content,
      author: req.session.user_id,
    });
    res.redirect('/myBlogs')

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await BlogPost.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!project) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/edit/:id', async (req, res) => {
  try{
    const updated = await BlogPost.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.redirect('/myBlogs');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
router.post('/delete/:id' , async (req, res) => {
  try {
    const deleted = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect('/myBlogs');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

    


module.exports = router;