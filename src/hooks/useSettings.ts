import { useState, useEffect } from 'react';
import type { UserSettings } from '../types/settings';

const DEFAULT_SETTINGS: UserSettings = {
    guitarMode: false,

    textSize: 1.35,
    textColor: "#121212",
    bgColor: "#fffdf5",

    fontStyle: "font1",
    chordsStyle: "eu",
    chordsColor: "#c54623",
    showChordsFingerings: true,
    showStrummingHint: true,
    showAudioHint: true,
}

export const useSettings = () => {
    const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadSettings = () => {
            try {
                const saved = localStorage.getItem('user-settings');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    setSettings(prev => ({...prev, ...parsed}));
                }
            } catch (error) {
                console.error('Ошибка с настройками : ', error);
            } finally {
                setIsLoading(false)
            }
        };        

        loadSettings();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('user-settings', JSON.stringify(settings));
        }
    }, [settings, isLoading]);


    const tooggleGuitarMode = (mode: boolean) => {
        setSettings(prev => ({...prev, guitarMode: mode}));
    };

    const tooggleChordsFingerings = (mode: boolean) => {
        setSettings(prev => ({...prev, showChordsFingerings: mode}));
    };
    
    const tooggleStrummingHint = (mode: boolean) => {
        setSettings(prev => ({...prev, showStrummingHint: mode}));
    };

    const tooggleAudioHint = (mode: boolean) => {
        setSettings(prev => ({...prev, showAudioHint: mode}));
    };

    const setTextSize = (size: number) => {
        setSettings(prev => ({...prev, textSize: size}));
        document.documentElement.style.setProperty('--user-song-fs', `${size}rem`);
    };

    const setTextColor = (color: string) => {
        setSettings(prev => ({...prev, textColor: color}));
        document.documentElement.style.setProperty("--user-text", `${color}`);
    };

    const setBgColor = (color: string) => {
        setSettings(prev => ({...prev, bgColor: color}));
        document.documentElement.style.setProperty("--user-bg", `${color}`);
    };

    const setChordsColor = (color: string) => {
        setSettings(prev => ({...prev, chordsColor: color}));
        console.log("color", color)
        document.documentElement.style.setProperty("--user-chords", color);
    };

    const setChordsStyle = (style: "en" | "eu") => {
        setSettings(prev => ({...prev, chordsStyle: style}));
    };

    const setFontStyle = (id: string) => {
        setSettings(prev => ({...prev, fontStyle: id}));
    };

    const resetSettings = () => {
        setSettings(DEFAULT_SETTINGS);
    };

    return {
        settings,
        isLoading,
        tooggleGuitarMode,
        tooggleChordsFingerings,
        tooggleStrummingHint,
        tooggleAudioHint,
        setTextSize,
        setTextColor,
        setBgColor,
        setChordsColor,
        setChordsStyle,
        setFontStyle,
        resetSettings
    };
}