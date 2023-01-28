const Joi = require("@hapi/joi");
const { json } = require("body-parser");
// validate contact us inquiry
const contactUsValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
    email: Joi.string().email().required(),
    adress: Joi.string().min(3).max(8).required(),
    message: Joi.string().min(6).max(500).required(),
    date: Joi.date().greater(new Date(2022 - 01 - 01)),
  });
  return schema.validate(data);
};
// validate new article before submission

const articleValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(15).required(),
    author: Joi.string().min(5).required(),
    image: Joi.string(),
    content_type: Joi.string().min(3).max(17).required(),
    details: Joi.string().min(1).max(500).required(),
    date: Joi.date().greater(new Date(2022 - 01 - 01)),
  });

  const validated = schema.validate(data);
  return json.send({ validated });
};
//  validate user signUp
const signUpValidation = (data) => {
  const schema = Joi.object({
    // name: Joi.string().min(3).max().required(),
    username: Joi.string().min(5).required(),
    adress: Joi.string().min(3).max(8).required(),
    password: Joi.string().min(3).max(10).required(),
  });
  return schema.validate(data);
};
//  validate user login
const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(15).required(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(data);
};
module.exports.articleValidation = articleValidation;
module.exports.contactUsValidation = contactUsValidation;
module.exports.loginValidation = loginValidation;
module.exports.signUpValidation = signUpValidation;
