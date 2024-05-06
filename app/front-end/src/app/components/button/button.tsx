import styles from './button.module.scss'

export default function Button({ buttonName, buttonColor = '#1570EF', type = "button" }: { buttonName: string, buttonColor?: string, type?: "button" | "submit" }) {
    return (
        <div className={styles.container}>
            <button className={styles.button} style={{ backgroundColor: buttonColor }} type={type}>{buttonName}</button>
        </div>
    );
}