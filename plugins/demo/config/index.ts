export default {
  name: "mysql",
  version: "1.0.0",
  capabilities: [
    "transaction",
    "prepared_statement",
    "batch_operation",
    "stored_procedure",
  ],
  defaultPort: 3306,
  settings: {
    maxConnections: 10,
    connectionTimeout: 5000,
    queryTimeout: 30000,
  },
};
