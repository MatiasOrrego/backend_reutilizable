export default function errorHandler(err, req, res, next) {
  console.error(err.message || err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal server error' });
}
