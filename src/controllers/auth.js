const { login, register, getUserData } = require("../services/auth");

module.exports = {
  details: async (req, res) => {
    const userData = await getUserData();
    res.json(userData);
  },
  registerGET: (req, res) => {
    const error = req.session.error;
    const formData = req.session.formData;
    delete req.session.error;
    delete req.session.formData;

    res.render("register", { error, formData });
  },
  registerPOST: async (req, res) => {
    const { username, password, repeatpw } = req.body;

    try {
      if (!username) {
        throw new Error("Username is required");
      }
      if (!password) {
        throw new Error("Password is required");
      }
      if (password !== repeatpw) {
        throw new Error("Passwords don't match");
      }
      const user = await register(username, password);
      req.session.user = user;

      res.redirect("/");
    } catch (err) {
      req.session.error = {
        type: "register",
        message: err.message,
      };
      req.session.formData = { username };
      res.redirect("/register");
      return;
    }
  },
  loginGET: (req, res) => {
    const error = req.session.error;
    delete req.session.error;

    res.render("login", { error });
  },
  loginPOST: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await login(username, password);
      req.session.user = user;

      res.redirect("/");
    } catch (err) {
      req.session.error = {
        type: "login",
        message: err.message,
      };
      res.redirect("/login");
      return;
    }
  },
  logoutGET: (req, res) => {
    req.session.user = undefined;

    res.redirect("/");
  },
};
