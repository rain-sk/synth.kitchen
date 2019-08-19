import * as React from "react";

import { Rack, IRack } from "./rack";
import { ModuleType, IModule } from "./module";
import { modules } from "./module-map";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../store/ducks/patch";
import { Connector } from "./connector";
import { Connections } from "./connections";
import { Serializer } from "./serializer";
import { Account } from "./account";
import { UserUi } from "./user-ui";

const { v4 } = require("uuid");

export const Kitchen: React.FunctionComponent = () => {
  const clear = actionCreators.clear;
  const dispatch = useDispatch();
  const [racks, setRacks] = React.useState<IRack[]>([]);

  const addRack = React.useCallback(() => {
    racks.push({
      index: racks.length,
      moduleKeys: []
    });
    setRacks([...racks]);
  }, [racks]);

  const removeRack = React.useCallback(
    (rackIndex: number) => () => {
      const remove: string[] = [];
      racks[rackIndex].moduleKeys.forEach(key => {
        remove.push(key);
      });

      const newRacks = racks.filter(rack => rack.index !== rackIndex);
      newRacks.forEach((rack, index) => {
        rack.index = index;
      });

      setRacks(newRacks);

      remove.forEach(key => dispatch(clear(key)));
    },
    [clear, racks]
  );

  const addModule = React.useCallback(
    (rackIndex: number, moduleType: ModuleType) => {
      const key = v4();
      const newModule: IModule = {
        moduleKey: key,
        type: moduleType
      };
      modules.set(key, newModule);

      racks[rackIndex].moduleKeys.push(key);
      const newRacks = [...racks];
      setRacks(newRacks);
    },
    [racks]
  );

  const removeModule = React.useCallback(
    (moduleKey: string) => {
      const module = modules.get(moduleKey);
      module && module.node && module.node.stop && module.node.stop();
      const newRacks = racks.map(rack => ({
        index: rack.index,
        moduleKeys: rack.moduleKeys.filter(key => key !== moduleKey)
      }));
      setRacks(newRacks);
      clear(moduleKey);
    },
    [racks]
  );

  return (
    <>
      {/* <Account /> */}
      <Connector
        type="SIGNAL_IN"
        name={"speakers"}
        connectorId={"GLOBAL_CONTEXT"}
        moduleKey={"GLOBAL_CONTEXT"}
      />
      {racks.map(rack => (
        <React.Fragment key={rack.index}>
          <button type="button" onClick={removeRack(rack.index)}>
            Remove Rack
          </button>
          <Rack {...rack} addModule={addModule} removeModule={removeModule} />
        </React.Fragment>
      ))}
      <button type="button" onClick={addRack}>
        Add Rack
      </button>
      <Connections moduleCount={modules.size} rackCount={racks.length} />
      <Serializer racks={racks} />
      <UserUi />
    </>
  );
};
