import wndw from '../wndw';
import { BASE_URL } from './serviceConstants';

export const loadColsService = () => wndw.fetch(BASE_URL + '/1/cols').then(res => res.json());
    /*new Promise((resolve) => wndw.setTimeout(() => resolve([
        { _id: "c1", name: "Mocks", choices: [{ value: "in progress", color: "yellow" }, { value: "need more love", color: "red" }, { value: "done", color: "green" }, { value: "postponed" }] },
        { _id: "c2", name: "Tests", choices: [{ value: "fail", color: "red" }, { value: "pass", color: "green" }] }
    ]), 200));*/