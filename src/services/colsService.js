import wndw from '../wndw';

export const loadColsService = () =>
    new Promise((resolve) => wndw.setTimeout(() => resolve([
        { _id: "c1", name: "Mocks", choices: [{ value: "in progress", color: "yellow" }, { value: "need more love", color: "red" }, { value: "done", color: "green" }, { value: "postponed" }] },
        { _id: "c2", name: "Tests", choices: [{ value: "fail", color: "red" }, { value: "pass", color: "green" }] }
    ]), 200)); // TODO: 4 real