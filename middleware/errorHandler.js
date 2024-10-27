const errorHandler = (error, request, response, next) => {
  try {
    console.log(error);
    return response
      .status(error.status || 500)
      .json({ error: error || "Server Went down" });
  } catch (error) {
    next(error);
  }
};

module.exports = errorHandler;
