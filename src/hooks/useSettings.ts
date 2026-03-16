import { useState, useEffect } from 'react';
import type { UserSettings } from '../types/settings';

const DEFAULT_SETTINGS: UserSettings = {
    guitarMode: false,

    textSize: 16,
    textColor: "#121212ff",
    bgColor: "#fffdf5ff",

    fontStyle: "font1",
    chordsStyle: "en",
    chordsColor: "#a40606ff",
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
    };

    const setTextColor = (color: string) => {
        setSettings(prev => ({...prev, textColor: color}));
    };

    const setBgColor = (color: string) => {
        setSettings(prev => ({...prev, bgColor: color}));
    };

    const setChordsColor = (color: string) => {
        setSettings(prev => ({...prev, chordsColor: color}));
    };

    const setChordsStyle = (id: string) => {
        setSettings(prev => ({...prev, chordsStyle: id}));
    };

    const setFontStyle = (id: string) => {
        setSettings(prev => ({...prev, fontStyle: id}));
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
        setFontStyle
    };
}