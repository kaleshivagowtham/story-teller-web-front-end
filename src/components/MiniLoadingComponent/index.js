import styles from './styles.module.css';

export default function MiniLoadingComponent() {


    return (
        <div className={styles.wholeCont}>
            <div className={`${styles.dot} ${styles.d1}`}/>
            <div className={`${styles.dot} ${styles.d2}`}/>
            <div className={`${styles.dot} ${styles.d3}`}/>
            <div className={`${styles.dot} ${styles.d4}`}/>
            <div className={`${styles.dot} ${styles.d5}`}/>
            <div className={`${styles.dot} ${styles.d6}`}/>
            <div className={`${styles.dot} ${styles.d7}`}/>
            <div className={`${styles.dot} ${styles.d8}`}/>
        </div>
    )
}