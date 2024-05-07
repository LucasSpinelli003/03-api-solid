import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { create } from "./create";
import { history } from "./history";
import { metrics } from "./metrics";
import { validate } from "./validate";

export async function appCheckInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("/gyms/:gymId/check-ins", create);

  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);

  app.put("/check-ins/:checkInId/validate", validate);
}
