import wndw from '../wndw';

export const loadRowsService = () =>
    new Promise((resolve) => wndw.setTimeout(() => resolve([
        { _id: "r1", title: "Table overview", colvalues: { col1: "need more love", col2: "fail" } },
        { _id: "r2", title: "Details view", colvalues: { col1: "in progress" } }
    ]), 200)); // TODO: 4 real