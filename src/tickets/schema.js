const joi = require('joi');

const schema = (() => {
  const create = joi
    .object({
      // All tickets should have a title
      title: joi.string().min(3).max(60).required(),

      // ALl tickets should have a description
      description: joi.string().min(3).max(2000).required(),

      // All tickets should have a priority describing their urgency to developers
      priority: joi.number().integer().min(0).max(5)
        .required(),

      // All tickets should have a severity describing their impact on the UX
      severity: joi.number().integer().min(0).max(5)
        .required(),

      // All tickets should have a flavor (called type in userland)
      flavor: joi.string().alphanum().min(3).max(60)
        .required(),

      // All tickets should be associated with a user ID as the reporter
      reporter_id: joi.number().integer().required(),

      // All tickets should be part of a broader product
      product_id: joi.number().integer().required(),

      due_date: joi.date(),
    })
    .max(8);

  const update = joi
    .object({
      // Update is the same as create, but none of the parameters are required
      title: joi.string().min(3).max(60),
      description: joi.string().min(3).max(2000),
      priority: joi.number().integer().min(0).max(5),
      severity: joi.number().integer().min(0).max(5),
      flavor: joi.string().alphanum().min(3).max(60),
      reporter_id: joi.number().integer(),
      product_id: joi.number().integer(),
      due_date: joi.date(),
      state: joi
        .string()
        .case('upper')
        .pattern(/(OPEN|CLOSED|OVERDUE|DELETED)/),
    })
    .min(1)
    .max(9);
  return {
    create,
    update,
  };
})();

module.exports = schema;
