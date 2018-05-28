import unexpected from 'unexpected';
import { matchingForeground } from './colorUtil';

const expect = unexpected.clone();

describe("color util", () => {

    it("matches foreground based on color darkness", () => {
        expect(matchingForeground("darkblue"), 'to be', "white");
        expect(matchingForeground("yellow"), 'to be', "black");
    });

});