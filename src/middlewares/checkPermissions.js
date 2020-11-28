const checkPermissions = (action) => {
  return async (req, res, next) => {
    try {
      if (req.user.role !== action || req.user.role === "super-admin") {
        next();
      } else {
        return res
          .status(403)
          .send({ error: "You are not allowed to perform this action" });
      }
    } catch (error) {
      next(error);
    }
  };
};

export default checkPermissions;
