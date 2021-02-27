import { useContext } from 'react';
import ChallengesContext from '../contexts/challenges';
import styles from '../styles/components/Profile.module.css';



export default function Profile(){
    const dataContext = useContext(ChallengesContext);
    return (
        <div className = {styles.ProfileContainer}>
            <img src="https://github.com/gabriel-vr.png" alt="Foto do Gabriel"/>
            <div>
                <strong>Gabriel Vicente Rodrigues</strong>
                <div>
                    <img src="icons/level.svg" alt="seta"/>
                    <p>Level {dataContext.level}</p>
                </div>
            </div>
        </div>
    );
}