import { Router } from "express";

import { authenticationRouter } from "@/app/authentication/authentication.routes";
import { mediaRouter } from "@/app/media/media.routes";
import { todoRouter } from "@/app/todo/todo.routes";
import { userRouter } from "@/app/user/user.routes";

import { csrfRouter } from "@/routes/csrf.route";

interface RouteConfig {
	path: string;
	router: Router;
}

export const routes: RouteConfig[] = [
	{ path: "/todo", router: todoRouter },
	{ path: "/media", router: mediaRouter },
	{ path: "/auth", router: authenticationRouter },
	{ path: "/users", router: userRouter },
	{ path: "/csrf-token", router: csrfRouter }
];
