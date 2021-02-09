const Joi = require("joi");
const validator = require("validator");

const ValidateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(10).required(),
  });
  return schema.validate(data);
};

// function ValidateUser(data) {
//     const schema = Joi.object({
//         name: Joi.string().min(2).max(10).required(),
//       });
//       return schema.validate(data);
// }

const ValidateUserUpdate = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(10).required(),
      userId : Joi.required(),
  });
  console.log(validator.default.isMongoId(data.userId));
  
  return schema.validate(data);
};
module.exports = { ValidateUser, ValidateUserUpdate };
