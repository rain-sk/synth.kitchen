import { ModuleState } from '../state';

export interface MovePayload {
    guid: string;
    columnIndex: number;
    rowIndex: number;
}

export const ModuleMove = (state: ModuleState, payload: MovePayload): ModuleState => {
    const columns = state.modules;
    let found = false;
    columns.forEach((column, columnIndex) => {
        column.forEach((guid, rowIndex) => {
            if (!found && payload.guid === guid) {
                if (columnIndex != payload.columnIndex) {
                    if (columns[payload.columnIndex]) {
                        columns[payload.columnIndex].splice(payload.rowIndex, 0, guid);
                    }
                    else {
                        columns[payload.columnIndex] = [guid];
                    }
                    columns[columnIndex].splice(rowIndex);
                } else {
                    if (rowIndex < payload.rowIndex) {

                    } else {
                        
                    }
                }
                found = true;
            }
        });
    });
    return ({
        ...state,

    });
}