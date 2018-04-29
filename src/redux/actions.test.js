jest.mock('../services/colsService');

import unexpected from 'unexpected';
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import { loadColsService as loadColsServiceMock } from '../services/colsService';
import { loadCols } from './actions';

const expect = unexpected.clone();
const mockStore = configureMockStore([thunkMiddleware]);

describe("action creators", () => {

    beforeEach(() => {
        loadColsServiceMock.mockClear();
    });

    it("loads cols", () => {
        loadColsServiceMock.mockImplementation(() => Promise.resolve(['c1', 'c2']));
        const store = mockStore({});
        return store.dispatch(loadCols()).then(() => {
            expect(loadColsServiceMock.mock.calls.length, 'to be', 1);
            expect(
                store.getActions(),
                'to exhaustively satisfy',
                [{ type: 'COLS_LOADED', cols: ['c1', 'c2'] }]
            );
        });
    });

});