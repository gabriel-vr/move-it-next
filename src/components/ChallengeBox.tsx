import { useContext, useState } from 'react';
import ChallengesContext from '../contexts/challenges';
import { CountdownContext } from '../contexts/countdown';
import styles from '../styles/components/ChallengeBox.module.css'

export default function ChallengeBox(){
    const ChallengesContextdata = useContext(ChallengesContext);
    const CountdownContextdata = useContext(CountdownContext);

    function handleSuccess(){
        ChallengesContextdata.actualizeXp();
        ChallengesContextdata.incrementChallsCompleted();
        CountdownContextdata.resetCountdown();
        ChallengesContextdata.resetChall();
    }
    function handleFail(){
        CountdownContextdata.resetCountdown();
        ChallengesContextdata.resetChall();
    }

    return(
        <div className = {styles.ChallengeBoxContainer}>
            {
                ChallengesContextdata.actualChallenge ?
                (
                    <div className={styles.Challenge}>
                        <header>
                            <strong>
                                Ganhe {ChallengesContextdata.actualChallenge.amount} XP
                            </strong>
                        </header>

                        <main>
                            <img src={`icons/${ChallengesContextdata.actualChallenge.type}.svg`} alt="exercicio"/>
                            <strong>Exercite-se</strong>
                            <p>{ChallengesContextdata.actualChallenge.description}</p>
                        </main>

                        <footer>
                            <button
                                type="button"
                                onClick={handleFail}
                            >
                                Falhei
                            </button>
                            <button
                            type="button"
                            onClick={handleSuccess}
                            >
                                Completei
                            </button>
                        </footer>
                    </div>
                )
                :
                (
                    <div className={styles.startCicle}>
                        <strong> Inicie um ciclo para receber desafios a serem completados</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level Up"/>
                            Complete-os e ganhe experiência e avance de leve.
                        </p>
                    </div>
                )
            }
        </div> 
    );
}