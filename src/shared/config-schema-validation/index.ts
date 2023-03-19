import * as Joi from 'joi';

export default abstract class ConfigSchemaValidation {
  static get validationSchema() {
    return Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production')
        .default('development'),
      APPLICATION_PORT: Joi.number().default(3000),
      PROJECT_NAME: Joi.string().required(),
      DATABASE_URL: Joi.string().required(),
    });
  }
}
