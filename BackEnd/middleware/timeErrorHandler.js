const{Times} =require("../employee");
const TimeErrorHandler = (err,req,res,next) =>{
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case Times.VALIDATION_ERROR:
      res.json({title:"Vaildation Failed", message: err.message, stackTrace: err.stack });
      break;
      case Times.NOT_FOUND:
        res.json({title:"Not Found", message: err.message, stackTrace: err.stack });
      case Times.UNAUTHORIZED:
        res.json({title:"Unauthorized", message: err.message, stackTrace: err.stack });
      case Times.FORBIDDEN:
        res.json({title:"Forbidden", message: err.message, stackTrace: err.stack });
      case Times.SERVER_ERROR:
        res.json({title:"Server Error", message: err.message, stackTrace: err.stack });
    default:
      console.log("No Error, All good !");
      break;
   }
  
};

module.exports = timeErrorHandler;