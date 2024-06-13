const { consumer } = require('../utils/kafka');

const sampleListener = async () => {
  await consumer.connect();

  await consumer.subscribe({ topic: 'quickstart-events-test', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // eslint-disable-next-line no-console
      console.log(topic, {
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

module.exports = {
  sampleListener,
};
