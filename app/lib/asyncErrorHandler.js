// Catch error from async handler and pass to error handler
export default (f) => {
  return (req, res, next) => f(req, res, next).catch(next);
}
