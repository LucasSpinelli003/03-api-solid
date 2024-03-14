import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { getUserProfile } from "./controllers/get-user-profile";

export async function appRoutes(app: FastifyInstance) {
  app.get("/users", getUserProfile);
  app.post("/users", register);
  app.post("/sessions", authenticate);
}
