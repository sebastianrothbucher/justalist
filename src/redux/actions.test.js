jest.mock('../wndw');

import unexpected from 'unexpected';
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import wndw from '../wndw';
import { loadCols } from './actions';

const expect = unexpected.clone();
const mockStore = configureMockStore([thunkMiddleware]);

describe("action creators", () => {

    it("loads cols", () => {
        wndw.setTimeout.mockImplementation(cb => cb());
        const store = mockStore({});
        return store.dispatch(loadCols()).then(() => {
            expect(wndw.setTimeout.mock.calls.length, 'to be', 1);
            expect(
                store.getActions(),
                'to exhaustively satisfy',
                [{ type: 'COLS_LOADED', cols: ['c1', 'c2'] }]
            );
        });
    });

});