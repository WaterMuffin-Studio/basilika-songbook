import './EnteringPage.css'
import { useState } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { useNavigate } from 'react-router-dom';
import { IoText } from "react-icons/io5";
import { IoMusicalNotesSharp } from "react-icons/io5";

export const EnteringPage = () => {
    const navigate = useNavigate();
    const [guitarMode, setGuitarMode] = useState<boolean>(false);
    const { tooggleGuitarMode } = useSettings();

    const switchGuitarModeTo = (gm: boolean) => {
        if (gm == guitarMode) return;
        setGuitarMode(gm);
    };

    const selectModeAndContinue = () => {
        localStorage.setItem('user-exist', 'exist');
        tooggleGuitarMode(guitarMode);
        setTimeout(() => {
            navigate('/main');
        }, 0);
    }

    return (<>
        <h1 className="title">Добро пожаловать!</h1>
        <p className="subtitle">Пожалуйста, выберите версию песенника</p>

        <div className="buttons-box">
            <div onClick={ () => switchGuitarModeTo(true) } className="buttons-box_button">
                <IoMusicalNotesSharp className="buttons-box_button-image"/>
                <p className={`buttons-box_button-title ${guitarMode ? "selected" : ""}`}>С аккордами</p>
                <div className="indicator"></div>
            </div>

            <div onClick={ () => switchGuitarModeTo(false) } className="buttons-box_button">
                <IoText className="buttons-box_button-image"/>
                <p className={`buttons-box_button-title ${!guitarMode ? "selected" : ""}`}>Только текст</p>
                <div className="indicator"></div>
            </div>
        </div>

        <div className="continue-box">
            <button className="continue-button" onClick={() => selectModeAndContinue()}>Продолжить</button>
        </div>
        
    </>);
}