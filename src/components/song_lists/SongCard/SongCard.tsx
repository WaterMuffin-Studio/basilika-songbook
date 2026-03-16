import { useState } from 'react';
import './SongCard.css'
import { useFollowings } from '../../../context/FollowingsContext';
import { useNavigate } from 'react-router-dom';
import folIcon from '../../../assets/images/fol.png'
import nofolIcon from '../../../assets/images/nofol.png'


interface SongCardProps {
    id: string,
    name: string,
    cats: string[],
    isFollowed: boolean
}

export const SongCard = ({id, name, cats, isFollowed = false}: SongCardProps) => {
    const navigate = useNavigate();
    const [isSongFollowed, setIsSongFollowed] = useState<boolean>(isFollowed);
    const { 
        addSongToFollowings,
        removeSongFromFollowings,
     } = useFollowings();

    const changeFollowingStatus = () => {
        if (isSongFollowed) {
            removeSongFromFollowings(id);
        }
        else if (!isSongFollowed) {
            addSongToFollowings(id);
        }

        setIsSongFollowed(!isSongFollowed);
    };
    
    return(<>
        <div className={`song-box ${isSongFollowed ? 'f' : ''}`}>
            <div onClick={() => navigate(`/song/${id}`)} className="song-box_text-box">
                <h2 className="song-name">{name}</h2>
                <p className="song-cats">{cats.join(', ')}</p>
            </div>
            <div className="song-box_button-box">
                <img src={isSongFollowed ? folIcon : nofolIcon} onClick={() => changeFollowingStatus()} className={`song-following-button`} draggable="false" />
            </div>
        </div>
    </>);
}
