import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { MatchInfoType } from '../types/matchInfo';
import type { SummonerInfoType } from '../types/summonerInfo';
import styled from 'styled-components';
import axios from 'axios';
//import components
import UserRank from './components/UserRank';
import UserGraph from './components/UserGraph';
import UserStatInfo from './components/UserStatInfo';
import MatchCard from './components/MatchCard';
import UserId from './components/UserId';
import PreferChampion from './components/PreferChampion';
import LoadingPage from './components/LoadingPage';
import ErrorPage from './components/ErrorPage';
import { userInfoFormat } from './userInfo';

const UserInfoContainer = styled.div`
  width: 100%;
  @media screen and (max-width: 360px) {
    width: 328px;
  }
`;
const Loader = styled.div`
  color: white;
  text-align: center;
  font-size: 14px;
  margin-top: 4px;
`;

export const UserInfo = () => {
  const [gamesData, setGamesData] = useState<MatchInfoType[]>([]);
  const [summonerInfo, setSummonerInfo] = useState<SummonerInfoType>({
    prefer_position: {
      '-': 0,
    },
    champions: [
      {
        championName: '',
        counts: 0,
        win_rate: 0,
        kda: 0,
      },
      {
        championName: '',
        counts: 0,
        win_rate: 0,
        kda: 0,
      },
      {
        championName: '',
        counts: 0,
        win_rate: 0,
        kda: 0,
      },
    ],
  } as SummonerInfoType); /*저번 회의때 얘기했던 부분이 여기 초기화를 해두고 champions를 앞에서부터 한개씩 갈아끼우는 느낌으로*/
  console.log(summonerInfo);
  const [pageNum, setPageNum] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [httpStatusCode, setHttpStatusCode] = useState<number>(200);
  const params = new URLSearchParams(window.location.search);
  const id = params.get('ID');
  useEffect(() => {
    getUserData();
    getMatchData();
  }, []);
  const getUserData = async () => {
    setIsLoading(true);
    try {
      const value = await axios.get(
        `${process.env.REACT_APP_GG_API_ROOT}/riot/user/${id}`,
      );
      if (value.status === 200) {
        setSummonerInfo(userInfoFormat(value.data));
        console.log(value.data);
      }
      if (value.data) setIsLoading(false);
    } catch (e: any) {
      setHttpStatusCode(e.response.status);
    }
  };
  const getMatchData = async () => {
    try {
      const match = await axios.get(
        `${process.env.REACT_APP_GG_API_ROOT}/riot/user/match_list/${id}?page=${pageNum}`,
      );
      const fetchedGames: MatchInfoType[] = [...gamesData, ...match.data];
      setGamesData(fetchedGames);
      setPageNum(pageNum + 1);
    } catch (e) {
      console.log(e);
    }
  };
  if (httpStatusCode === 404) return <ErrorPage />;
  return (
    <UserInfoContainer>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <UserId
            profileIcon={summonerInfo.profileIconId}
            userName={summonerInfo.name}
            level={summonerInfo.level}
          />
          <UserRank
            userName={summonerInfo.name}
            soloRank={summonerInfo.soloRank}
            flexRank={summonerInfo.flexRank}
          />
          <UserStatInfo
            userName={summonerInfo.name}
            win_rate={summonerInfo.soloRank?.win_rate}
            win={summonerInfo.soloRank?.win}
            losses={summonerInfo.soloRank?.losses}
            kda_avg={summonerInfo.kda_avg}
            kills_avg={summonerInfo.kills_avg}
            deaths_avg={summonerInfo.deaths_avg}
            assists_avg={summonerInfo.assists_avg}
            prefer_position={summonerInfo.prefer_position}
            // position_rate={summonerInfo.position_rate}
          />
          <UserGraph userName={summonerInfo.name} />
          <PreferChampion champions={summonerInfo.champions} />
          <InfiniteScroll
            next={getMatchData}
            dataLength={gamesData.length}
            hasMore={true}
            loader={<Loader>데이터 불러오는 중...</Loader>}
          >
            {gamesData.map((game: MatchInfoType, index) => {
              return <MatchCard matchInfo={game} key={index}></MatchCard>;
            })}
          </InfiniteScroll>
        </>
      )}
    </UserInfoContainer>
  );
};
