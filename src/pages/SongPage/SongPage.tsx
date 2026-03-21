import './SongPage.css'
import { SongView } from '../../components/song_lyrics/SongView/SongView';
import { songs } from '../../data/songs';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useFollowings } from '../../context/FollowingsContext';
import { useSettings } from '../../hooks/useSettings';
import { HiArrowLeft } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { HiHeart } from "react-icons/hi";
import { useState } from 'react';

export const SongPage = () => {
    const { id } = useParams<{ id: string }>();
    const song = songs.find(s => s.id === id) || songs[0];
    const {
        followings,
        addSongToFollowings,
        removeSongFromFollowings,
    } = useFollowings();
    const [isFollowed, setIsFollowed] = useState<boolean>(followings.includes(song.id))
    const { settings } = useSettings();
    const navigate = useNavigate();

    const changeFollowingStatus = () => {
        if (isFollowed) {
            removeSongFromFollowings(song.id);
        }
        else if (!isFollowed) {
            addSongToFollowings(song.id);
        }

        setIsFollowed(!isFollowed);
    };

    return (<>
        <header className="songpage-header">
            <HiArrowLeft className="songpage-back-button" onClick={() => navigate(`/main`)} />
            <h2 className="songpage-song-name">{song.title}</h2>
            <HiOutlineHeart onClick={() => changeFollowingStatus()} className={`songpage-heart-button ${isFollowed ? 'no' : ''}`} ></HiOutlineHeart>
            <HiHeart onClick={() => changeFollowingStatus()} className={`songpage-heart-button ${!isFollowed ? 'no' : ''}`} ></HiHeart>
        </header>

        <div className="songpage-content">
            <SongView showChords={settings.guitarMode} lyrics={song.lyrics}></SongView>
        </div>
    </>);
}