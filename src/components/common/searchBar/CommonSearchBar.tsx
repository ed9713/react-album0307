import styles from "./CommonSearchBar.module.scss";
import React, { useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { searchState } from "../../../recoil/atom/searchState";
import { pageState } from "../../../recoil/atom/pageState";

export default function CommonSearchBar() {

  const [search, setSearch] = useRecoilState(searchState);
  const [page, setPage] = useRecoilState(pageState);
  const [text , setText] = useState('');
  const onChange = (event)=>{
      console.log(event.target.value);
      setText(event.target.value);
  };

  const onSearch = ()=>{
    setPage(1)

    if(text===""){
      setSearch('korea');
    }else{
      setSearch(text);
    }
  };

  const handleKeyDown = (event : React.KeyboardEvent)=>{
//    console.log(event.key);
//    console.log(text);
    
    if(event.key === 'Enter'){
      setPage(1)
      if(text===""){
        setSearch('korea');
      }else{
        setSearch(text);
      }
    }
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__search}>
        <input type="text" placeholder='찾으실 이미지를 검색하세요' 
          className={styles.searchBar__search_input}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          />
        <img src="/src/assets/icons/icon-search.svg" alt="" onClick={onSearch}/>
      </div>
    </div>
  )
}
