import unexpected from 'unexpected';
import rootReducer from './reducers';

const expect = unexpected.clone();

describe("reducers", () => {

    it("adds cols", () => {
        expect(
            rootReducer({ a: 88 }, { type: 'COLS_LOADED', cols: ['c1', 'c2'] }),
            'to exhaustively satisfy',
            { a: 88, cols: ['c1', 'c2'] }
        );
    });

    it("does the default", () => {
        expect(
            rootReducer({ a: 88 }, { type: 'ANYTHING', cols: ['c1', 'c2'] }),
            'to exhaustively satisfy',
            { a: 88 }
        );
    });

});