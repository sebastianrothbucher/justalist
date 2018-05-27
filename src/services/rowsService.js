import wndw from '../wndw';
import { BASE_URL } from './serviceConstants';

export const loadRowsService = () => wndw.fetch(BASE_URL + '/1/rows').then(res => res.json());