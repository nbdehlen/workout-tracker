require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");
const db = require("./db/index");
initial = require("./db/schema/utils/populateRoles");
const app = express();
const index = require("./api/routes");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const host = process.env.HOST;
const port = process.env.PORT;

/* Config */
app.set("port", port || 5000);
app.use(cors()); // Cross-origin resource sharing
app.use(express.json()); // Parse incoming JSON
app.use(morgan("dev")); // logger

const swaggerCssOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
};

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Workout tracker API",
      description: "User API Information",
      contact: {
        name: "Bastian",
      },
      // servers: ["localhost:5000"],
      servers: ["https://workouttracker-api.herokuapp.com/"],
    },
  },
  apis: ["./api/routes/index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, swaggerCssOptions)
);

/* API */
app.use("/api/v1", index);

db.connect().then(() => {
  app.listen(port, host, () => console.log(`App running on ${host}:${port}`));
});

//uncomment to populate roles
// initial();

app.use((req, res, next) => {
  next(createError(404, "Not found"));
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

module.exports = app;
