import { Patch } from "../entity/Patch";
import { PatchService } from "../services/patch.service";
import { PatchQuery } from "synth.kitchen-shared";

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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
      const query: PatchQuery = req.query;

      let queryParamCount = Object.keys(query).length;
      if (queryParamCount !== 1) {
        throw new Error("Invalid number of query parameters");
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
}
