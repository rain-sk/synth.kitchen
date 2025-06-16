import { PatchService } from "../services/patch.service";
import { PatchQuery } from "shared";

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class PatchController {
  static getNewPatchId = async (req, res) => {
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
      const idOrSlug = (req.params.idOrSlug as string) ?? "";
      const query: PatchQuery = uuidRegex.test(idOrSlug)
        ? { id: idOrSlug }
        : { slug: idOrSlug };

      const patch = await PatchService.getPatch(query);
      if (patch) {
        res.json(patch);
      } else {
        res.status(404).send("");
      }

      return;
    } catch (error) {
      console.error(error);
    }

    res.status(500).send("");
  };
}
