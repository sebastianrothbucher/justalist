import wndw from '../wndw';

export const loadRowsService = () =>
    new Promise((resolve) => wndw.setTimeout(() => resolve([
        { _id: "r1", title: "Table overview", colvalues: { "c1": "need more love", "c2": "fail" } },
        { _id: "r2", title: "Details view", colvalues: { "c1": "in progress" } }
    ]), 200)); // TODO: 4 real