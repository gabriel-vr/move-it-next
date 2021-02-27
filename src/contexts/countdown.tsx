import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import ChallengesContext from "./challenges";

interface CountdownProps{
    children : ReactNode;
}

interface CountdownProvidervalues{
    time: number;
    isActive: boolean;
    hasFinished: boolean;
    handleCountdown: ()=>void;
    resetCountdown: ()=>void;
    handleFinishCountdown: ()=>void;
}

export const CountdownContext = createContext({} as CountdownProvidervalues);

let countdownTimeout: NodeJS.Timeout;

export default function CountdownContextProvider(props: CountdownProps){
    const ChallengesContextData = useContext(ChallengesContext);
    const[time, setTime] = useState(25*60);
    const[isActive, setisActive] = useState(false);
    const[hasFinished, sethasFinished] = useState(false);
    
    function handleCountdown(){
        setisActive(true);
    }
    
    function resetCountdown(){
        setTime(25*60);
        setisActive(false);
        sethasFinished(false);
    }

    function handleFinishCountdown(){
        clearTimeout(countdownTimeout);
        resetCountdown();
    }

    

    useEffect( ()=> {
        if(isActive && time > 0){
            countdownTimeout =  setTimeout(()=>{
                setTime(time - 1);
            },1000)
        }
        else if (isActive && time === 0){
            ChallengesContextData.SelectChallenge();
            sethasFinished(true);
            setisActive(false);
        }

    },[isActive, time]);
    return(
        <CountdownContext.Provider 
        value={{
            time,
            isActive,
            hasFinished,
            handleCountdown,
            resetCountdown,
            handleFinishCountdown
        }}>
            {props.children}
        </CountdownContext.Provider>
    );    
}