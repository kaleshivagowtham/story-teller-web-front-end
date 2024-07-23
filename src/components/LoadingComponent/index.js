import styles from './styles.module.css';

export default function LoadingComponent() {

    return (
        <div className={styles.loadingComponentCont}>
            <div className={styles.loader} />
        </div>
    )
}