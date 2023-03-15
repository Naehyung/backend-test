import * as Joi from 'joi';

export default abstract class ConfigSchemaValidation {
  static get validationSchema() {
    return Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production')
        .default('development'),
      TZ: Joi.string().default('Etc/Universal'),
      APPLICATION_PORT: Joi.number().default(3000),
      PROJECT_NAME: Joi.string().required(),
      DATABASE_URL: Joi.string().required(),
      AWS_ACCESS_KEY_ID: Joi.string().required(),
      AWS_SECRET_ACCESS_KEY: Joi.string().required(),
      AWS_REGION: Joi.string().required(),
      JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
    });
  }
}
