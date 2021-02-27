import { useContext } from 'react';
import ChallengesContext from '../contexts/challenges';
import styles from '../styles/components/LevelUpScreen.module.css'

export default function LevelUpScreen(){
    const ChallengesData = useContext(ChallengesContext);
    return(
        <div className={styles.LevelUpContainer}>
            <div className={styles.LevelUpBox}>
                <strong> {ChallengesData.level}</strong>
                <span>Parabéns</span>
                <p>Você alcançou um novo level</p>
                <button
                    type="button"
                    onClick={ChallengesData.closeLevelUpScreen}
                >
                    <img src="/icons/close.svg" alt="close"/>
                </button>
            </div>
        </div>
    );
}