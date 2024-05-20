import styles from './courseItem.module.scss'
import Button from '../button/button'

export default function CourseItem({id, name, description, date, quantity, isRegistered=false, lecture, schedule} : {id: string, name: string, description: string, date: string, quantity: string, isRegistered?: boolean, lecture: string, schedule: string}){
    const currentDate = new Date();
    const registrationDeadline = new Date(date);
    const isRegistrationClosed = currentDate > registrationDeadline;
    
    return (
        <div className={styles.container}>
            <div className={styles.courseContainer}>
                <div className={styles.courseInfo}>
                    <div className={styles.title}>Mã môn học: {id}</div>
                    <div className={styles.title}>Tên môn học: {name}</div>
                    <div className={styles.description}>
                        {description}
                    </div>
                    <div className={styles.regisInfo}>
                        <div className={styles.date}>Hạn đăng ký: {date}</div>
                        <div className={styles.limit}>Số lượng: {quantity}</div>
                        <div className={styles.date}>Lịch học: {schedule}</div>
                    </div>
                </div>
                <div className={styles.lectureInfo}>
                    <div className={styles.avatar}></div>
                    <div className={styles.name}>{lecture}</div>
                </div>
            </div>
            {!isRegistrationClosed && <Button buttonName={isRegistered ? 'Hủy' : 'Đăng ký'} buttonColor={isRegistered ? '#D24040' : undefined}/>}
        </div>
        
    )
}