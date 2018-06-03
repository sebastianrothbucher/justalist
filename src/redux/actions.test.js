jest.mock('../services/colsService');
jest.mock('../services/rowsService');
jest.mock('../services/errorHandlerService');

import unexpected from 'unexpected';
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import { COLS_LOADED, ROWS_LOADED, FILTER, SORT, EDIT_ROW, ERROR, SORT_COL } from './actionConstants';
import { loadColsService as loadColsServiceMock } from '../services/colsService';
import { loadRowsService as loadRowsServiceMock } from '../services/rowsService';
import { handleError as handleErrorMock } from '../services/errorHandlerService';
import { loadCols, loadRows, filter, sort, editRow } from './actions';

const expect = unexpected.clone();
const mockStore = configureMockStore([thunkMiddleware]);

describe("action creators", () => {

    beforeEach(() => {
        loadColsServiceMock.mockClear();
        loadRowsServiceMock.mockClear();
        handleErrorMock.mockClear();
    });

    it("loads cols", () => {
        loadColsServiceMock.mockImplementation(() => Promise.resolve(['c1', 'c2']));
        const store = mockStore({});
        return store.dispatch(loadCols()).then(() => {
            expect(loadColsServiceMock.mock.calls.length, 'to be', 1);
            expect(
                store.getActions(),
                'to exhaustively satisfy',
                [{ type: COLS_LOADED, cols: ['c1', 'c2'] }]
            );
        });
    });

    it("loads cols with async await", async () => { // same test again - just for the heck of it
        loadColsServiceMock.mockImplementation(() => Promise.resolve(['c1', 'c2']));
        const store = mockStore({});
        await store.dispatch(loadCols());
        expect(loadColsServiceMock.mock.calls.length, 'to be', 1);
        expect(
            store.getActions(),
            'to exhaustively satisfy',
            [{ type: COLS_LOADED, cols: ['c1', 'c2'] }]
        );
    });

    it("loads cols handling error", () => {
        loadColsServiceMock.mockImplementation(() => Promise.reject('whatever'));
        const store = mockStore({});
        return store.dispatch(loadCols()).then(() => {
            expect(
                store.getActions(),
                'to exhaustively satisfy',
                [{ type: ERROR, err: 'whatever' }]
            );
            expect(
                handleErrorMock.mock.calls,
                'to exhaustively satisfy',
                [['whatever']]
            );
        });
    });

    it("loads rows", () => {
        loadRowsServiceMock.mockImplementation(() => Promise.resolve(['r1', 'r2']));
        const store = mockStore({});
        return store.dispatch(loadRows()).then(() => {
            expect(loadRowsServiceMock.mock.calls.length, 'to be', 1);
            expect(
                store.getActions(),
                'to exhaustively satisfy',
                [{ type: ROWS_LOADED, rows: ['r1', 'r2'] }]
            );
        });
    });

    it("loads rows handling error", () => {
        loadRowsServiceMock.mockImplementation(() => Promise.reject('whatever'));
        const store = mockStore({});
        return store.dispatch(loadRows()).then(() => {
            expect(
                store.getActions(),
                'to exhaustively satisfy',
                [{ type: ERROR, err: 'whatever' }]
            );
            expect(
                handleErrorMock.mock.calls,
                'to exhaustively satisfy',
                [['whatever']]
            );
        });
    });

    it("filters", () => {
        const store = mockStore({});
        store.dispatch(filter('whatever'));
        expect(store.getActions(), 'to exhaustively satisfy', [{ type: FILTER, filter: 'whatever' }]);
    });

    it("sorts", () => {
        const store = mockStore({});
        store.dispatch(sort(SORT_COL, 'c1', true));
        expect(store.getActions(), 'to exhaustively satisfy', [{ type: SORT, sort: { what: SORT_COL, colid: 'c1', desc: true } }]);
    });

    it("edits a row", () => {
        const store = mockStore({});
        store.dispatch(editRow({ _id: 'r1', title: 'new title' }));
        expect(store.getActions(), 'to exhaustively satisfy', [{ type: EDIT_ROW, newRow: { _id: 'r1', title: 'new title' } }]);
    });

});