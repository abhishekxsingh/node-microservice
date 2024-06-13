const { Sample: SampleService } = require('../../services');
const { get: getSchema } = require('../../dto-schemas');
const Validator = require('../../utils/validator');

const Book = async (_, args, context) => {
  try {
    const { user: { userId } } = context;

    const data = { userId };

    const { errors } = Validator.isSchemaValid({ data, schema: getSchema });

    if (errors) {
      return { errors };
    }

    const { errors: err, doc } = await SampleService.get(data);

    if (doc) {
      return {
        data: doc,
      };
    }

    return { errors: err };
  } catch (error) {
    return error;
  }
};

module.exports = {
  Query: { Book },
};
