import { Request, Response } from "express";
import { hashSync } from "bcrypt";

import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export const createUser = async (req: Request, res: Response) => {
  // todo: validation

  const user = await AppDataSource.manager.create(User, {
    email: req.body.email,
    username: req.body.username,
    password: hashSync(req.body.password, 10),
  });

  console.log(user);
};

// export const getAllUsers = async (req: Request, res: Response) => {
//   try {
//     const users = await User.findAll();
//     res.status(200).json(users);
//   } catch (e) {
//     console.error(e);
//     res.status(500).send("Error retrieving users");
//   }
// };
