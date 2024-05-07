import styles from './coursePart.module.scss'
import CourseElement from '../courseElement/courseElement'

export default function CoursePart() {
    return (
        <div className={styles.container}>
            <div className={styles.title}>General</div>
            <CourseElement />
            <CourseElement />
            <CourseElement />
            <CourseElement />
        </div>
    )
}