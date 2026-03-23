import './SongPage.css'
import { SongView } from '../../components/SongView/SongView/SongView';
import { songs } from '../../data/songs';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useFollowings } from '../../context/FollowingsContext';
import { useSettings } from '../../hooks/useSettings';
import { HiArrowLeft } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { HiHeart } from "react-icons/hi";
import { useState } from 'react';
import { HiCog } from "react-icons/hi";
import { HiOutlineMinusCircle } from "react-icons/hi";
import { HiOutlinePlusCircle } from "react-icons/hi";


export const SongPage = () => {
    const { id } = useParams<{ id: string }>();
    const song = songs.find(s => s.id === id) || songs[0];
    const {
        followings,
        addSongToFollowings,
        removeSongFromFollowings,
    } = useFollowings();
    const [isFollowed, setIsFollowed] = useState<boolean>(followings.includes(song.id))
    const [chordsTransponeStep, setChordsTransponeStep] = useState<number>(0);
    const [userFontSizeStep, setUserFontSizeStep] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isUserChangedTon, setIsUserChangedTon] = useState<boolean>(false);
    const { settings, setTextSize } = useSettings();
    const navigate = useNavigate();
    setTimeout(() => {
        setUserFontSizeStep(+(settings.textSize - 1.35).toFixed(1));
        // if (userFontSizeStep !== 0) {
        //     setIsUserChangedTon(true);
        // }
        setIsLoading(false);
    }, 0);

    const changeFollowingStatus = () => {
        if (isFollowed) {
            removeSongFromFollowings(song.id);
        }
        else if (!isFollowed) {
            addSongToFollowings(song.id);
        }

        setIsFollowed(!isFollowed);
    };

    const changeChordsStep = (n: number) => {
        let newStep = (chordsTransponeStep + n) % 12;
        setChordsTransponeStep(newStep);
        if (!isUserChangedTon) setIsUserChangedTon(!isUserChangedTon);
    }

    const changeFontSize = (n: number) => {
        let newStep = +((userFontSizeStep + n) * 10 % 20 / 10).toFixed(1);
        setUserFontSizeStep(newStep);
        setTextSize(1.35 + newStep);

        if (!isUserChangedTon) setIsUserChangedTon(!isUserChangedTon);
    }

    return (<>
        <header className="songpage-header">
            <HiArrowLeft className="songpage-back-button" onClick={() => navigate(`/main`)} />
            <h2 className="songpage-song-name">{song.title}</h2>
            <div className="songpage-right-buttons-group">
                <HiOutlineHeart onClick={() => changeFollowingStatus()} className={`songpage-heart-button ${isFollowed ? 'no' : ''}`} ></HiOutlineHeart>
                <HiHeart onClick={() => changeFollowingStatus()} className={`songpage-heart-button ${!isFollowed ? 'no' : ''}`} ></HiHeart>
                <HiCog className="songpage-cog" onClick={() => navigate(`/settings`)} />
            </div>
        </header>

        {
            !isLoading &&
            <div className="songpage-content">
                {
                    settings.guitarMode ?

                        <div className="transposition-control">
                            <HiOutlineMinusCircle className="transposition-button" onClick={() => { changeChordsStep(-1) }} />
                            <p className="transposition-title"><span className={`${isUserChangedTon ? "no" : ""}`}>Тон: </span><span className="transposition-value">{chordsTransponeStep > 0 ? "+" : ""}{chordsTransponeStep}</span></p>
                            <HiOutlinePlusCircle className="transposition-button" onClick={() => { changeChordsStep(1) }} />
                        </div>
                        :
                        <div className="font-change-control">
                            <HiOutlineMinusCircle className="font-change-button" onClick={() => { changeFontSize(-0.1) }} />
                            <p className="font-change-title"><span className={`${isUserChangedTon ? "no" : ""}`}>Шрифт: </span><span className="font-change-value">{userFontSizeStep > 0 ? "+" : ""}{userFontSizeStep}</span></p>
                            <HiOutlinePlusCircle className="font-change-button" onClick={() => { changeFontSize(0.1) }} />
                        </div>
                }
                <SongView showChords={settings.guitarMode} lyrics={song.lyrics} transponeStep={chordsTransponeStep}></SongView>
            </div>
        }
    </>);
}