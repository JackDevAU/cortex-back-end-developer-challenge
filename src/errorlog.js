export const logErrors = (err, req, res, next) => {
  next(err);
};

export const clientError = (err, req, res, next) => {
  if (req.xhr) {
    res.status(500).json({ error: "Something failed!" });
  } else {
    next(err);
  }
};

export const serverError = (err, req, res, next) => {
  res.status(500).json({ error: err.stack });
};
