import styles from "./courseDetails.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar({userType, courseId, courseName} : {userType: 'student' | 'teacher', courseId : string, courseName: string}) {
  
  
  return (
      <div className={styles.sidebar}>
        <div className={styles.courseInfo}>
          {courseName + " " + courseId}
        </div>
        <div className={styles.menu}>
          <button className={styles.menuItem}>Môn học</button>
          <button className={styles.menuItem}>Điểm số</button>
          <button className={styles.menuItem}>Thành viên lớp</button>
        </div>
        <div className={styles.general}>
          <div className={styles.generalHeader}>Tài liệu</div>
          <div className={styles.generalContent}>
            {userType === 'teacher' && <div className={styles.contentItem}>
              <FontAwesomeIcon icon={faPlus}/>
            </div>}
          </div>
          <div className={styles.generalHeader}>Kiểm tra</div>
          {userType === 'teacher' && <div className={styles.contentItem}>
              <FontAwesomeIcon icon={faPlus}/>
            </div>}
        </div>
      </div>
    );
  }