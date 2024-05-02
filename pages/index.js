import styles from '../styles/Home.module.css'
import Head from 'next/head';
import HomeComponent from '../src/components/HomeComponent';
import HomeNotLoggedIn from '../src/components/HomeNotLoggedIn';
import { useSelector } from 'react-redux';
import LoadingComponent from '../src/components/LoadingComponent';

export default function Home() {

  const {isLoggedIn} = useSelector(store => store.loggedIn);

  return (
    <div className={styles.container}>
      {/* <Head>
        <body className={styles.theBody}/>
      </Head> */}
      {/* {isLoggedIn ?
        <HomeComponent />
        : */}
        <HomeNotLoggedIn />
      {/* } */}
      {/* <LoadingComponent /> */}
    </div>
  )
}
