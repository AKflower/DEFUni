import styles from './input.module.scss'

export default function Input({label, placeholder, value, onChange, isForgot = false}: { label: string, placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, isForgot?: boolean }) {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <label className={styles.label}>{label}</label>
                {isForgot && <div className={styles.forgot}>Forgot?</div>}
            </div>
            <input type="text" placeholder={placeholder} value={value} onChange={onChange} className={styles.input} />
        </div>
    );
}