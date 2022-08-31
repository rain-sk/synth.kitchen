import React from "react"
import { AppContext } from "../state"

export const useModule = (moduleKey: string) =>
    React.useContext(AppContext).modules[moduleKey];
