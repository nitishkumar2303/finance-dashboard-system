import jwt from "jsonwebtoken";
import User from "../models/User";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(toke, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }
};

export const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden:'${req.user.role}' is not allowed to access this resource`,
      });
    }

    next();
  };
};
