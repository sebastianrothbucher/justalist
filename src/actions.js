import wndw from './wndw';

export const loadCols = () =>
    (dispatch) =>
        new Promise((resolve) => wndw.setTimeout(resolve, 200)).then(() => {
            dispatch({ type: 'COLS_LOADED', cols: ['c1', 'c2'] });
        });