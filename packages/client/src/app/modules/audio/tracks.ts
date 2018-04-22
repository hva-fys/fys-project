export interface ITracks {
  id: number;
  name: string;
  trackSrc: string;
}

export const tracks: ITracks[] = [
  {
    id: 1,
    name: 'Track 1',
    trackSrc: './assets/track/',
  },
  {
    id: 2,
    name: 'Track 2',
    trackSrc: './assets/track/',
  }
];
