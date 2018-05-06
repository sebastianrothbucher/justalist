import { COLS_LOADED, ROWS_LOADED, FILTER, SORT, ERROR, SORT_TITLE, SORT_COL } from './actionConstants';

export const coreReducer = (state, action) => {
    switch (action.type) {
        case COLS_LOADED:
            return { ...state, cols: action.cols };
        case ROWS_LOADED:
            return { ...state, rows: action.rows };
        case FILTER: 
            return { ...state, filter: action.filter };
        case SORT: 
            return { ...state, sort: action.sort };
        case ERROR:
            return { ...state, err: action.err };

        default:
            return state;
    }
};

export const filteringReducerDecorator = (oldState, state) => { // (client-side)
    if (oldState.rows !== state.rows || oldState.filter !== state.filter) {
        let filterLower = state.filter ? state.filter.toLowerCase() : state.filter;
        return {
            ...state, rowsFiltered: (state.filter ? [... (state.rows || [])]
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

export const sortReducerDecorator = (oldState, state) => { // (client-side)
    if (oldState.rows !== state.rows || oldState.rowsFiltered !== state.rowsFiltered || oldState.sort !== state.sort) {
        return {
            ...state, rowsSorted: (state.sort ? [... (state.rowsFiltered || state.rows || [])]
                .sort(
                    (r1, r2) => {
                        let v1 = ((SORT_TITLE === state.sort.what ? r1.title : SORT_COL === state.sort.what ? r1.colvalues[state.sort.colid] : undefined) || '');
                        let v2 = ((SORT_TITLE === state.sort.what ? r2.title : SORT_COL === state.sort.what ? r2.colvalues[state.sort.colid] : undefined) || '');
                        return (state.sort.desc ? -1 : 1) * (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);
                    })
                : null)
        }
    } else {
        return state;
    }
}

export const mainReducer = (state = {}, action) =>
    sortReducerDecorator(state,
        filteringReducerDecorator(state,
            coreReducer(state, action)));

export default mainReducer;