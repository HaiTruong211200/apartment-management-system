function errorHandler(err, req, res, next) {
  console.error(err.stack);

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    details: err.details || null,
  });
}

function notFound(req, res, next) {
  res.status(404).json({
    error: 'Not Found',
    details: `Route ${req.originalUrl} does not exist`,
  });
}

module.exports = {
  errorHandler,
  notFound,
};
