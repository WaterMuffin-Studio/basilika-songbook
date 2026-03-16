import songsData from './songs.json';

export interface Song {
    id: string;
    title: string;
    category: string[];
    lyrics: string;
}

export const songs: Song[] = songsData;