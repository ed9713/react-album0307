import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import styles from './CommonFooter.module.scss'
import { imageData, PER_PAGE } from '../../../recoil/selectors/imageSelector';
import { pageState } from '../../../recoil/atom/pageState';
import { useEffect, useState } from 'react';
import { searchState } from '../../../recoil/atom/searchState';

export default function CommonFooter() {

  const TOTAL_PAGE_CNT_MAX = 200;

  // const images = useRecoilValue(imageData);
  const images = useRecoilValueLoadable(imageData); 
  const search = useRecoilValue(searchState);

  const [page, setPage] = useRecoilState(pageState);
  const [step, setStep] = useState(0);

//  console.log(images);  

  useEffect(()=>{
    setStep(0)
  },[search])

  // 페이지 리스트 ui 생성
  const newArr : number[] = new Array();
  for(let i = 1; i <= images.contents.total_pages ; i++){
    newArr.push(i);
  }
  
  const length = newArr.length;
  const divide = Math.floor(length/10) + (Math.floor(length % 10 ) > 0 ? 1 : 0)  // page block 
  const res = [];

//  console.log(' divide ' , divide);

  for(let i= 0 ; i < divide ; i++ ){
    // 배열 0부터 n개씩 잘라서 새 배열에 넣기
    res.push(newArr.splice(0,10))
  }
 
  const pages = ( res[step] &&   res[step].map(( item : number , index: number )=>{
    
    if(item < 11){

      // console.log(item);
      return (
        
        <button className={ index === page - 1 
          ? `${styles.pagination__button} ${styles.active}` 
          : `${styles.pagination__button} ${styles.inactive}`} key={item} onClick={()=> moveToPage(item) }>{item}</button>
      )
    }else{
      return (
        <button className={ index === page - 1 - step * 10 
          ? `${styles.pagination__button} ${styles.active}` 
          : `${styles.pagination__button} ${styles.inactive}`} key={item} onClick={()=> moveToPage(item) }>{item}</button>
      )      
    }
  }));

/*
  console.log("===============");
  console.log(newArr);
  console.log(res);
  console.log('p ', page);
  console.log('s ', step);
  console.log(divide);  
  console.log("===============");
*/
  //==== 
  // 이동버튼

  const moveToPage = (selected:number) => {
    // console.log(selected);
    setPage(selected)
  }

  const moveToPrev = ()=>{
    if(step === 0 ){
      console.log('작동안함 moveToPrev');
      return 
    }else{
      setStep(step-1)
      setPage(res[step-1][0])
    }
  }

  const moveToNext = ()=>{

    if( res[step+1] && res[step+1][0] < TOTAL_PAGE_CNT_MAX - 1 ){
      setStep(step+1)
      setPage(res[step+1][0])
    }else{
      console.log('작동안함 moveToNext');
      return // 마지막 페이지임 
    }
  }
  
  const moveToFirst = ()=>{
    if(page === 0 ){
      console.log('작동안함 moveToFirst');
      return 
    }else{
      setStep(0)
      setPage(1)
    }
  }

  const moveToEnd = ()=>{
    
    // alert();
    let settingStepValue : number = step; // 세팅할 step 
    let settingPageValue : number = page; // 세팅할 page 
    let total_page_cnt : number = images.contents.total_pages;

    settingPageValue = total_page_cnt > TOTAL_PAGE_CNT_MAX ? TOTAL_PAGE_CNT_MAX : images.contents.total_pages;
    // settingStepValue = Math.floor(settingPageValue/10) + (Math.floor(settingPageValue % 10 ) > 0 ? 1 : 0)
    settingStepValue = Math.floor(settingPageValue/10) + (Math.floor(settingPageValue % 10 ) > 0 ? 1 : 0) - 1;

    // PER_PAGE
    if( page < settingPageValue ){

      setStep(settingStepValue);
      setPage(settingPageValue);      

    }else{
      console.log('작동안함 moveToEnd');
      return // 마지막 페이지임 
    }
  }


  return (
    <footer className={styles.footer}>
      <div className={styles.pagination}>
        <button className={styles.pagination__button}>
            <img src="/src/assets/icons/icon-arrowLeft.svg" alt="" onClick={moveToFirst}/>
        </button>
        <button className={styles.pagination__button}>
            <img src="/src/assets/icons/icon-arrowLeft.svg" alt="" onClick={moveToPrev}/>
        </button>
        {/* 변경될 ui 부분 */}
        {pages}
        <button className={styles.pagination__button}>
            <img src="/src/assets/icons/icon-arrowRight.svg" alt="" onClick={moveToNext} />
        </button>
        <button className={styles.pagination__button}>
            <img src="/src/assets/icons/icon-arrowRight.svg" alt="" onClick={moveToEnd} />
        </button>

      </div>
    </footer>
  )
}