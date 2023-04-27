import styles from './styles.module.css';

export default function HoverToSeeName({name}) {

    return(
        <div className={styles.nameOfTheIconCont}>
            <div className={styles.nameOfTheIconContArrow}></div>
            <p className={styles.nameOfTheIcon}>{name}</p>
        </div>
    )
}