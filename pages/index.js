import styles from '../styles/Home.module.css'
import HomeComponent from '../src/components/HomeComponent';
import HomeNotLoggedIn from '../src/components/HomeNotLoggedIn';
import { useSelector } from 'react-redux';

export default function Home() {

  const {isLoggedIn} = useSelector(store => store.loggedIn);

  return (
    <div className={styles.container}>
      {isLoggedIn ?
        <HomeComponent />
        :
        <HomeNotLoggedIn />
      }
    </div>
  )
}
