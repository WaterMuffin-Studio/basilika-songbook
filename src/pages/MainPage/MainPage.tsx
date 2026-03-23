import './MainPage.css'
import { useState, useMemo } from 'react';
import { songs } from '../../data/songs';
import { useNavigate } from 'react-router-dom';
import { useFollowings } from '../../context/FollowingsContext';
import { SongCard } from '../../components/SongCard/SongCard';
import { HiHome } from "react-icons/hi";
import { HiStar } from "react-icons/hi";
import { HiOutlineSearch } from "react-icons/hi";


interface Props {
    onlyFollowings: boolean
}

export const MainPage = ({ onlyFollowings }: Props) => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedCat, setSelectedCat] = useState('all');
    const { followings } = useFollowings();
    const navigate = useNavigate();

    const categoryDict: Record<string, string> = {
        "Рядовые": "default",
        "Taize": "taize",
        "Великопостные": "fast",
        "Пасхальные": "easter",
        "Рождественские": "christmas",
    };

    const enCategory = (cats: string[]) => {
        const enCats: string[] = [];
        cats.map((item) => {
            enCats.push(categoryDict[item])
        });
        return enCats;
    }

    const filteredSongs = useMemo(() => {
        let result = onlyFollowings
            ? songs.filter(song => followings.includes(song.id))
            : [...songs];

        if (selectedCat !== 'all') {
            result = result.filter(song =>
                enCategory(song.category).includes(selectedCat)
            );
        }

        if (searchValue.trim() !== '') {
            const query = searchValue.toLowerCase().trim();
            result = result.filter(song =>
                song.title.toLowerCase().includes(query) ||
                song.category.some(cat => cat.toLowerCase().includes(query)) ||
                song.lyrics.toLowerCase().includes(query)
            );
        }

        return result;
    }, [songs, followings, onlyFollowings, selectedCat, searchValue]);

    return (<>
        <header className="header">
            <div className="search-menu">
                {
                    onlyFollowings ?
                        <HiHome className="follow-home-button" onClick={() => navigate(`/main`)} />
                        :
                        <HiStar className="follow-home-button" onClick={() => navigate(`/follow`)} />
                }
                <div className="search-box">
                    <input
                        className="search"
                        type="search"
                        autoComplete="off"
                        placeholder="Поиск..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                (e.target as HTMLInputElement).blur();
                            }
                        }} />
                    <HiOutlineSearch className={`magnifier ${searchValue.length > 0 ? 'n' : ''}`} />
                </div>
            </div>

            <div className="cat-list">
                <p onClick={() => setSelectedCat('all')} className={`cat c-all ${selectedCat == 'all' ? 'selected-cat' : ''}`}>Все</p>
                <p onClick={() => setSelectedCat('taize')} className={`cat c-taize ${selectedCat == 'taize' ? 'selected-cat' : ''}`}>Taize</p>
                <p onClick={() => setSelectedCat('default')} className={`cat c-default ${selectedCat == 'default' ? 'selected-cat' : ''}`}>Рядовые</p>
                <p onClick={() => setSelectedCat('christmas')} className={`cat c-christmas ${selectedCat == 'christmas' ? 'selected-cat' : ''}`}>Рождественские</p>
                <p onClick={() => setSelectedCat('fast')} className={`cat c-fast ${selectedCat == 'fast' ? 'selected-cat' : ''}`}>Великопостные</p>
                <p onClick={() => setSelectedCat('easter')} className={`cat c-easter ${selectedCat == 'easter' ? 'selected-cat' : ''}`}>Пасхальные</p>
            </div>
        </header>

        <div className="content">
            {
                onlyFollowings ?
                    filteredSongs.map((item) => {
                        return (
                            <SongCard key={`${item.id}`} id={item.id} name={item.title} cats={item.category} isFollowed={true} ></SongCard>
                        );
                    })
                    :
                    filteredSongs.map((item) => {
                        return (
                            <SongCard key={`${item.id}`} id={item.id} name={item.title} cats={item.category} isFollowed={followings.includes(item.id)} ></SongCard>
                        );
                    })
            }

            {
                (onlyFollowings && followings.length == 0 && searchValue === '') ?
                    <p className="no-followings-message">У вас нет избранных песен</p>
                    : filteredSongs.length === 0 && searchValue !== '' ?
                        <p className="no-results">Ничего не найдено</p>
                        : null
            }
        </div>

    </>);
}