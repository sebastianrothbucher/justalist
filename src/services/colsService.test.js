jest.mock('../wndw');

import unexpected from 'unexpected';
import wndwMock from '../wndw';
import { loadColsService } from './colsService';
import { BASE_URL } from './serviceConstants';

const expect = unexpected.clone();

describe("cols service", () => {

    beforeEach(() => {
        wndwMock.fetch.mockClear();
    });

    it("loads cols", () => {
        wndwMock.fetch.mockReturnValue(Promise.resolve({ json: () => ([{ _id: 'c1' }, { _id: 'c2' }]) }));
        return loadColsService().then(res => {
            expect(wndwMock.fetch.mock.calls, 'to exhaustively satisfy', [[BASE_URL + '/1/cols']]);
            expect(res, 'to satisfy', [{ _id: 'c1' }, { _id: 'c2' }]);
        });
    });

});