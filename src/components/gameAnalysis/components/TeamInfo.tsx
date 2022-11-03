import {
  TeamInfoContainer,
  TeamInfoWrapper,
  TeamInfoHeader,
  TeamName,
  Team,
  UserInfoColumnWrapper,
  UserInfoColumn,
  SummonerList,
} from '../styles/teamInfo.s';
import { useState } from 'react';
import Summoner, { summonerProps } from './Summoner';

const summonerRed: summonerProps[] = [
  {
    champion: 'Sona',
    championSpell1: 'SummonerHeal',
    championSpell2: 'SummonerFlash',
    perks: 8008,
    perkStyles: 8100,
    items: ['3133', '6694', '3089', '3047', '3086', '3087', '3340'],
    kills: 6,
    deaths: 3,
    assists: 4,
  },
  {
    champion: 'Jax',
    championSpell1: 'SummonerDot',
    championSpell2: 'SummonerFlash',
    perks: 8008,
    perkStyles: 8100,
    items: ['3033', '3032', '3036', '3035', '3038', '3040', '3340'],
    kills: 6,
    deaths: 3,
    assists: 4,
  },
  {
    champion: `Katarina`,
    championSpell1: 'SummonerSmite',
    championSpell2: 'SummonerFlash',
    perks: 8008,
    perkStyles: 8100,
    items: ['3133', '6694', '3089', '3047', '3086', '3087', '3340'],
    kills: 6,
    deaths: 3,
    assists: 4,
  },
  {
    champion: 'Blitzcrank',
    championSpell1: 'SummonerBoost',
    championSpell2: 'SummonerFlash',
    perks: 8008,
    perkStyles: 8100,
    items: ['3033', '3032', '3036', '3035', '3038', '3040', '3340'],
    kills: 6,
    deaths: 3,
    assists: 4,
  },
  {
    champion: 'Brand',
    championSpell1: 'SummonerExhaust',
    championSpell2: 'SummonerFlash',
    perks: 8008,
    perkStyles: 8100,
    items: ['3133', '6694', '3089', '3047', '3086', '3087', '3340'],
    kills: 6,
    deaths: 3,
    assists: 4,
  },
];

const summonerBlue: summonerProps[] = [
  {
    champion: 'Aphelios',
    championSpell1: 'SummonerTeleport',
    championSpell2: 'SummonerFlash',
    perks: 8008,
    perkStyles: 8100,
    items: ['3033', '3032', '3036', '3035', '3038', '3040', '3340'],
    kills: 6,
    deaths: 3,
    assists: 4,
  },
  {
    champion: 'Rumble',
    championSpell1: 'SummonerHeal',
    championSpell2: 'SummonerFlash',
    perks: 8008,
    perkStyles: 8100,
    items: ['3133', '6694', '3089', '3047', '3086', '3087', '3340'],
    kills: 6,
    deaths: 3,
    assists: 4,
  },
  {
    champion: 'Lux',
    championSpell1: 'SummonerDot',
    championSpell2: 'SummonerFlash',
    perks: 8008,
    perkStyles: 8100,
    items: ['3033', '3032', '3036', '3035', '3038', '3040', '3340'],
    kills: 6,
    deaths: 3,
    assists: 4,
  },
  {
    champion: 'Draven',
    championSpell1: 'SummonerHeal',
    championSpell2: 'SummonerFlash',
    perks: 8008,
    perkStyles: 8100,
    items: ['3133', '6694', '3089', '3047', '3086', '3087', '3340'],
    kills: 6,
    deaths: 3,
    assists: 4,
  },
  {
    champion: 'Nasus',
    championSpell1: 'SummonerHeal',
    championSpell2: 'SummonerFlash',
    perks: 8008,
    perkStyles: 8100,
    items: ['3033', '3032', '3036', '3035', '3038', '3040', '3340'],
    kills: 6,
    deaths: 3,
    assists: 4,
  },
];

const TeamInfo = () => {
  const [redteams, setRedteams] = useState<summonerProps[]>([...summonerRed]);
  const [blueteams, setBlueteams] = useState<summonerProps[]>([
    ...summonerBlue,
  ]);
  return (
    <TeamInfoContainer>
      <TeamInfoWrapper>
        <TeamInfoHeader>
          <TeamName team={Team.RED}>RED TEAM</TeamName>
          <UserInfoColumnWrapper>
            <UserInfoColumn>SUMMONER</UserInfoColumn>
            <UserInfoColumn>ITEMS</UserInfoColumn>
          </UserInfoColumnWrapper>
        </TeamInfoHeader>
        <SummonerList>
          {redteams.map((redteam: summonerProps, index) => {
            return <Summoner teamInfo={redteam} key={index} />;
          })}
        </SummonerList>
      </TeamInfoWrapper>
      <TeamInfoWrapper>
        <TeamInfoHeader>
          <TeamName team={Team.BLUE}>BLUE TEAM</TeamName>
          <UserInfoColumnWrapper>
            <UserInfoColumn>SUMMONER</UserInfoColumn>
            <UserInfoColumn>ITEMS</UserInfoColumn>
          </UserInfoColumnWrapper>
        </TeamInfoHeader>
        <SummonerList>
          {blueteams.map((blueteam: summonerProps, index) => {
            return <Summoner teamInfo={blueteam} key={index} />;
          })}
        </SummonerList>
      </TeamInfoWrapper>
    </TeamInfoContainer>
  );
};

export default TeamInfo;