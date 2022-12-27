const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ parameterLimit: 25, limit: "50kb", extended: false }));

export default {
  path: "/api",
  handler: app,
};
