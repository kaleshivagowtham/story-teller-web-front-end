import styles from './styles.module.css';

export default function LoadingComponent() {

    return (
        <div className={styles.wholeCont}>
            <img src='/logo.png' className={styles.loadingCont} />
        </div>
    )
}