import { useEffect, useState } from 'react'
import CommonHeader from '../../components/common/header/CommonHeader'
import styles from './styles/index.module.scss'
import Card from './components/Card';
import { CardDTO } from '../index/types/card';

export default function index() {

  const [data, setData] = useState([]);

  const getData = ()=>{
    const getLocalStarage = JSON.parse(localStorage.getItem('bookmark') );
    console.log(getLocalStarage);
   
    if( getLocalStarage || getLocalStarage !== null ){
      getLocalStarage.reverse();
      setData(getLocalStarage);
    }else{
      setData([]);
    }
  }

  useEffect( ()=>{
    getData();
  } , []);
  

  return (
    <div className='{styles.page}'>
      {/* 공통 헤더 ui부분 */}
      <CommonHeader />
      <main className={styles.page__contents}>
        {data.length === 0 ? <div className={styles.page__contents__noData}>데이터가 없다.</div> : <></>}
        {data.map(( item : CardDTO)=>(
          <Card prop={item} key={item.id}/>
        ))}        
      </main>
    </div>
  )
}
