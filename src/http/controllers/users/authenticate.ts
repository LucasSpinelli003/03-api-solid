import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { makeAuthenticateService } from "@/services/factories/make-authenticate-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const requestSchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  });

  const { email, password } = requestSchema.parse(request.body);

  try {
    const authenticateService = makeAuthenticateService();

    const { user } = await authenticateService.execute({
      email,
      password,
    });

    const token = await response.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    );

    const refreshToken = await response.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      },
    );
    return response
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return response.status(400).send({ message: error.message });
    }
    throw error;
  }
}
