const { roles } = require("../employee");
const roleErrorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case roles.VALIDATION_ERROR:
      res.json({
        title: "Vaildation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case roles.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
    case roles.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
    case roles.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
    case roles.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
    default:
      console.log("No Error, All good !");
      break;
  }
};

module.exports = roleErrorHandler;
