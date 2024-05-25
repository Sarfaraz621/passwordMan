import codes from "../assets/statusCodes.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case codes.Validation_Error:
      res.json({
        title: "Validation Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case codes.Unautorized:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case codes.Forbidden:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case codes.Not_Found:
      res.json({
        title: "Page Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case codes.Server_Error:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    default:
      console.log("No error detected!");
      break;
  }
};

export default errorHandler;
