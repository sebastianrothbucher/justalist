import wndw from '../wndw';

export const loadRowsService = () =>
    new Promise((resolve) => wndw.setTimeout(() => resolve(['r1', 'r2']), 200)); // TODO: 4 real