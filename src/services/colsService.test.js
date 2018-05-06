jest.mock('../wndw');

import unexpected from 'unexpected';
import wndwMock from '../wndw';
import { loadColsService } from './colsService';

const expect = unexpected.clone();

describe("cols service", () => { // TODO: 4 real

    beforeEach(() => {
        wndwMock.setTimeout.mockClear();
    });

    it("loads cols", () => {
        wndwMock.setTimeout.mockImplementation(cb => cb());
        return loadColsService().then(res => {
            expect(res, 'to satisfy', [{ _id: 'c1' }, { _id: 'c2' }]);
        });
    });

});