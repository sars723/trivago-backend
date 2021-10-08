import createHttpError from "http-errors"

export const onlyHostAllowedRoute = (req, res, next) => {
  if (req.user.role === "host") {
    next()
  } else {
    next(createHttpError(403, "Host only! You shall not pass!"))
  }
}