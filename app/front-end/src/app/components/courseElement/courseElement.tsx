import styles from './courseElement.module.scss'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function CourseElement() {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <PictureAsPdfIcon />
            </div>
            <div className={styles.content}>Đề cương khóa học</div>
        </div>
    )
}