import { useContext, useEffect, useState } from 'react';
import styles from '../styles/components/Countdown.module.css'
import { FaCheckCircle } from 'react-icons/fa';
import { CountdownContext } from '../contexts/countdown';


export default function Countdown (){
    const {
        time, 
        hasFinished, 
        handleFinishCountdown, 
        handleCountdown, 
        isActive} = useContext(CountdownContext);    


    let minuteLeft = Math.floor(Math.floor(time / 60) / 10);
    let minuteRight = Math.floor(time / 60)%10;
    let secLeft = Math.floor(Math.floor(time % 60) / 10);
    let secRight = (time % 60)%10;
    

    return (
        <div>
            <div className={styles.CountdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secLeft}</span>
                    <span>{secRight}</span>
                </div>
            </div>
            {
                hasFinished ?
                    (
                        <button
                            disabled
                            className = {styles.CountdownButton}
                        >
                            Ciclo Finalizado    
                            <FaCheckCircle className={styles.icon} size='1rem' color='green'/>
                        </button>
                    )
                    :
                    (
                        <>
                            {
                                isActive ? 
                                (
                                    <button 
                                    className= {` ${styles.CountdownButton} ${styles.finishCoutndown} `} 
                                    type="button" 
                                    onClick = {handleFinishCountdown}
                                    >
                                        Abandonar Ciclo
                                    </button>
                                ) :
                                (
                                    <button 
                                    className= {styles.CountdownButton} 
                                    type="button" 
                                    onClick = {handleCountdown}
                                    >
                                        Iniciar um ciclo
                                    </button>
                                )
                            }
                        </>
                    )
            }
        </div>
    );
}