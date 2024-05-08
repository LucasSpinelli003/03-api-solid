import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { create } from "./create";
import { nearby } from "./nearby";
import { search } from "./search";
import { verifyUserRole } from "@/http/middlewares/verifyUserRole";

export async function appGymRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("/gyms", { onRequest: [verifyUserRole("ADMIN")] }, create);

  app.get("/gyms/nearby", nearby);
  app.get("/gyms/search", search);
}
