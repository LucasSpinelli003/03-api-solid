import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { appUserRoutes } from "./http/controllers/users/routes";
import { appGymRoutes } from "./http/controllers/gyms/routes";
import { appCheckInsRoutes } from "./http/controllers/check-ins/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(appUserRoutes);
app.register(appGymRoutes);
app.register(appCheckInsRoutes);

app.setErrorHandler((error, _request, response) => {
  if (error instanceof ZodError) {
    return response
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return response.status(500).send({ message: "Internal server error." });
});
