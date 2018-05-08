import wndw from '../wndw';
import { BASE_URL } from './serviceConstants';

export const loadRowsService = () => wndw.fetch(BASE_URL + '/1/rows').then(res => res.json());
    /*new Promise((resolve) => wndw.setTimeout(() => resolve([
        { _id: "r1", title: "Table overview", colvalues: { "c1": "need more love", "c2": "fail" } },
        { _id: "r2", title: "Details view", colvalues: { "c1": "in progress" } }
    ]), 200));*/