import rateLimit, { ValueDeterminingMiddleware } from "express-rate-limit";

export const RateLimiterMiddleware = (
  message: string,
  limit: number | ValueDeterminingMiddleware<number> | undefined
) => {
  return rateLimit({
    windowMs: 5 * 60 * 1000,
    limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: `${message}`,
  });
};
