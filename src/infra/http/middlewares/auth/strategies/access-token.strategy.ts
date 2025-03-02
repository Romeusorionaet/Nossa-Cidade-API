import { TokenPurposeEnum } from "src/domain/our-city/application/shared/enums/token-purpose.enum";
import { accessTokenSchema } from "src/infra/http/schemas/access-token.schema";
import type { AccessTokenPayload } from "src/core/@types/access-token-payload";
import { BadRequestException, Injectable } from "@nestjs/common";
import type { EnvService } from "src/infra/env/env.service";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
	Strategy,
	TokenPurposeEnum.ACCESS_TOKEN,
) {
	constructor(envService: EnvService) {
		const publicKey = envService.get("JWT_PUBLIC_KEY");

		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: Buffer.from(publicKey, "base64"),
			algorithms: ["RS256"],
		});
	}

	async validate(payload: AccessTokenPayload) {
		if (payload.purpose !== TokenPurposeEnum.ACCESS_TOKEN) {
			throw new BadRequestException("Invalid token purpose");
		}

		try {
			return accessTokenSchema.parse(payload);
		} catch (err: any) {
			throw new BadRequestException(err.err);
		}
	}
}
