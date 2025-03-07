import { useEffect, useState } from 'react';
import { CardDTO, Tag } from '../../../pages/index/types/card';
import styles from './DetailDialog.module.scss'
import toast , {toastConfig} from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css';

toastConfig({theme:'dark'})



interface Props {
  data : CardDTO;
  handleDialog: (eventValue:boolean) => void;
}

export default function DetailDialog( {data, handleDialog } : Props ) {

    console.log(data);

    const closeDialog = ()=>{
        handleDialog(false);
    };

    const [bookmark, setBookmark] = useState(false);

    const addBookmark = (selected : CardDTO)=>{
        // setBookmark(!bookmark);
        // setBookmark(true);

        const getLocalStarage = JSON.parse(localStorage.getItem('bookmark'));
        // console.log( getLocalStarage );
        // 1. 로컬스토리지에 북마크 라는 데이타가 없을때. 
        if( !getLocalStarage || getLocalStarage === null ){
            localStorage.setItem('bookmark', JSON.stringify([selected]));
            toast("해당 이미지를 북마크에 저장하였습니다.")
            setBookmark(true);
            // console.log("해당 이미지를 북마크에 저장하였습니다.");
        }else{
            // 2. 로컬 스토리지에 이미 있는 경우 
            /*
            if(getLocalStarage.findIndex((item : CardDTO) => ( item.id === selected.id )) > -1  ){
                toast("해당 이미지는 이미 북마크에 있습니다.🆖")
                setBookmark(false);
            }else{
                // 3. 해당 이미지가 로컬 스토리지에 없는 경우
                const res = [...getLocalStarage];4
                res.push(selected);
                localStorage.setItem('bookmark', JSON.stringify(res));
                toast("해당 이미지를 북마크에 저장하였습니다.222");
                setBookmark(true);
            }
            */
            const res = [...getLocalStarage];
            const itemIndex = res.findIndex((item : CardDTO) => ( item.id === selected.id ));
            let bookmarkValue = false;

            if(itemIndex > -1  ){                        
                res.splice(itemIndex,1);
            }else{
                // 3. 해당 이미지가 로컬 스토리지에 없는 경우               
                res.push(selected);               
            }   
            
            localStorage.setItem('bookmark', JSON.stringify(res));
            toast(itemIndex > -1? '해당 이미지는 이미 북마크에 있습니다. 북마크에서 삭제합니다.' : '해당 이미지를 북마크에 저장하였습니다.222');
            setBookmark( itemIndex > -1? false : true);

        }
         

    };

    useEffect(()=>{
        const getLocalStarage = JSON.parse(localStorage.getItem('bookmark'));
        if( getLocalStarage && getLocalStarage.findIndex((item : CardDTO) => ( item.id === data.id )) > -1  ){
            setBookmark(true);        
        }else{
            setBookmark(false);   
        }

        // esc 눌렀을때 다이얼로그 창 닫기
        const escKeyDonwCloseDialog = (event : React.KeyboardEvent) =>{
            console.log(event.key);
            console.log('다이얼로그 닫기기');
            if(event.key === 'Escape'){
                closeDialog();
            }
        }
    
        // esc 눌렀을떼ㅐ 이벤트 등록 및 제거
        document.addEventListener("keydown" , escKeyDonwCloseDialog)
        return () => document.removeEventListener("keydown",escKeyDonwCloseDialog)

    },[]);

  return (
    <div className={styles.container}>
      <div className={styles.container__dialog}>
        <div className={styles.container__dialog__header}>
            <div className={styles.close}>
                <button className={styles.close_button} onClick={closeDialog}>
                    <span className='material-symbols-outlined' style={{fontSize:28 + 'px'}}>
                        close
                    </span>
                </button>
                <img src={data.user.profile_image.small} alt=""  className={styles.close_authorImage}/>
                <span className={styles.close_authorName}>{data.user.name}</span>
            </div>
            <div className={styles.bookmark}>
                <button className={styles.bookmark__button} onClick={()=>addBookmark(data)}>
                    { bookmark === false ? (
                    <span className='material-symbols-outlined' style={{fontSize:28 + 'px'}}>
                        favorite
                    </span> 
                    ) : (
                    <span className='material-symbols-outlined' style={{fontSize:28 + 'px', color:'red'}}>
                        favorite
                    </span>                         
                    ) 
                    }
                </button>
                <button className={styles.bookmark__button}>
                    <span className='material-symbols-outlined' style={{fontSize:28 + 'px'}}>
                        down
                    </span>   
                </button>        
            </div>
        </div>
        <div className={styles.container__dialog__body}>
            <img src={data.urls.small} alt={data.alternative_slugs.ko}  className={styles.image} />
        </div>
        <div className={styles.container__dialog__footer}>
            <div className={styles.infoBox}>
                <div className={styles.infoBox_item}>
                    <span className={styles.infoBox_item__label}>이미지 크기</span>
                    <span className={styles.infoBox_item__value}>{data.alternative_slugs.ko} X {data.height} </span>
                </div>
                <div className={styles.infoBox_item}>
                    <span className={styles.infoBox_item__label}>업로드</span>
                    <span className={styles.infoBox_item__value}>{data.created_at.split('T')[0]}</span>
                </div>
                <div className={styles.infoBox_item}>
                    <span className={styles.infoBox_item__label}>마지막 업데이트</span>
                    <span className={styles.infoBox_item__value}>{data.updated_at.split('T')[0]}</span>
                </div>
                <div className={styles.infoBox_item}>
                    <span className={styles.infoBox_item__label}>다운로드</span>
                    <span className={styles.infoBox_item__value}>{data.likes}</span>
                </div>
            </div>
            <div className={styles.tagBox}>
                {  data.tags &&  data.tags.map((tag : Tag)=>{
                    return <div className={styles.tagBox__tag} key={tag.title}>{tag.title}</div>
                }) }                
            </div>
        </div>
      </div>
    </div>
  )
}
