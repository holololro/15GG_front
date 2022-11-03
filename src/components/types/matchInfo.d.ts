export interface MatchInfoType {
  status: gameState;
  match_id: string;
  game_duration: number;
  win: boolean;
  created_at: string;
  queue_mode: queue_mode;
  champion_name: string;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  cs: number;
  cs_per_min: number;
  vision_wards_bought_in_game: number;
  items: string[];
  spells: {
    spell1: string;
    spell2: string;
  };
  perks: {
    perk: number;
    perkStyle: number;
  };
}
export enum gameState {
  live = 'live',
  end = 'complete',
  none = 'incomplete',
}
export enum queue_mode {
  solo = '5v5 Ranked Solo games',
  blind = '5v5 Blind Pick games',
  aram = '5v5 ARAM games',
  flex = '5v5 Ranked Flex games',
  urf = 'Pick URF games',
}
