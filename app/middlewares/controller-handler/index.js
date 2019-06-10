/**
 * Catches all `async-await` errors from controller actions.
 * Each action is wrapped with `controllerHandler` to avoid having
 * to write `try-catch` all the time.
 */

module.exports = {
  controllerHandler: (promise, params) => async (req, res, next) => {
    const boundParams = params ? params(req, res, next) : [];
    try {
      const result = await promise(...boundParams);

      return res.status(result.status).json(result);
    } catch (error) {
      return next(error);
    }
  },
};
