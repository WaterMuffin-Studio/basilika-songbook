import './MainPage.css'
import { useState } from 'react';
import { songs } from '../../data/songs';
import { useNavigate } from 'react-router-dom';
import { useFollowings } from '../../context/FollowingsContext';
import { SongCard } from '../../components/song_lists/SongCard/SongCard';
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
        "ТЭЗЕ": "taize",
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
                    <input className="search" type="search" autoComplete="off" placeholder="Поиск..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                    <HiOutlineSearch className={`magnifier ${searchValue.length > 0 ? 'n' : ''}`} />
                </div>
            </div>

            <div className="cat-list">
                <p onClick={() => setSelectedCat('all')} className={`cat c-all ${selectedCat == 'all' ? 'selected-cat' : ''}`}>Все</p>
                <p onClick={() => setSelectedCat('taize')} className={`cat c-taize ${selectedCat == 'taize' ? 'selected-cat' : ''}`}>ТЭЗЕ</p>
                <p onClick={() => setSelectedCat('default')} className={`cat c-default ${selectedCat == 'default' ? 'selected-cat' : ''}`}>Рядовые</p>
                <p onClick={() => setSelectedCat('christmas')} className={`cat c-christmas ${selectedCat == 'christmas' ? 'selected-cat' : ''}`}>Рождественские</p>
                <p onClick={() => setSelectedCat('fast')} className={`cat c-fast ${selectedCat == 'fast' ? 'selected-cat' : ''}`}>Великопостные</p>
                <p onClick={() => setSelectedCat('easter')} className={`cat c-easter ${selectedCat == 'easter' ? 'selected-cat' : ''}`}>Пасхальные</p>
            </div>
        </header>

        <div className="content">
            {
                onlyFollowings ? 
                songs.map((item, index) => {
                    if (followings.includes(item.id)) {
                        if (selectedCat == 'all') {
                            return(
                                <SongCard key={index} id={item.id} name={item.title} cats={item.category} isFollowed={followings.includes(item.id)} ></SongCard>
                            );
                        }
                        else {
                            if (enCategory(item.category).includes(selectedCat)) {
                                return(
                                    <SongCard key={index} id={item.id} name={item.title} cats={item.category} isFollowed={followings.includes(item.id)} ></SongCard>
                                );
                            }
                        }
                    }
                })
                : songs.map((item, index) => {
                    if (selectedCat == 'all') {
                        return(
                            <SongCard key={index} id={item.id} name={item.title} cats={item.category} isFollowed={followings.includes(item.id)} ></SongCard>
                        );
                    }
                    else {
                        if (enCategory(item.category).includes(selectedCat)) {
                            return(
                                <SongCard key={index} id={item.id} name={item.title} cats={item.category} isFollowed={followings.includes(item.id)} ></SongCard>
                            );
                        }
                    }
                })

            }
            
            {
                (onlyFollowings && followings.length == 0) ?
                <p className="no-followings-message">У вас нет избранных песен</p>
                : true
            }
        </div>

    </>);
}