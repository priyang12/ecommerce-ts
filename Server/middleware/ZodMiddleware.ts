export default (schema: any) => (req, res, next) => {
  schema.parse(req.body);
  next();
};
