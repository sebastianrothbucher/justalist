import unexpected from 'unexpected';
import styleRes from './styleRes';

const expect = unexpected.clone();

describe("style resolution util", () => {

    it("uses prop from styles when there", () => {
        expect(styleRes({test: "teststyle"}, "test"), 'to be', "teststyle");
        expect(styleRes({}, "test"), 'to be', "test");
        expect(styleRes(null, "test"), 'to be', "test");
    });
});
