import styles from './input.module.scss'

export default function Input({label, placeholder, isForgot=false}: {label: string,placeholder: string, isForgot?: boolean}) {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <label className={styles.label}>{label}</label>
                {isForgot && <div className={styles.forgot}>Forgot?</div>}
            </div>
            <input type="text" placeholder={placeholder} className={styles.input}/>
        </div>
        
    )
}