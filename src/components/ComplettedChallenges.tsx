import { useContext } from 'react';
import ChallengesContext from '../contexts/challenges';
import styles from '../styles/components/ComplettedChallenges.module.css'

export default function CompChallenges(){
    const dataContext = useContext(ChallengesContext);
    return(
        <div className={styles.CompChallsContainer}>
            <span> Desafios Completados</span>
            <span>{dataContext.completedchallenges}</span>
        </div>
    );
}