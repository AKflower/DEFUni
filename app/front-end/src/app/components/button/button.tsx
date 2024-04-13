import styles from './button.module.scss'

export default function Button({buttonName, buttonColor='#1570EF'} : {buttonName: string, buttonColor?: string}) {
    return (
        <div className={styles.container}>
            <button className={styles.button} style={{backgroundColor:buttonColor}}>{buttonName}</button>
        </div>
    )
}