export class Mod {
  public node: any;
  public min: number;
  public max: number;
  public curve: (dialSetting: number) => number;
}