export class CreatePatchDto {
  name: string;
  serializedPatch: string;
  creator_id: string;
  public?: boolean = true;
}
