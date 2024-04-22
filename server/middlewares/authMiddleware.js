exports.loginHandler = (req, res) => {
    console.log("Login route hit");
    res.send("Login Page");
};
exports.homeHandler = (req, res) => {
    res.send("Home Page");
};
exports.isAuthenticated = (req, res, next) => {
    // Your authentication logic here
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: "Not authenticated" });
    }
};