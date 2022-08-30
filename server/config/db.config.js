module.exports = {
  HOST: "122.201.28.22",
  USER: "Urjin",
  PASSWORD: "Word12345*pass",
  PORT: "1433",
  DB: "Mcs_workprogress",
  dialect: "mssql",
  pool: {
      min: 0,
      max: 5,
      idle: 10000,
      acquire: 5000,
  }
};