import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import passport from "passport";
import { Strategy } from "passport-local";

import AuthenticationService from "@/app/authentication/authentication.service";

import db from "@/databases/drizzle/connection";
import { sessions } from "@/models/drizzle/authentication.model";
import AppHelpers from "@/utils/appHelpers";
import { ApiResponse } from "@/utils/serviceApi";

const authenticationService = new AuthenticationService();

passport.serializeUser(async (user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
	const user = await authenticationService.findUserById(id);
	done(null, user.data);
});

export default passport.use(
	new Strategy(async (username, password, done) => {
		try {
			const inputType = AppHelpers.detectInputType(username);

			if (inputType === "EMAIL") {
				const user = await authenticationService.findUserByEmail(username);

				return done(null, user.data);
			} else {
				const user = await authenticationService.findUserByUsername(username);

				return done(null, user.data);
			}
		} catch (error) {
			return done(error);
		}
	})
);

export const localAuthentication = (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate("local", (err: any, user: Express.User) => {
		const apiResponse = new ApiResponse(res);
		if (err)
			return apiResponse.sendResponse({
				status: err.status,
				message: err.message
			});

		// Log the user in
		req.login(user, loginErr => {
			// If there is an error in logging in
			if (loginErr)
				return apiResponse.sendResponse({
					status: StatusCodes.INTERNAL_SERVER_ERROR,
					message: "Login Failed"
				});

			// assign user to the current session
			db.update(sessions)
				.set({
					userId: user.id
				})
				.execute();

			// Success response
			return apiResponse.successResponse("Logged in successfully", user);
		});
	})(req, res, next);
};
