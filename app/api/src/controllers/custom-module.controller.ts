import { Request as JwtRequest } from "express-jwt";
import { ContentQuery } from "synth.kitchen-shared";

import { CustomModule } from "../entity/CustomModule";
import { CustomModuleService } from "../services/custom-module.service";

export class CustomModuleController {
  static getUniqueCustomModuleId = async (req, res) => {
    try {
      const custommoduleIdInfo =
        await CustomModuleService.getUniqueCustomModuleId();
      res.json(custommoduleIdInfo);
      return;
    } catch (error) {
      console.error(error);
    }
    res.status(500).send("");
  };

  static getCustomModule = async (req, res) => {
    try {
      const query: Exclude<ContentQuery, "random"> = req.query;

      let queryParamCount = Object.keys(query).length;
      if (queryParamCount !== 1) {
        throw new Error("Invalid number of query parameters");
      } else if (!("id" in query || "slug" in query || "creatorId" in query)) {
        throw new Error(
          "Missing expected query params ('id', 'slug', or 'creatorId')",
        );
      }

      const result = await CustomModuleService.getCustomModule(query);
      if (Array.isArray(result)) {
        res.json({ custommodules: result });
      } else if (result) {
        res.json({ custommodule: result });
      } else {
        res.sendStatus(404);
      }

      return;
    } catch (error) {
      console.error(`GET /custommodule/: ${error}`);
    }

    res.status(500).send("");
  };

  static getCustomModuleInfo = async (req, res) => {
    try {
      const query: ContentQuery = req.query;

      let queryParamCount = Object.keys(query).length;
      if (queryParamCount !== 1) {
        throw new Error("Invalid number of query parameters");
      } else if (!("id" in query || "slug" in query || "creatorId" in query)) {
        throw new Error(
          "Missing expected query param ('id', 'slug', or 'creatorId')",
        );
      }

      const result = await CustomModuleService.getCustomModuleInfo(query);
      if (Array.isArray(result)) {
        res.json({ custommodules: result });
      } else if (result) {
        res.json({ custommodule: result });
      } else {
        res.sendStatus(404);
      }

      return;
    } catch (error) {
      console.error(`GET /custommodule/info/: ${error}`);
    }

    res.status(500).send("");
  };

  static createCustomModule = async (req: JwtRequest, res) => {
    try {
      const userId = req.auth.id;
      const custommoduleData: Partial<CustomModule> = req.body;
      const savedCustomModule = await CustomModuleService.saveCustomModule(
        userId,
        custommoduleData,
      );
      res.status(200).json({ custommodule: savedCustomModule });
    } catch (error) {
      console.error(`POST /custommodule/: ${error}`);
      res.status(500).send("");
    }
  };

  static updateCustomModule = async (req: JwtRequest, res) => {
    try {
      const userId = req.auth.id;
      const custommoduleId: string = req.params.id;
      const custommoduleData: Partial<CustomModule> = req.body;

      // Find the existing custom module
      const existingCustomModule = await CustomModuleService.getCustomModule({
        id: custommoduleId,
      });

      if (!existingCustomModule || Array.isArray(existingCustomModule)) {
        return res.sendStatus(404);
      }

      if (existingCustomModule.creator.id !== userId) {
        return res.sendStatus(401);
      }

      // Update the custom module
      const updatedCustomModule = await CustomModuleService.updateCustomModule(
        userId,
        existingCustomModule,
        custommoduleData,
      );

      res.status(200).json({ custommodule: updatedCustomModule });
    } catch (error) {
      console.error(`PUT /custommodule/: ${error}`);
      res.status(500).send("");
    }
  };

  static deleteCustomModule = async (req: JwtRequest, res) => {
    try {
      const userId = req.auth.id;
      const custommoduleId: string = req.params.id;
      await CustomModuleService.deleteCustomModule(userId, custommoduleId);
      res.sendStatus(200);
    } catch (error) {
      console.error(`DELETE /custommodule/: ${error}`);
      res.status(500).send("");
    }
  };

  static forkCustomModule = async (req: JwtRequest, res) => {
    try {
      const custommoduleId: string = req.params.id;
      const userId: string = req.auth.id;

      const forkedCustomModule = await CustomModuleService.forkCustomModule(
        userId,
        custommoduleId,
      );
      res.status(200).json({ custommodule: forkedCustomModule });
    } catch (error) {
      console.error(`POST /custommodule/fork/: ${error}`);
      res.status(500).send("");
    }
  };
}
