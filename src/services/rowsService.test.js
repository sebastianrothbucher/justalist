jest.mock('../wndw');

import unexpected from 'unexpected';
import wndwMock from '../wndw';
import { loadRowsService } from './rowsService';
import { BASE_URL } from './serviceConstants';

const expect = unexpected.clone();

describe("rows service", () => { // TODO: 4 real

    beforeEach(() => {
        wndwMock.setTimeout.mockClear();
    });

    it("loads rows", () => {
        // wndwMock.setTimeout.mockImplementation(cb => cb());
        wndwMock.fetch.mockReturnValue(Promise.resolve({json: () => ([{ _id: 'r1' }, { _id: 'r2' }])}));
        return loadRowsService().then(res => {
            expect(wndwMock.fetch.mock.calls, 'to exhaustively satisfy', [[BASE_URL + '/1/rows']]);
            expect(res, 'to satisfy', [{ _id: 'r1' }, { _id: 'r2' }]);
        });
    });

});