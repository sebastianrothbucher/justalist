import { COLS_LOADED, ROWS_LOADED, FILTER, SORT, EDIT_ROW, ERROR } from './actionConstants';
import { loadColsService } from '../services/colsService';
import { loadRowsService } from '../services/rowsService';
import { handleError } from '../services/errorHandlerService';

// full load of cols (assume not 2 change in 1st iter - then same as rows)
export const loadCols = () =>
    (dispatch) =>
        loadColsService().then(res => {
            dispatch({ type: COLS_LOADED, cols: res });
        }).catch(err => {
            handleError(err); // don't wait 4 res
            dispatch({ type: ERROR, err: err });
        });

// full load of rows
export const loadRows = () =>
    (dispatch) =>
        loadRowsService().then(res => {
            dispatch({ type: ROWS_LOADED, rows: res });
        }).catch(err => {
            handleError(err); // don't wait 4 res
            dispatch({ type: ERROR, err: err });
        });

export const filter = (val) => ({ type: FILTER, filter: val });

export const sort = (what, colid, desc) => ({ type: SORT, sort: { what: what, colid: colid, desc: desc } });

export const editRow = (newRow) => ({ type: EDIT_ROW, newRow: newRow });

// TODO: listen for row changes (don't re-load all)
// TODO: create / update (replace rowEdit above)