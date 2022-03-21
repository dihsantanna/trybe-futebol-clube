import * as Joi from 'joi';
import { ILogin } from '../../interfaces';
import msgs from '../../environments/msgsError';

const LoginSchema = Joi.object<ILogin>({
  email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
    'string.empty': msgs.LOGIN_INCORRECT.message,
    'string.email': msgs.LOGIN_EMAIL_INVALID.message,
    'any.required': msgs.LOGIN_FIELDS_UNDEFINED.message,
  }),
  password: Joi.string().min(6).required()
    .messages({
      'string.empty': msgs.LOGIN_INCORRECT.message,
      'string.min': msgs.LOGIN_PASS_MIN.message,
      'any.required': msgs.LOGIN_FIELDS_UNDEFINED.message,
    }),
});

export default LoginSchema;
