const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
      if (req.user && allowedRoles.includes(req.user.role)) {
        next(); // Continue to the next middleware if the role is allowed
      } else {
        // If the user role is not in the allowed roles, return an error
        res.status(403).json({ message: "Access denied. You do not have the necessary permissions." });
      }
    };
  };
  
  module.exports = roleMiddleware
  