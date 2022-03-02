import {useHistory} from 'react-router-dom'
import style from './GoBackBtn.module.scss'

const GoBackBtn = () => {

  const history = useHistory()

  const handleGoBack = () => {
    history.push('/')
  }

  return <button className={style.backBtn} onClick={handleGoBack}>Back</button>

}

export default GoBackBtn