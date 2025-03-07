import {selector} from 'recoil';
import axios from 'axios';
import { searchState } from '../atom/searchState';
import { pageState } from '../atom/pageState';

// open Api 호출
const API_URL = "https://api.unsplash.com/search/photos";
// axios 
const API_KEY = "CFzNsTNxafdH_zYJkbhDURMo12IoHxnBa95wZ-7615Q";
export const PER_PAGE = 30;


export const imageData = selector({
    key : 'imageData',
    get : async ( {get} ) => {
        const searchValue = get(searchState)
        const pageValue = get(pageState)

        // api 호출 
        try {

            const res = await axios.get(`${API_URL}?query=${searchValue}&client_id=${API_KEY}&page=${pageValue}&per_page=${PER_PAGE}`)
            // const res = await axios.get(`${API_URL}?query=${searchValue}&client_id=${API_KEY}&page=${pageValue}&per_page=${PER_PAGE}`)
            // console.log(res.data.results);

            if(res.status === 200 ){
                return res.data;
            }else{
                return null;
            }

            

        } catch (error) {
            console.log(error);
        }
    },
})