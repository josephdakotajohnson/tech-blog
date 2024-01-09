const router = require('express').Router();
const { Comments, Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      include: [User],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        User, {
          model: Comments,
          include: [User]
        },
      ],
    });

    const blog = blogData.get({ plain: true });
    console.log(blog);
    res.render('singleblog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    //   include: [{ model: Blog }],
    // });

    // const user = userData.get({ plain: true });

    const blogData = await Blog.findAll({ where: {user_id:req.session.user_id}, include: [User] });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log('profile ---------')
    console.log(blogs);
    console.log('---------')
    let showBlogs;

    if (blogs.length > 0) { showBlogs = true; }

    res.render('dashboard', {
      blogs,
      logged_in: true,
      showBlogs,
      username: req.session.username
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/update/:id', async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        User, {
          model: Comments,
          include: [User]
        },
      ],
    });

    const blog = blogData.get({ plain: true });
    console.log(blog);
    res.render('updateBlog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
