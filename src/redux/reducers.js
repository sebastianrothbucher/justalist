import { COLS_LOADED, ROWS_LOADED, ERROR } from './actionConstants';

const coreReducer = (state, action) => {
    switch (action.type) {
        case COLS_LOADED:
            return { ...state, cols: action.cols };
        case ROWS_LOADED:
            return { ...state, rows: action.rows };
        case ERROR:
            return { ...state, err: action.err };

        default:
            return state;
    }
};

const filteringReducerDecorator = (oldState, state) => {
    if (oldState.rows !== state.rows || oldState.filter !== state.filter) {
        let filterLower = state.filter ? state.filter.toLowerCase() : state.filter;
        return {
            ...state, rowsFiltered: (state.filter ? [].concat(state.rows || [])
                .filter(
                    (r) => (r.title || '').toLowerCase().indexOf(filterLower) >= 0 ||
                        Object.keys(r.colvalues).map((colid) => r.colvalues[colid])
                            .filter((colvalue) => (colvalue || '').toLowerCase().indexOf(filterLower) >= 0).length > 0)
                : null)
        };
    } else {
        return state;
    }
}

// TODO: sorting

const mainReducer = (state = {}, action) => filteringReducerDecorator(state, mainReducer(state, action));

export default mainReducer;