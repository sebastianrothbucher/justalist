import wndw from './wndw';

export const loadCols = () => (dispatch) => {
    wndw.setTimeout(() => {
        dispatch({type: 'COLS_LOADED', cols: ['c1', 'c2']});
    }, 200);
};