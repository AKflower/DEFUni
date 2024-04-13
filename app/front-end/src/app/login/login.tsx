import styles from './login.module.scss'
import LoginForm from '../components/loginForm/loginForm'


export default function Login() {
    return (
        <div className={styles.container}>
            <div className={styles.image}></div>
            <div className={styles.loginForm}>
                <div className={styles.logo}>DEF University</div>
                < LoginForm />
            </div>
        </div>
    )
}