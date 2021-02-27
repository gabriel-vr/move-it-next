import ExpirienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import CompChallenges from '../components/ComplettedChallenges';
import Countdown from '../components/Countdown'
import ChallengeBox from '../components/ChallengeBox';
import CountdownContextProvider from '../contexts/countdown';


import styles from '../styles/pages/index.module.css';

import {GetServerSideProps} from 'next';
import ChallengesContext, { ChallengesProvider } from '../contexts/challenges';
import LevelUpScreen from '../components/LevelUpScreen';
import { useContext } from 'react';


interface HomeProps {
  level: number;
  currentXp: number;
  completedChallenges: number;
}

export default function Home(props: HomeProps) {
  const ChallengesData = useContext(ChallengesContext);
  return (

    <ChallengesProvider
      level={props.level}
      currentXp={props.currentXp}
      completedChallenges={props.completedChallenges}
    >
      <div className={styles.container} >
        <ExpirienceBar />
        
        <CountdownContextProvider>
          <section>
            <div>
              <Profile />
              <CompChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownContextProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps : GetServerSideProps = async (context)=>{
    const {Level, CurrentXp, CompletedChallenges} = context.req.cookies;
    console.log("level", Level, "cxp", CurrentXp, "compchal", CompletedChallenges);
    return{
      props: {
        level: Number(Level),
        currentXp: Number(CurrentXp),
        completedChallenges: Number(CompletedChallenges)
      }
    }
}
