jest.mock('../wndw');

import unexpected from 'unexpected';
import wndwMock from '../wndw';
import { loadRowsService } from './rowsService';

const expect = unexpected.clone();

describe("rows service", () => { // TODO: 4 real

    beforeEach(() => {
        wndwMock.setTimeout.mockClear();
    });

    it("loads rows", () => {
        wndwMock.setTimeout.mockImplementation(cb => cb());
        return loadRowsService().then(res => {
            expect(res, 'to satisfy', [{ _id: 'r1' }, { _id: 'r2' }]);
        });
    });

});