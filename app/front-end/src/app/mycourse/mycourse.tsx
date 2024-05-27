"use client"
import React from 'react';
import styles from './mycourse.module.scss';
import Header from '../components/header/header'
import CourseItem from '../components/courseItem/courseItem'
import { useState } from 'react'
import Head from 'next/head';


const Home = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('Course');

  const subjects = [
    { id: 'subject1', title: 'CO1007_L04', description: 'Cấu trúc Rời rạc cho Khoa học Máy tính ...' },
    { id: 'subject2', title: 'CO2017_L04', description: 'Hệ điều hành (CO2017)_NGUYỄN QUANG HÙNG ...' },
    { id: 'subject3', title: 'CO2018_L04', description: 'Hệ điều hành (TN) (CO2018)_NGUYỄN QUANG HÙNG ...' },
    { id: 'subject4', title: 'CO2039_L04', description: 'Lập trình Nâng cao (CO2039)_Mai Đức Trung ...' },
    { id: 'subject5', title: 'CO2003_L04', description: 'Cấu trúc dữ liệu và giải thuật(CO2003)_Mai Đức Trung ...' },
  ];

  const renderSubjectSelection = () => (
    <div className={styles.container}>
      <Head>
        <title>Tổng quan về khóa học</title>
        <meta name="description" content="Tổng quan về khóa học" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Tổng quan về khóa học</h1>

        <div className={styles.grid}>
          <div className={styles.card} onClick={() => setSelectedSubject('semester')}>
            <h2>Học kỳ (Semester) 2/2023-2024 &rarr;</h2>
          </div>

          {subjects.map((subject) => (
            <div key={subject.id} className={styles.card} onClick={() => setSelectedSubject(subject.id)}>
              <h2>{subject.title}</h2>
              <p>{subject.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );

  const renderCourseContent = () => {
    return (
      <div className={styles.container}>
        <h1 className={styles.subjectTitle}>Date structure and algorithm (CO2003)_TA(CQ_HK232) [L02, L04]</h1>
        <div className={styles.tabContainer}>
          <button className={`${styles.tab} ${activeTab === 'Course' ? styles.active : ''}`} onClick={() => setActiveTab('Course')}>Course</button>
          <button className={`${styles.tab} ${activeTab === 'Grades' ? styles.active : ''}`} onClick={() => setActiveTab('Grades')}>Grades</button>
        </div>
        {activeTab === 'Course' && renderCourseTab()}
        {activeTab === 'Grades' && renderGradesTab()}
      </div>
    );
  };

  const renderCourseTab = () => {
    return (
      <>
        <button className={styles.collapseAllButton} onClick={() => {
          const newSections = Object.fromEntries(Object.keys(sections).map(section => [section, false]));
          setSections(newSections);
        }}>
          Collapse all
        </button>
        <div className={styles.sections}>
          <div className={styles.section}>
            <button className={styles.sectionTitle} onClick={() => toggleSection('general')}>
              General
            </button>
            {sections.general && (
              <div className={styles.sectionContent}>
                <div className={styles.item}><span className={styles.icon}>📄</span> Đề cương môn học</div>
                <div className={styles.item}><span className={styles.icon}>📑</span> Slide bài giảng</div>
                <div className={styles.item}><span className={styles.icon}>📑</span> Slide bài giảng</div>
              </div>
            )}
          </div>
          <div className={styles.section}>
            <button className={styles.sectionTitle} onClick={() => toggleSection('onlineCourseLink')}>
              Online Course Link
            </button>
            {sections.onlineCourseLink && (
              <div className={styles.sectionContent}>
                <div className={styles.item}><span className={styles.icon}>🔗</span> Link học trực tuyến tuần 1</div>
              </div>
            )}
          </div>
          <div className={styles.section}>
            <button className={styles.sectionTitle} onClick={() => toggleSection('exercise')}>
              Exercise
            </button>
            {sections.exercise && (
              <div className={styles.sectionContent}>
                <div className={styles.item}><span className={styles.icon}>📝</span> Quiz 1</div>
              </div>
            )}
          </div>
          <div className={styles.section}>
            <button className={styles.sectionTitle} onClick={() => toggleSection('topic4')}>
              Topic 4
            </button>
            {sections.topic4 && (
              <div className={styles.sectionContent}>
                <div className={styles.item}><span className={styles.icon}>📚</span> Topic 4 content...</div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  const renderGradesTab = () => {
    return (
      <div className={styles.gradesContainer}>
        <div className={styles.profile}>
          <img src="/profile.jpg" alt="Profile" className={styles.profileImage} />
          <span className={styles.profileName}>Nguyễn Văn A </span>
        </div>
        <table className={styles.gradesTable}>
          <thead>
            <tr>
              <th>Grade item</th>
              <th>Calculated weight</th>
              <th>Range</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Quiz 1</td>
              <td>--</td>
              <td>9.00</td>
            </tr>
            <tr>
              <td>Course total</td>
              <td>--</td>
              <td>--</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const [sections, setSections] = useState({
    general: true,
    onlineCourseLink: true,
    exercise: true,
    topic4: true,
  });

  const toggleSection = (section) => {
    setSections({ ...sections, [section]: !sections[section] });
  };

  return (
    <>
      {selectedSubject ? renderCourseContent() : renderSubjectSelection()}
    </>
  );
};

export default Home;
