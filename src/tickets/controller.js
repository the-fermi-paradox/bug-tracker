const service = require('./service');
const schema = require('./schema');
const processJoiError = require('../errors/process_joi_error');
const HTTPError = require('../errors/http_error');

const controller = (() => {
  const list = async (req, res, next) => {
    const data = await service.list().catch(next);
    res.json(data);
  };

  const get = async (req, res, next) => {
    const { id } = req.params;
    const data = await service.get(id).catch(next);
    res.json(data);
  };

  const create = async (req, res, next) => {
    const { error } = schema.create.validate(req.body);
    // If we failed to validate the data
    if (error != null) {
      // Send it to our error middleware
      next(processJoiError(error));
    }
    // If validated, extract out the relevant data
    const input = {
      title: req.body.title,
      description: req.body.description,
      flavor: req.body.flavor,
      priority: req.body.priority,
      severity: req.body.priority,
      reporter_id: req.body.reporter_id,
      product_id: req.body.product_id,
    };

    // Submit it to our service and await the response
    const data = await service.create(input).catch(next);
    // Send the JSON to the client
    res.json(data);
  };

  const remove = async (req, res, next) => {
    const { id } = req.params;
    if (!id) next(new HTTPError(400, 'No id specified'));
    const data = await service.remove(id).catch(next);
    res.json(data);
  };

  const update = async (req, res, next) => {
    const { id } = req.params;
    if (!id) next(new HTTPError(400, 'No id specified'));
    const { error } = schema.update.validate(req.body);
    // If we failed to validate the data
    if (error != null) {
      // Send it to our error middleware
      next(processJoiError(error));
    }

    const data = await service.update(id).catch(next);
    res.json(data);
  };

  return {
    list,
    get,
    create,
    remove,
    update,
  };
})();

module.exports = controller;
