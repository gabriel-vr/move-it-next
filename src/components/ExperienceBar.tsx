import { useContext } from 'react';
import ChallengesContext from '../contexts/challenges';
import styles from '../styles/components/ExperienceBar.module.css'

export default function ExpirienceBar(){
    const dataContext = useContext(ChallengesContext);

    const percentage = Math.round((dataContext.currentxp * 100) / dataContext.xpToNextLevel);
    console.log("percentage:", percentage);
    return (
        <div className={styles.ExpBar}>
            <span>0 exp</span>
            <div className={styles.bar}>
                <div className={styles.exp} style={{width: `${percentage}%`}} />

                <span style={{left: `${percentage}%`}}>{dataContext.currentxp}px</span>
            </div>
            <span>{dataContext.xpToNextLevel} epx</span>
        </div>
    );
}