import wndw from '../wndw';
import { BASE_URL } from './serviceConstants';

export const loadColsService = () => wndw.fetch(BASE_URL + '/1/cols').then(res => res.json());