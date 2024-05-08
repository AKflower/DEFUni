"use client"

import styles from './course.module.scss'
import Header from '../components/header/header'
import CourseItem from '../components/courseItem/courseItem'
import { CourseDto } from '../../../../back-end/src/course/dto/course.dto';

import { useEffect, useState } from 'react';

export default function Course() {
    const [courses, setCourses] = useState<any[]>([]);
    const [accessToken, setAccessToken] = useState<string | null>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            console.log(token);
            setAccessToken(token);

            fetch('http://localhost:3333/course/all-courses', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token,
                },
            })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw new Error("Not found courses.");
                }
            })
            .then(data => {
                setCourses(data);
            })
            .catch(error => {
                console.error("Error:" + error);
            });
        }
    }, []);

    const tabs = [
        {
            tab: 0,
            tabName: 'Môn đang mở'
        },
        {
            tab: 1,
            tabName: 'Môn đã đăng ký'
        }
    ];

    const [tab, setTab] = useState(0);

    const handleChangeTab = (tabClick: number) => {
        if (tab === tabClick) {
            return;
        }
        setTab(tabClick);
    };

    let unregisteredCourses: any[] = [];
    let registeredCourses: any[] = [];

    for (const c of courses) {
        if (c.registered) registeredCourses.push(c);
        else unregisteredCourses.push(c);
    }

    return (
        <div className={styles.container}>
            <div className={styles.headBar}>
                <div className={styles.tabBar}>
                    {tabs.map((item) => (
                        <div className={tab === item.tab ? styles.tabAction : styles.tab} key={item.tab} onClick={() => handleChangeTab(item.tab)}>{item.tabName}</div>
                    ))}
                </div>
                <div className={styles.toolBar}></div>
            </div>
            <div className={styles.courseContainer}>
                {tab === 0 ?
                    unregisteredCourses.map((course) => (
                        <CourseItem id={course.id} name={course.name} description={course.description} date={course.enroll_date} schedule={course.schedule} quantity={course.quantity} lecture={course.teacher} />)) :
                    registeredCourses.map((course) =>
                        (<CourseItem id={course.id} name={course.name} description={course.description} date={course.enroll_date} schedule={course.schedule} quantity={course.quantity} isRegistered={course.registered} lecture={course.teacher} />))}
            </div>
        </div>
    )
}
