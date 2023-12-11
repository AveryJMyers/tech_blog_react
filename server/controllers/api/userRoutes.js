
const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Ensure username and password are provided in the request body.
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        // Create a new user with the provided username and password.
        await User.create({
            username,
            password,
        });

        console.log(`Welcome ${username}!`);
        res.status(200).json({ message: `Welcome ${username}!` });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try{
        const userData = await User.findOne({
            where: {
                username: req.body.username,
            }
        })
        if (!userData) {
            res.status(400).json({ message: "Incorrect username or password, please try again." });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: "Incorrect username or password, please try again." });
            return;
        }
    }catch(err){
        console.error(err);
        res.status(500).json(err);
    }
})

router.get("/logout",  (req, res) => {
    try {
      req.session.destroy(() => {
        res.redirect("/login");
      });
    } catch (err) {
      handleError(err, res, req);
    }
  });
  


module.exports = router;
