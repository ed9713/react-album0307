import { CardDTO } from '../types/card';
import styles from './Card.module.scss'


 // 12시 39분 테스트 -  vs 코드 - ed9713

 // 12:34 분 테스트 -  edstyle7 - 이클립스   - 브랜치 feat_1125_1511
 
interface Props {
  data : CardDTO;
  handleDialog: (eventValue:boolean) => void;
  handleSetData: (eventValue : CardDTO) =>void;
}

export default function Card( {data , handleDialog, handleSetData} : Props ) {

    const openDialog = function(){
        console.log('함수호출');
        handleDialog(true);
        handleSetData(data);
    };

  return (
    <div className={styles.card} onClick={openDialog}>
      <img src={data.urls.small} alt={data.alt_description} className={styles.card__image}/>
    </div>
  )
  
}
