import { loadColsService } from '../services/colsService';

export const loadCols = () =>
    (dispatch) =>
        loadColsService().then(res => {
            dispatch({ type: 'COLS_LOADED', cols: res });
        });