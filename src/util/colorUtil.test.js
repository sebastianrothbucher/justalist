import unexpected from 'unexpected';
import { matchingForeground, determineBackground } from './colorUtil';

const expect = unexpected.clone();

describe("color util", () => {

    it("matches foreground based on color darkness", () => {
        expect(matchingForeground("darkblue"), 'to be', "white");
        expect(matchingForeground("yellow"), 'to be', "black");
    });

    it("gets background from col and row", () => {
        expect(determineBackground({ _id: 88, choices: [{ value: "one", color: "pink" }] }, { colvalues: { 88: "one" } }), 'to be', "pink");
        expect(determineBackground({ _id: 88, choices: [{ value: "one", color: "pink" }] }, { colvalues: { 88: "two" } }), 'to be null');
    });

});