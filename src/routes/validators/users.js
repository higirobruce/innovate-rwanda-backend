import { Joi, celebrate } from 'celebrate';

export const registerUser = celebrate({
  body: Joi.object().keys({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    entity_type: Joi.string().valid('individual', 'normal', 'admin-user', 'super-admin')
  })
});

export const editProfile = celebrate({
  body: Joi.object().keys({
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
    email: Joi.string().email(),
    jobTitle: Joi.string(),
  })
});

export default {};
