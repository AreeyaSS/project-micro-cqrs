export default () => ({
  broker: 'localhost:9092',
  services: {
    inventory: {
      clientId: 'inventory',
      groupId: 'inventory',
      name: 'inventory-kafka-client',
    },
  },
});
