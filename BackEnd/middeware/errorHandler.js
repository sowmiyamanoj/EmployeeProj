const{employees} =require("../employee");
const errorHandler = (err,req,res,next) =>{
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case employees.VALIDATION_ERROR:
      res.json({title:"Vaildation Failed", message: err.message, stackTrace: err.stack });
      break;
      case employees.NOT_FOUND:
        res.json({title:"Not Found", message: err.message, stackTrace: err.stack });
      case employees.UNAUTHORIZED:
        res.json({title:"Unauthorized", message: err.message, stackTrace: err.stack });
      case employees.FORBIDDEN:
        res.json({title:"Forbidden", message: err.message, stackTrace: err.stack });
      case employees.SERVER_ERROR:
        res.json({title:"Server Error", message: err.message, stackTrace: err.stack });
    default:
      console.log("No Error, All good !");
      break;
   }
  
};

module.exports = errorHandler;