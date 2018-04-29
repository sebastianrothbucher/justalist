jest.mock('../wndw');

import unexpected from 'unexpected';
import wndwMock from '../wndw';
import { loadColsService } from './colsService';

const expect = unexpected.clone();

describe("cols service", () => {

    beforeEach(() => {
        wndwMock.setTimeout.mockClear();
    });

    it("loads cols", () => {
        wndwMock.setTimeout.mockImplementation(cb => cb());
        return loadColsService().then(res => {
            expect(res, 'to exhaustively satisfy', ['c1', 'c2']);
        });
    });

});