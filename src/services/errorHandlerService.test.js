import { handleError } from './errorHandlerService';

describe("error handler service", () => {

    it("handles errors", () => {
        handleError("whatever"); // (so far: just pass)
    });

});