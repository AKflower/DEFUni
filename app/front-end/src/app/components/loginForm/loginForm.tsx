import styles from './loginForm.module.scss'
import Input from '../input/input'
import Button from '../button/button'
import fonts from '../../../../public/fonts/fonts'

export default function LoginForm() {
    return (
        <div className={styles.container+' '+fonts.poppins.className}>
            <h1 className={styles.header}>Login to your account</h1>
            <form action="" className={styles.form}>
                <Input label='Email' placeholder='Enter your email'/>
                <Input  label='Password' placeholder='Enter your password' isForgot={true} />
                <Button buttonName='Login now' />
            </form>
        </div>
    )
}