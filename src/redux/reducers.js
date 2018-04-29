const rdcr = (state = {}, action) => {
    switch (action.type) {
        case 'COLS_LOADED':
            return { ...state, cols: action.cols };

        default:
            return state;
    }
};

export default rdcr;