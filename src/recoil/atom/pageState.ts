import {atom} from 'recoil'

export const pageState = atom<number>({
    key : 'pageValue',
    default : 1,
});