import React from 'react';
import styles from "./AddCourseModal.module.scss";

export default function AddCourseModal({ isOpen, onClose, type, addCourse } : { isOpen: boolean, type: 'document' | 'examination', onClose: () => void, addCourse: () => void; } ) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {type === 'document'? <h2>Thêm tài liệu</h2> : <h2>Thêm khóa học</h2>}
        <form onSubmit={addCourse} className={styles.form}>
          <div className={styles.formGroup}>
          {type === 'document'? <label htmlFor="courseName">Tên tài liệu</label> : <label htmlFor="courseName">Tên bài kiểm tra</label>}
            <input type="text" id="courseName" name="courseName" />
          </div>
          <button type="submit">Thêm</button>
        </form>
        <button onClick={onClose} className={styles.closeButton}>Đóng</button>
      </div>
    </div>
  );
};
