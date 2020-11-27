const checkPermissions = (action) => {
  return async (req, res, next) => {
    try {
      if (req.user.role !== action || req.user.role === 'super-admin') {
        return res
          .status(403)
          .send({ error: "You are not allowed to perform this action" });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default checkPermissions;
