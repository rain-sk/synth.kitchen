import * as React from "react";
import { useSelector } from "react-redux";
import { modules } from "./module-map";
import { debugMode } from "../..";
import { RootState } from "../../store/ducks";

interface ISerializerProps {
  racks: {
    index: number;
    moduleKeys: string[];
  }[];
}

export const Serializer: React.FunctionComponent<ISerializerProps> = props => {
  const { connections } = useSelector((state: RootState) => state.connections);

  React.useEffect(() => {
    if (debugMode()) {
      console.log(
        JSON.stringify({
          racks: props.racks,
          connections,
          modules: Array.from(modules)
        })
      );
    }
  }, [props.racks.length, connections, modules.size]);
  return null;
};
