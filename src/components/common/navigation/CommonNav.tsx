import { Link, useLocation } from 'react-router-dom';
import styles from './CommonNav.module.scss'
import { useEffect, useState } from 'react'
import navJson  from './nav.json'
import { useRecoilState} from 'recoil';
import { pageState } from '../../../recoil/atom/pageState';
import { searchState } from '../../../recoil/atom/searchState';

export default function CommonNav() {

interface Navigation {
    "index": number,
    "path": string,
    "label": string,
    "searchValue": string,
    "isActive": boolean
};

const defaultNavi : Navigation[] = navJson;

const location = useLocation();

const [navigation , setNavigation] = useState<Navigation[]>(defaultNavi);
const [page , setPage]  = useRecoilState(pageState);
const [search, setSearch] = useRecoilState(searchState);

// console.log( navigation.length );

useEffect(()=>{
  // console.log(location.pathname);
  navigation.forEach((nav:Navigation)=>{
    nav.isActive = false;
    if(nav.path === location.pathname || location.pathname.includes(nav.path)){
      nav.isActive = true;
      setSearch(nav.searchValue);
      setPage(1);
    }

    setNavigation([...navigation])
  })
},[location.pathname]);


  return (
    <nav className={styles.navigation}>
    {navigation.map((item:Navigation)=>(
      <Link to={item.path} className={item.isActive? `${styles.navigation__menu} ${styles.active}`  : `${styles.navigation__menu} ${styles.inactive}`} key={item.path}>        
        <span className={styles.navigation__menu__label}>{item.label}</span>        
      </Link>
    ))}    
    </nav>
  )
}
