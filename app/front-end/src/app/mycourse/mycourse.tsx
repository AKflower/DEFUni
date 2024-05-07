"use client"
import React from 'react';
import styles from './mycourse.module.scss';
import Header from '../components/header/header'
import CourseItem from '../components/courseItem/courseItem'
import { useState } from 'react'


export default function Course() {
    const tabs = [
        {
            tab: 0,
            tabName: 'Operating Systems'
        },
        {
          tab: 1,
          tabName: 'Data Science'
        },
        {
          tab: 2,
          tabName: 'Cloud Computing'
        },
        {
          tab: 3,
          tabName: 'Natural Language Processing'
        },
        {
          tab: 4,
          tabName: 'Computer Vision'
        }

    ]   
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
                         <div className={tab=== item.tab ? styles.tabAction : styles.tab} key={item.tab} onClick={() => handleChangeTab(item.tab)}>
                             {item.tabName}
                         </div>
                    ))}
                </div>
                <div className={styles.toolBar}></div>
            </div>     
            <div className={styles.content}>
                {tab === 0 && 
                  <div className={styles.container}>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <h1 className={styles.title}>Đề cương môn học </h1>
                  </a>
                  </div>
               }
                {tab === 1 && 
                  <div className={styles.container}>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <h1 className={styles.title}>Đề cương môn học </h1>
                  </a>
                  </div>
               }
               {tab === 2 && 
                  <div className={styles.container}>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <h1 className={styles.title}>Đề cương môn học </h1>
                  </a>
                  </div>
               }
               {tab === 3 && 
                  <div className={styles.container}>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <h1 className={styles.title}>Đề cương môn học </h1>
                  </a>
                  </div>
               }
               {tab === 4 && 
                  <div className={styles.container}>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <h1 className={styles.title}>Đề cương môn học </h1>
                  </a>
                  </div>
               }
            </div>
        </div>
    )    
}
