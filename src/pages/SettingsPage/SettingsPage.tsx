import './SettingsPage.css'
import { useState } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { useNavigate, useNavigationType } from 'react-router-dom';
import { HiArrowLeft } from "react-icons/hi";
import { IoText } from "react-icons/io5";
import { IoMusicalNotesSharp } from "react-icons/io5";
import { ColorPicker } from '../../components/ColorPicker/ColorPicker';


export const SettingsPage = () => {
    const navigate = useNavigate();
    const navigationType = useNavigationType();
    const { settings, tooggleGuitarMode, resetSettings } = useSettings();
    const startGm = settings.guitarMode;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [guitarMode, setGuitarMode] = useState<boolean>(startGm);
    setTimeout(() => {
        setGuitarMode(startGm);
        setIsLoading(false);
    }, 0);

    const switchGuitarModeTo = (gm: boolean) => {
        if (gm == guitarMode) return;
        setGuitarMode(gm);
        setTimeout(() => {
            tooggleGuitarMode(gm);
        }, 0);
    };

    const goBack = () => {
        if (navigationType !== 'POP') {
            navigate(-1);
        } else {
            navigate('/main');
        }
    };

    const setSettings = () => {
        resetSettings();
        setTimeout(() => {
            location.reload();
        }, 0);
    }


    return (<>
        <header className="settings-header">
            <HiArrowLeft className="settings-back-button" onClick={() => goBack()} />
            <h2 className="settings-song-name">Настройки</h2>
            <div className="settings-back-button no"></div>
        </header>

        <div className="settings-content">
            <div className="settings-buttons-box">
                <div onClick={() => switchGuitarModeTo(true)} className="settings-buttons-box_button">
                    <IoMusicalNotesSharp className="settings-buttons-box_button-image" />
                    <p className={`settings-buttons-box_button-title ${guitarMode && !isLoading ? "settings-selected" : ""}`}>С аккордами</p>
                    <div className="settings-indicator"></div>
                </div>

                <div onClick={() => switchGuitarModeTo(false)} className="settings-buttons-box_button">
                    <IoText className="settings-buttons-box_button-image" />
                    <p className={`settings-buttons-box_button-title ${!guitarMode && !isLoading ? "settings-selected" : ""}`}>Только текст</p>
                    <div className="settings-indicator"></div>
                </div>
            </div>

            <div className="base-settings">
                <ColorPicker label="Цвет фона" colorVar="--user-bg"></ColorPicker>
                <ColorPicker label="Цвет текста" colorVar="--user-text"></ColorPicker>
                {guitarMode && <ColorPicker label="Цвет аккордов" colorVar="--user-chords"></ColorPicker>}
            </div>
        </div>

        <h2 onClick={() => setSettings()} className="set-settings-button">СБРОСИТЬ НАСТРОЙКИ</h2>
    </>);
}