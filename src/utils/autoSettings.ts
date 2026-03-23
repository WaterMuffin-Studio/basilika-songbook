import { type UserSettings } from "../types/settings";

const DEFAULT_SETTINGS: UserSettings = {
    guitarMode: false,

    textSize: 1.35,
    textColor: "#141b21",
    bgColor: "#fffef4",

    fontStyle: "font1",
    chordsStyle: "eu",
    chordsColor: "#c54623",
    showChordsFingerings: true,
    showStrummingHint: true,
    showAudioHint: true,
}

export const loadTheme = () => {
    let parsed: UserSettings = DEFAULT_SETTINGS;

    try {
        const saved = localStorage.getItem('user-settings');
        if (saved) {
            parsed = JSON.parse(saved);
        }
    } catch (error) {
        console.error('Ошибка с настройками : ', error);
    }
    
    document.documentElement.style.setProperty('--user-song-fs', `${parsed.textSize}rem`);
    document.documentElement.style.setProperty("--user-chords", `${parsed.chordsColor}`);
    document.documentElement.style.setProperty("--user-text", `${parsed.textColor}`);
    document.documentElement.style.setProperty("--user-bg", `${parsed.bgColor}`);

};