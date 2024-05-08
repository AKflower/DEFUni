"use client"

import styles from './header.module.scss'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header(){
    const pathName = usePathname();
    let isLogin;
    if (pathName==="/") isLogin=true;
    else isLogin=false;
    console.log(pathName)
    return (
        <>
        {!isLogin && 
            <div className={styles.container}>
            <div className={styles.logo}>DEF University</div>
            <div className={styles.leftContainer}>
                <div className={styles.nav}>    
                    <Link style={{height:'100%'}} href={'/home'}><div className={pathName=== '/home' ? styles.tabAction: styles.tab}>Home</div></Link>
                    <Link style={{height:'100%'}} href={'/course'}><div className={pathName=== '/course' ? styles.tabAction: styles.tab}>Course</div></Link>
                    <Link style={{height:'100%'}} href={'/info'}><div className={pathName=== '/info' ? styles.tabAction: styles.tab}>Profile</div></Link>
                    <Link style={{height:'100%'}} href={'/mycourse'}><div className={pathName=== '/mycoure' ? styles.tabAction: styles.tab}>My course</div></Link>
                </div>
                <div className={styles.profile}>
                    <div className={styles.avatar}>
                    </div>
                    <div className={styles.name}>Nguyễn Văn A</div>
                </div>
            </div>
        </div>
        }
        </>
    )
}
