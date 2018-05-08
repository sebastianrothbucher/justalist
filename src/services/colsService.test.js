jest.mock('../wndw');

import unexpected from 'unexpected';
import wndwMock from '../wndw';
import { loadColsService } from './colsService';
import { BASE_URL } from './serviceConstants';

const expect = unexpected.clone();

describe("cols service", () => { // TODO: 4 real

    beforeEach(() => {
        wndwMock.setTimeout.mockClear();
    });

    it("loads cols", () => {
        // wndwMock.setTimeout.mockImplementation(cb => cb());
        wndwMock.fetch.mockReturnValue(Promise.resolve({ json: () => ([{ _id: 'c1' }, { _id: 'c2' }]) }));
        return loadColsService().then(res => {
            expect(wndwMock.fetch.mock.calls, 'to exhaustively satisfy', [[BASE_URL + '/1/cols']]);
            expect(res, 'to satisfy', [{ _id: 'c1' }, { _id: 'c2' }]);
        });
    });

});