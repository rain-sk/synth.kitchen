import { Request as JwtRequest } from "express-jwt";
import { PatchQuery } from "synth.kitchen-shared";

import { Patch } from "../entity/Patch";
import { PatchService } from "../services/patch.service";

export class PatchController {
  static getUniquePatchId = async (req, res) => {
    try {
      const patchIdInfo = await PatchService.getUniquePatchId();
      res.json(patchIdInfo);
      return;
    } catch (error) {
      console.error(error);
    }
    res.status(500).send("");
  };

  static getPatch = async (req, res) => {
    try {
      const query: Exclude<PatchQuery, "random"> = req.query;

      let queryParamCount = Object.keys(query).length;
      if (queryParamCount !== 1) {
        throw new Error("Invalid number of query parameters");
      } else if ("random" in query) {
        throw new Error("Unsupported 'random' query parameter");
      } else if (!("id" in query || "slug" in query || "creatorId" in query)) {
        throw new Error(
          "Missing expected query params ('id', 'slug', or 'creatorId')"
        );
      }

      const result = await PatchService.getPatch(query);
      if (Array.isArray(result)) {
        res.json({ patches: result });
      } else if (result) {
        res.json({ patch: result });
      } else {
        res.sendStatus(404);
      }

      return;
    } catch (error) {
      console.error(`GET /patch/: ${error}`);
    }

    res.status(500).send("");
  };

  static getPatchInfo = async (req, res) => {
    try {
      const query: PatchQuery = req.query;

      let queryParamCount = Object.keys(query).length;
      if (queryParamCount !== 1) {
        throw new Error("Invalid number of query parameters");
      } else if (
        !(
          "id" in query ||
          "slug" in query ||
          "creatorId" in query ||
          "random" in query
        )
      ) {
        throw new Error(
          "Missing expected query param ('id', 'slug', 'creatorId', or 'random')"
        );
      }

      const result = await PatchService.getPatchInfo(query);
      if (Array.isArray(result)) {
        res.json({ patches: result });
      } else if (result) {
        res.json({ patch: result });
      } else {
        res.sendStatus(404);
      }

      return;
    } catch (error) {
      console.error(`GET /patch/info/: ${error}`);
    }

    res.status(500).send("");
  };

  static createPatch = async (req: JwtRequest, res) => {
    try {
      const userId = req.auth.id;
      const patchData: Partial<Patch> = req.body;
      const savedPatch = await PatchService.savePatch(userId, patchData);
      res.status(200).json({ patch: savedPatch });
    } catch (error) {
      console.error(`POST /patch/: ${error}`);
      res.status(500).send("");
    }
  };

  static updatePatch = async (req: JwtRequest, res) => {
    try {
      const userId = req.auth.id;
      const patchId: string = req.params.id;
      const patchData: Partial<Patch> = req.body;

      // Find the existing patch
      const existingPatch = await PatchService.getPatch({ id: patchId });

      if (!existingPatch || Array.isArray(existingPatch)) {
        return res.sendStatus(404);
      }

      if (existingPatch.creator.id !== userId) {
        return res.sendStatus(401);
      }

      // Update the patch
      const updatedPatch = await PatchService.updatePatch(
        userId,
        existingPatch,
        patchData
      );

      res.status(200).json({ patch: updatedPatch });
    } catch (error) {
      console.error(`PUT /patch/: ${error}`);
      res.status(500).send("");
    }
  };

  static deletePatch = async (req: JwtRequest, res) => {
    try {
      const userId = req.auth.id;
      const patchId: string = req.params.id;
      await PatchService.deletePatch(userId, patchId);
      res.sendStatus(200);
    } catch (error) {
      console.error(`DELETE /patch/: ${error}`);
      res.status(500).send("");
    }
  };

  static forkPatch = async (req: JwtRequest, res) => {
    try {
      const patchId: string = req.params.id;
      const userId: string = req.auth.id;

      const forkedPatch = await PatchService.forkPatch(userId, patchId);
      res.status(200).json({ patch: forkedPatch });
    } catch (error) {
      console.error(`POST /patch/fork/: ${error}`);
      res.status(500).send("");
    }
  };
}
