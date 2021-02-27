import { createContext, ReactNode, useEffect, useState } from 'react';

import challenges from '../challenges.json';

import Cookies from 'js-cookie';
import LevelUpScreen from '../components/LevelUpScreen';

interface Challenges{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentXp: number;
    completedChallenges: number;
}

interface ChallengesContextValues {
    level: number;
    currentxp: number;
    completedchallenges: number;
    actualChallenge: Challenges;
    xpToNextLevel: number;
    levelUpscreen: boolean;
    SelectChallenge: ()=>void;
    resetChall: ()=>void;
    actualizeXp: ()=>void;
    incrementChallsCompleted:()=>void;
    closeLevelUpScreen: ()=>void;   
}

const ChallengesContext = createContext({} as ChallengesContextValues);

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps){
    const [levelUpscreen, setLevelUpScreen] = useState(false);
    const [actualChallenge, setactualChallenge] = useState(null);
    const [currentxp, setCurrentxp] = useState(rest.currentXp ?? 0);
    const [level, setLevel] = useState(rest.level ?? 1);
    const [completedchallenges, setCompletedchallenges] = useState(rest.completedChallenges  ?? 0);
    let xpToNextLevel = Math.pow((level+1) * 4,2);

    function SelectChallenge(){
        const challIndex = Math.floor(Math.random()*challenges.length);
        const challenge = challenges[challIndex];
        setactualChallenge(challenge);
    }

    function resetChall(){
        setactualChallenge(null);
    }

    function actualizeXp(){
        if(!actualChallenge) return;

        const plusXp = actualChallenge.amount;
        let newXp = currentxp + plusXp;
        if(newXp >= xpToNextLevel){
            newXp = newXp - xpToNextLevel;
            setLevel(level + 1);
            setLevelUpScreen(true);
        }
        setCurrentxp(newXp);
    }

    function closeLevelUpScreen(){
        setLevelUpScreen(false);
    }

    function incrementChallsCompleted(){
        setCompletedchallenges(completedchallenges + 1);
    }

    useEffect(()=>{
        Notification.requestPermission();
    }, [])

    useEffect(()=>{
        Cookies.set('Level', String(level), {expires: 7});
        Cookies.set('CurrentXp', String(currentxp), {expires: 7});
        Cookies.set('CompletedChallenges', String(completedchallenges), {expires: 7});
    },[level, currentxp, completedchallenges]);
    
    useEffect(()=>{
        if(actualChallenge && Notification.permission ==='granted'){
            new Audio('/notification.mp3').play();
            new Notification('Novo Desafio',{
                body: `Valendo ${actualChallenge.amount} de xp`
            });
        }
    },[actualChallenge])
    return(
    <ChallengesContext.Provider 
    value={{
        level,
        currentxp,
        completedchallenges,
        actualChallenge,
        xpToNextLevel,
        levelUpscreen,
        SelectChallenge,
        resetChall, 
        actualizeXp,
        incrementChallsCompleted,
        closeLevelUpScreen
    }}>
        {levelUpscreen && <LevelUpScreen />}    
        {children}
    </ChallengesContext.Provider>

    )
}

export default ChallengesContext;
