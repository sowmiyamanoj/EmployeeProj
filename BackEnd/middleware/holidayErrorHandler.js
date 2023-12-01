const{Holidays} =require("../employee");
const holidayErrorHandler = (err,req,res,next) =>{
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case Holidays.VALIDATION_ERROR:
      res.json({title:"Vaildation Failed", message: err.message, stackTrace: err.stack });
      break;
      case Holidays.NOT_FOUND:
        res.json({title:"Not Found", message: err.message, stackTrace: err.stack });
      case Holidays.UNAUTHORIZED:
        res.json({title:"Unauthorized", message: err.message, stackTrace: err.stack });
      case Holidays.FORBIDDEN:
        res.json({title:"Forbidden", message: err.message, stackTrace: err.stack });
      case Holidays.SERVER_ERROR:
        res.json({title:"Server Error", message: err.message, stackTrace: err.stack });
    default:
      console.log("No Error, All good !");
      break;
   }
  
};

module.exports = holidayErrorHandler;