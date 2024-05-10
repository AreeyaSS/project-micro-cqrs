export default () => ({
  broker: 'localhost:9092',
  services: {
    order: {
      clientId: 'order',
      groupId: 'order',
      name: 'order-kafka-client',
    },
    payment: {
      clientId: 'payment',
      groupId: 'payment',
      name: 'payment-kafka-client',
    },
    inventory: {
      clientId: 'inventory',
      groupId: 'inventory',
      name: 'inventory-kafka-client',
    },
  },
});
