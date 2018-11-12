import { IAction, ISynthKitchen } from "..";

export type Reducer<T> = (action: T | IAction<T>, state: ISynthKitchen) => ISynthKitchen;