"use client"

import styles from './course.module.scss'
import Header from '../components/header/header'
import CourseItem from '../components/courseItem/courseItem'
import { useState } from 'react'

export default function Course() {
    const tabs = [
        {
            tab: 0,
            tabName: 'Môn đang mở'
        },
        {
            tab: 1,
            tabName: 'Môn đã đăng ký'
        }

    ]
    const courses = [
        {
            id: 0,
            name: 'Data structure and algorithm',
            description: 'Data Structures and Algorithms (DSA) là một môn học cơ bản và quan trọng trong lĩnh vực Khoa học Máy tính và Công nghệ Thông tin. Môn học này tập trung vào việc nghiên cứu và áp dụng các cấu trúc dữ liệu và thuật toán để giải quyết các vấn đề tính toán hiệu quả. Cấu trúc dữ liệu là cách tổ chức và lưu trữ dữ liệu một cách có tổ chức, trong khi thuật toán là các bước cụ thể để thực hiện một nhiệm vụ cụ thể.',
            date: '12/04/2024',
            quantity: '14/30',
            isRegister: false,
        },
        {
            id: 1,
            name: 'Artificial Intelligence',
            description: 'Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning (the acquisition of information and rules for using the information), reasoning (using rules to reach approximate or definite conclusions), and self-correction.',
            date: '10/05/2024',
            quantity: '20/25',
            isRegister: false,
        },
        {
            id: 2,
            name: 'Machine Learning',
            description: 'Machine learning (ML) is the study of computer algorithms that improve automatically through experience. It is seen as a subset of artificial intelligence. Machine learning algorithms build a mathematical model based on sample data, known as "training data", in order to make predictions or decisions without being explicitly programmed to perform the task.',
            date: '15/05/2024',
            quantity: '18/30',
            isRegister: false,
        },
        // Thêm 8 môn học khác ở đây...
        {
            id: 3,
            name: 'Computer Networks',
            description: 'Computer Networks is a field of computer science that allows computers to exchange data or information. The connections between nodes are established using either cable media or wireless media. The best-known computer network is the Internet.',
            date: '20/05/2024',
            quantity: '15/20',
            isRegister: false,
        },
        {
            id: 4,
            name: 'Database Management Systems',
            description: 'Database Management Systems (DBMS) are software applications that interact with the user, other applications, and the database itself to capture and analyze data. A general-purpose DBMS is designed to allow the definition, creation, querying, update, and administration of databases.',
            date: '25/05/2024',
            quantity: '22/25',
            isRegister: false,
        },
        {
            id: 5,
            name: 'Web Development',
            description: 'Web Development encompasses all activities involved in developing a website for the Internet or an intranet. This includes web design, web content development, client-side/server-side scripting, and network security configuration, among other tasks.',
            date: '30/05/2024',
            quantity: '20/30',
            isRegister: false,
        },
        {
            id: 6,
            name: 'Cybersecurity',
            description: 'Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These attacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes.',
            date: '05/06/2024',
            quantity: '15/20',
            isRegister: false,
        },
        {
            id: 7,
            name: 'Software Engineering',
            description: 'Software Engineering is the application of engineering principles to the design, development, maintenance, testing, and evaluation of software and systems that make computers or anything containing software work.',
            date: '10/06/2024',
            quantity: '25/30',
            isRegister: false,
        },
        {
            id: 8,
            name: 'Computer Graphics',
            description: 'Computer Graphics is the field of visual computing, where one utilizes computers to create and manipulate visual content. This can include 2D and 3D graphics, animation, modeling, and rendering.',
            date: '15/06/2024',
            quantity: '18/25',
            isRegister: false,
        },
        {
            id: 9,
            name: 'Mobile Application Development',
            description: 'Mobile Application Development is the process of creating software applications that run on mobile devices, such as smartphones and tablets. These applications can be pre-installed on phones during manufacturing platforms, or delivered as web applications using server-side or client-side processing (e.g., JavaScript) to provide an "application-like" experience within a Web browser.',
            date: '20/06/2024',
            quantity: '22/30',
            isRegister: false,
        },
    ];
    const coursesRegistered = [
        {
            id: 0,
            name: 'Operating Systems',
            description: 'Operating Systems (OS) are software that acts as an intermediary between computer hardware and the end-user. It provides a user interface and manages resources such as memory, processors, devices, and file systems.',
            date: '25/06/2024',
            quantity: '20/25',
            isRegister: true,
        },
        {
            id: 1,
            name: 'Data Science',
            description: 'Data Science is an interdisciplinary field that uses scientific methods, algorithms, processes, and systems to extract knowledge and insights from structured and unstructured data. It encompasses data analysis, machine learning, statistics, and big data.',
            date: '30/06/2024',
            quantity: '15/20',
            isRegister: true,
        },
        {
            id: 2,
            name: 'Cloud Computing',
            description: 'Cloud Computing is the delivery of computing services—including servers, storage, databases, networking, software, and analytics—over the Internet (“the cloud”) to offer faster innovation, flexible resources, and economies of scale.',
            date: '05/07/2024',
            quantity: '18/25',
            isRegister: true,
        },
        {
            id: 3,
            name: 'Natural Language Processing',
            description: 'Natural Language Processing (NLP) is a subfield of linguistics, computer science, and artificial intelligence concerned with the interactions between computers and human language. It focuses on enabling computers to understand, interpret, and generate human language in a valuable way.',
            date: '10/07/2024',
            quantity: '22/30',
            isRegister: true,
        },
        {
            id: 4,
            name: 'Computer Vision',
            description: 'Computer Vision is an interdisciplinary field that deals with how computers can be made to gain high-level understanding from digital images or videos. From the perspective of engineering, it seeks to automate tasks that the human visual system can do.',
            date: '15/07/2024',
            quantity: '20/25',
            isRegister: true,
        },
    ];
    
    const [tab,setTab] = useState(0);
    const handleChangeTab = (tabClick: number) => {
        if (tab===tabClick) {
            return
        }
        setTab(tabClick);
    }
    return(
        <div className={styles.container}>
            <div className={styles.headBar}>
                <div className={styles.tabBar}>
                    {tabs.map((item) => (
                         <div className={tab=== item.tab ? styles.tabAction : styles.tab} key={item.tab} onClick={() => handleChangeTab(item.tab)}>{item.tabName}</div>
                    ))}
                </div>
                <div className={styles.toolBar}></div>
            </div>
            <div className={styles.courseContainer}>
               { tab===0 ? 
               courses.map((course) => (
               <CourseItem name={course.name} description={course.description} date={course.date} quantity={course.quantity} lecture='Ths. Lê Đình Thuận'/>)): coursesRegistered.map((course) => 
               (<CourseItem name={course.name} description={course.description} date={course.date} quantity={course.quantity} isRegistered={course.isRegister} lecture='Ts. Nguyễn Đức Dũng'/>)) }
            </div>
        </div>
    )    
}