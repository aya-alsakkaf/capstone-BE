//imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./database.js");
const notFoundHandler = require("./middleware/notFoundHandler");
const errorHandler = require("./middleware/errorHandler.js");
const passport = require("passport");
const path = require("path");
const vacsRouter = require("./api/vac/vacRouters");
const petDetailsRouter = require("./api/petdetails/petdetails.Router.js");
const servicesRouter = require("./api/services/services.Routers");
const appointmentsRouter = require("./api/appointment/appointment.Routers");
const ownersRouter = require("./api/owners/owners.Route");
const {
  localStrategy,
  jwtStrategy,
  JwtStrategy,
} = require("./middleware/passport");
const reviewRouter = require("./api/review/review.router");

//init
const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
passport.use("local", localStrategy);
passport.use("jwt", JwtStrategy);

// MongoDB connection
connectDB();

// Routes
app.use("/api/vac", vacsRouter);
app.use("/api/petdetails", petDetailsRouter);
app.use("/api/services", servicesRouter);
app.use("/api/appointment", appointmentsRouter);
app.use("/api/owners", ownersRouter);
app.use("/api/review", reviewRouter);
// Not Found Handling middleware

app.use(notFoundHandler);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
