export interface UserSettings {
    guitarMode: boolean,

    textSize: number,
    textColor: string,
    bgColor: string,
    
    fontStyle: string, // font1 || font2 || font3
    chordsStyle: "en" | "eu", // en || eu
    chordsColor: string,
    showChordsFingerings: boolean,
    showStrummingHint: boolean,
    showAudioHint: boolean,
}