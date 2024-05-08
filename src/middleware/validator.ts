import Joi from "joi"
import { NextFunction, Request,Response } from "express";

const validateRequest = function(schema: Joi.ObjectSchema){

  return (req: Request, res: Response, next: NextFunction):any => {
    const result = schema.validate(req.body)
    if (result.error) {
      return res.status(400).json({
        error: result.error.details[0].message,
      });
    }
    next();
    
  };
}

export default validateRequest