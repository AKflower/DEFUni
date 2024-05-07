import styles from './mycourse.module.scss'
import CoursePart from '@/app/components/coursePart/coursePart'

export default function MyCourse(){
    return (
        <div className={styles.container}>
            <div className={styles.title}>Date structure and algorithm(CO2003)_TA(CQ_HK232)[L02, L04]</div>
            <div className={styles.tab}></div>
            <CoursePart />
        </div>
        
    )
}