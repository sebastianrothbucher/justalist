import wndw from '../wndw';

export const loadColsService = () =>
    new Promise((resolve) => wndw.setTimeout(() => resolve(['c1', 'c2']), 200));