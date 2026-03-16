export interface Song {
    id: number;
    title: string;
    lyrics: LyricLine[];
}

export interface LyricLine {
    text: string;
    chords: ChordPosition[];
}

export interface ChordPosition {
    chord: string;
    position: number;
}