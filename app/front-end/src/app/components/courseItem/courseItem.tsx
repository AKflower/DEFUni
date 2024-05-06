import styles from './courseItem.module.scss'
import Button from '../button/button'

export default function CourseItem({name,description,date,quantity,isRegistered=false,lecture} : {name: string, description: string, date: string, quantity: string, isRegistered?: boolean, lecture: string}){
    return (
        <div className={styles.container}>
            <div className={styles.courseContainer}>
                <div className={styles.courseInfo}>
                    <div className={styles.title}>{name}</div>
                    <div className={styles.description}>
                        {description}
                    </div>
                    <div className={styles.regisInfo}>
                        <div className={styles.date}>Hạn đăng ký: {date}</div>
                        <div className={styles.limit}>Số lượng: {quantity}</div>
                    </div>
                </div>
                <div className={styles.lectureInfo}>
                    <div className={styles.avatar}></div>
                    <div className={styles.name}>{lecture}</div>
                </div>
            </div>
           {!isRegistered ? <Button buttonName='Đăng ký'/> : <Button buttonName='Hủy' buttonColor='#D24040'/>}
        </div>
        
    )
}