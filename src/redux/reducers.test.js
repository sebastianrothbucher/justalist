import { COLS_LOADED, ROWS_LOADED, FILTER, SORT, ERROR, SORT_TITLE, SORT_COL } from './actionConstants'
import unexpected from 'unexpected';
import { coreReducer, mainReducer, filteringReducerDecorator, sortReducerDecorator } from './reducers';

const expect = unexpected.clone();

describe("reducers", () => {

    describe("core reducer", () => {

        it("adds cols", () => {
            const oldState = { a: 88 };
            expect(
                coreReducer(oldState, { type: COLS_LOADED, cols: [{ _id: 'c1' }, { _id: 'c2' }] }),
                'to exhaustively satisfy',
                { a: 88, cols: [{ _id: 'c1' }, { _id: 'c2' }] }
            );
        });

        it("adds rows", () => {
            const oldState = { a: 88 };
            expect(
                coreReducer(oldState, { type: ROWS_LOADED, rows: [{ _id: 'r1' }, { _id: 'r2' }] }),
                'to exhaustively satisfy',
                { a: 88, rows: [{ _id: 'r1' }, { _id: 'r2' }] }
            );
        });

        it("adds filter criteria", () => {
            const oldState = { a: 88 };
            expect(
                coreReducer(oldState, { type: FILTER, filter: 'whatever' }),
                'to exhaustively satisfy',
                { a: 88, filter: 'whatever' }
            );
        });

        it("adds sort criteria", () => {
            const oldState = { a: 88 };
            expect(
                coreReducer(oldState, { type: SORT, sort: { what: SORT_TITLE, desc: true } }),
                'to exhaustively satisfy',
                { a: 88, sort: { what: SORT_TITLE, desc: true } }
            );
        });

        it("handles errors", () => {
            const oldState = { a: 88 };
            expect(
                coreReducer(oldState, { type: ERROR, err: "testerr" }),
                'to exhaustively satisfy',
                { a: 88, err: "testerr" }
            );
        });

        it("does the default", () => {
            const oldState = { a: 88 };
            expect(
                mainReducer(oldState, { type: 'ANYTHING', rows: [{ _id: 'r1' }, { _id: 'r2' }] }),
                'to equal',
                oldState
            );
        });

    });

    describe("filtering decorator", () => {

        const oldStateBase = {
            rows: [
                { _id: 'r1', title: 'some t1 whatever', colvalues: { 'c1': 'some c2 whatever' } },
                { _id: 'r2', title: 'some t2 whatever', colvalues: { 'c1': 'some c1 whatever' } },
            ],
            rowsFiltered: [],
            filter: null
        };

        it("filters rows based on title", () => {
            const newExpected = {
                ...oldStateBase, rowsFiltered: [
                    { _id: 'r1', title: 'some t1 whatever', colvalues: { 'c1': 'some c2 whatever' } }
                ], filter: 'T1'
            };
            expect(
                filteringReducerDecorator(oldStateBase, { ...oldStateBase, filter: 'T1' }),
                'to exhaustively satisfy',
                newExpected
            );
            // (also when changing rows!)
            expect(
                filteringReducerDecorator({ ...oldStateBase, rows: [], filter: 'T1' }, { ...oldStateBase, filter: 'T1' }),
                'to exhaustively satisfy',
                newExpected
            );
        });

        it("filters rows based on col", () => {
            const newExpected = {
                ...oldStateBase, rowsFiltered: [
                    { _id: 'r2', title: 'some t2 whatever', colvalues: { 'c1': 'some c1 whatever' } }
                ], filter: 'SoMe C1'
            };
            expect(
                filteringReducerDecorator(oldStateBase, { ...oldStateBase, filter: 'SoMe C1' }),
                'to exhaustively satisfy',
                newExpected
            );
            // (also when changing rows!)
            expect(
                filteringReducerDecorator({ ...oldStateBase, rows: [], filter: 'SoMe C1' }, { ...oldStateBase, filter: 'SoMe C1' }),
                'to exhaustively satisfy',
                newExpected
            );
        });

        it("removes if no filter", () => {
            expect(
                filteringReducerDecorator({ ...oldStateBase, filter: 'sth' }, { ...oldStateBase, filter: null }),
                'to exhaustively satisfy',
                { ...oldStateBase, rowsFiltered: null, filter: null }
            );
        });

        it("carries on upon no change", () => {
            const newState = { ...oldStateBase, otherAttr: true };
            expect(
                filteringReducerDecorator(oldStateBase, newState),
                'to equal',
                newState
            );
        });

    });

    describe("sorting decorator", () => {

        const oldStateBase = {
            rowsFiltered: [
                { _id: 'r1', title: 'some t1 whatever', colvalues: { 'c1': 'some c2 whatever' } },
                { _id: 'r2', title: 'some t2 whatever', colvalues: { 'c1': 'some c1 whatever' } },
            ],
            rowsSorted: [],
            sort: null
        };
        const oldStateBaseNoFilter = {
            rows: oldStateBase.rowsFiltered,
            rowsFiltered: null,
            rowsSorted: [],
            sort: null
        };

        it("sort rows based on title", () => {
            expect(
                sortReducerDecorator(oldStateBase, { ...oldStateBase, sort: { what: SORT_TITLE, desc: true } }),
                'to exhaustively satisfy',
                { ...oldStateBase, rowsSorted: [oldStateBase.rowsFiltered[1], oldStateBase.rowsFiltered[0]], sort: { what: SORT_TITLE, desc: true } }
            );
            // (also for no filtering)
            expect(
                sortReducerDecorator(oldStateBaseNoFilter, { ...oldStateBaseNoFilter, sort: { what: SORT_TITLE, desc: true } }),
                'to exhaustively satisfy',
                { ...oldStateBaseNoFilter, rowsSorted: [oldStateBaseNoFilter.rows[1], oldStateBaseNoFilter.rows[0]], sort: { what: SORT_TITLE, desc: true } }
            );
            // (also when changing rows!)
            expect(
                sortReducerDecorator({ ...oldStateBase, rowsFiltered: [], sort: { what: SORT_TITLE, desc: true } }, { ...oldStateBase, sort: { what: SORT_TITLE, desc: true } }),
                'to exhaustively satisfy',
                { ...oldStateBase, rowsSorted: [oldStateBase.rowsFiltered[1], oldStateBase.rowsFiltered[0]], sort: { what: SORT_TITLE, desc: true } }
            );
        });

        it("sort rows based on col", () => {
            expect(
                sortReducerDecorator(oldStateBase, { ...oldStateBase, sort: { what: SORT_COL, colid: 'c1', desc: false } }),
                'to exhaustively satisfy',
                { ...oldStateBase, rowsSorted: [oldStateBase.rowsFiltered[1], oldStateBase.rowsFiltered[0]], sort: { what: SORT_COL, colid: 'c1', desc: false } }
            );
            // (also for no filtering)
            expect(
                sortReducerDecorator(oldStateBaseNoFilter, { ...oldStateBaseNoFilter, sort: { what: SORT_COL, colid: 'c1', desc: false } }),
                'to exhaustively satisfy',
                { ...oldStateBaseNoFilter, rowsSorted: [oldStateBaseNoFilter.rows[1], oldStateBaseNoFilter.rows[0]], sort: { what: SORT_COL, colid: 'c1', desc: false } }
            );
            // (also when changing rows!)
            expect(
                sortReducerDecorator({ ...oldStateBase, rowsFiltered: [], sort: { what: SORT_COL, colid: 'c1', desc: false } }, { ...oldStateBase, sort: { what: SORT_COL, colid: 'c1', desc: false } }),
                'to exhaustively satisfy',
                { ...oldStateBase, rowsSorted: [oldStateBase.rowsFiltered[1], oldStateBase.rowsFiltered[0]], sort: { what: SORT_COL, colid: 'c1', desc: false } }
            );
        });

        it("removes if no sort", () => {
            expect(
                sortReducerDecorator({ ...oldStateBase, sort: { what: SORT_TITLE } }, { ...oldStateBase, sort: null }),
                'to exhaustively satisfy',
                { ...oldStateBase, rowsSorted: null, sort: null }
            );
        });

        it("carries on upon no change", () => {
            const newState = { ...oldStateBase, otherAttr: true };
            expect(
                sortReducerDecorator(oldStateBase, newState),
                'to equal',
                newState
            );
        });

    });

    describe("main reducer", () => { // we need at least this test - the ones above are good but optional

        it("adds cols", () => {
            const oldState = { a: 88 };
            expect(
                mainReducer(oldState, { type: COLS_LOADED, cols: [{ _id: 'c1' }, { _id: 'c2' }] }),
                'to exhaustively satisfy',
                { a: 88, cols: [{ _id: 'c1' }, { _id: 'c2' }] }
            );
        });

        it("adds rows", () => {
            const oldState = { a: 88 };
            expect(
                mainReducer(oldState, { type: ROWS_LOADED, rows: [{ _id: 'r1' }, { _id: 'r2' }] }),
                'to exhaustively satisfy',
                { a: 88, rows: [{ _id: 'r1' }, { _id: 'r2' }], rowsFiltered: null, rowsSorted: null }
            );
        });

        it("adds rows sorting and filtering", () => {
            const plainRows = [{ _id: 'r1', title: '1 whatever', colvalues: { 'c1': 'sth' } }, { _id: 'r2', title: 'sth else', colvalues: { 'c1': '2 whatever' } }, { _id: 'r3', title: null, colvalues: {} }];
            const oldState = { a: 88, filter: 'WHATever', sort: { what: SORT_TITLE, desc: true } };
            expect(
                mainReducer(oldState, { type: ROWS_LOADED, rows: plainRows }),
                'to exhaustively satisfy',
                { a: 88, filter: 'WHATever', sort: { what: SORT_TITLE, desc: true }, rows: plainRows, rowsFiltered: [plainRows[0], plainRows[1]], rowsSorted: [plainRows[1], plainRows[0]] }
            );
        });

        it("adds filter and sort criteria", () => { // (test both in one - and other sequence than reducers and default, just to construct a little elaborate case)
            const plainRows = [{ _id: 'r1', title: '1 whatever', colvalues: { 'c1': 'sth' } }, { _id: 'r2', title: 'sth else', colvalues: { 'c1': '2 whatever' } }, { _id: 'r3', title: null, colvalues: {} }];
            const oldState = { a: 88, rows: plainRows, rowsFiltered: null, rowsSorted: null };
            expect(
                mainReducer(mainReducer(mainReducer(oldState, { type: SORT, sort: { what: SORT_TITLE, desc: true } }), { type: FILTER, filter: 'WHATever' }), {} /*default*/),
                'to exhaustively satisfy',
                { a: 88, filter: 'WHATever', sort: { what: SORT_TITLE, desc: true }, rows: plainRows, rowsFiltered: [plainRows[0], plainRows[1]], rowsSorted: [plainRows[1], plainRows[0]] }
            );
        });

        it("does the default", () => {
            const oldState = { a: 88 };
            expect(
                mainReducer(oldState, { type: 'ANYTHING', rows: [{ _id: 'r1' }, { _id: 'r2' }] }),
                'to equal',
                oldState
            );
        });

    });

});