export interface ITracks {
  id: number;
  name: string;
  trackSrc: string;
}

export const tracks: ITracks[] = [
  {
    id: 1,
    name: 'Never gonna give you up',
    trackSrc: './assets/tracks/never_gunna_give_you_up.mp3',
  },
  {
    id: 2,
    name: 'Track 2',
    trackSrc: './assets/track/',
  }
];
