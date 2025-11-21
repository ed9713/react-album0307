import axios from 'axios'
import { useRecoilValue, useRecoilValueLoadable } from 'recoil'
import { imageData } from '../../recoil/selectors/imageSelector'
import CommonFooter from '../../components/common/footer/CommonFooter'
import CommonHeader from '../../components/common/header/CommonHeader'
import CommonNav from '../../components/common/navigation/CommonNav'
import CommonSearchBar from '../../components/common/searchBar/CommonSearchBar'
import Card from './components/Card'
import DetailDialog from '../../components/common/dialog/DetailDialog'

import styles from './styles/index.module.scss'
import { useEffect, useMemo, useState } from 'react'

import {CardDTO} from './types/card'
import Loading from './components/Loading'

export default function index() {

  // 8시 33분 테스트

  const imgSelector = useRecoilValueLoadable(imageData);
  // const imgSelector = useRecoilValue(imageData);
  const [imgData, setImgData] = useState<CardDTO>();
  const [open, setOpen] = useState<boolean>(false);
  const [totalCnt, setTotalCnt] = useState<number>(0);

  //  console.log(imgSelector);

  /*
  const  getData = async () => {
    // open Api 호출
    const API_URL = "https://api.unsplash.com/search/photos";
    // axios 
    const API_KEY = "CFzNsTNxafdH_zYJkbhDURMo12IoHxnBa95wZ-7615Q";
    const PER_PAGE = 10;

    const searchValue = "korea";
    const pageValue = 100;

    try {
      const res = await axios.get(`${API_URL}?query=${searchValue}&client_id=${API_KEY}&page=${pageValue}&per_page=${PER_PAGE}`)
      console.log(res.data.results);
      if(res.status === 200 ){
        setImgData(res.data.results);
      }

    } catch (error) {
      console.log(error);
    }
  };
  */

/*
  { imgSelector.data.results.map((item : CardDTO)=>(
    <Card data={item} key={item.id} handleDialog={setOpen} handleSetData={setImgData}/>
  ))}
*/
/*
  const CARD_LIST = imgSelector.data.results.map((item : CardDTO) => { 
    return <Card data={item} key={item.id} handleDialog={setOpen} handleSetData={setImgData}/>
  });
*/


  const CARD_LIST = useMemo(()=>{
    // console.log(imgSelector);
    if(imgSelector.state === 'hasValue'){
      const result = imgSelector.contents.results.map((item : CardDTO) => { 
        return <Card data={item} key={item.id} handleDialog={setOpen} handleSetData={setImgData}/>
      });
      return result;
    }else{
      return <Loading />
    }
  },[imgSelector]);



  useEffect(()=>{
    setTotalCnt( imgSelector.contents.total );
  },[imgSelector]);

  return (
    <div className="{styles.page}">
      <CommonHeader />
      {/* 공통 네비게이션  UI 부분 */}
      <CommonNav />
      <div className={styles.page__contents}>
        <div className={styles.page__contents__introBox}>
            <div className={styles.wrapper}>
                <span className={styles.wrapper__title}>photosplash</span>
                <span className={styles.wrapper__desc}>
                    인터넷의 시각 자료 출처 입니다. <br />
                    모든 지역에 있는 크리에이터들의 지원을 받습니다. 
                </span>    
                <CommonSearchBar />
            </div>
        </div>
        <div className={styles.page__contents__imageBox}>
          총 {totalCnt}개
        </div>
        <div className={styles.page__contents__imageBox}>
          {CARD_LIST}
        </div>
      </div>
      {/* 공통 푸터 UI 부분  */}      
      <CommonFooter />  
      {open && <DetailDialog data={imgData} handleDialog={setOpen} />}
   </div>
  )
}
