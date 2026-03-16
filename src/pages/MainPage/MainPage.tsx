import './MainPage.css'
import { useState } from 'react';
import { songs } from '../../data/songs';
import { useFollowings } from '../../context/FollowingsContext';
import { SongCard } from '../../components/song_lists/SongCard/SongCard';

interface Props {
    onlyFollowings: boolean
}

export const MainPage = ({ onlyFollowings }: Props) => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedCat, setSelectedCat] = useState('all');
    const { followings } = useFollowings();

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
                <img className="burger" draggable="false" src="src/assets/images/burger.png" alt="menu" />
                <div className="search-box">
                    <input className="search" type="search" autoComplete="off" placeholder="Поиск..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                    <img draggable="false" className={`magnifier ${searchValue.length > 0 ? 'n' : ''}`} src="src/assets/images/magnifier.png" alt="search" />
                </div>
            </div>

            <div className="cat-list">
                <p onClick={() => setSelectedCat('all')} className={`cat c-all ${selectedCat == 'all' ? 'selected-cat' : ''}`}>Все</p>
                <p onClick={() => setSelectedCat('default')} className={`cat c-default ${selectedCat == 'default' ? 'selected-cat' : ''}`}>Рядовые</p>
                <p onClick={() => setSelectedCat('taize')} className={`cat c-taize ${selectedCat == 'taize' ? 'selected-cat' : ''}`}>ТЭЗЕ</p>
                <p onClick={() => setSelectedCat('fast')} className={`cat c-fast ${selectedCat == 'fast' ? 'selected-cat' : ''}`}>Великопостные</p>
                <p onClick={() => setSelectedCat('easter')} className={`cat c-easter ${selectedCat == 'easter' ? 'selected-cat' : ''}`}>Пасхальные</p>
                <p onClick={() => setSelectedCat('christmas')} className={`cat c-christmas ${selectedCat == 'christmas' ? 'selected-cat' : ''}`}>Рождественские</p>
            </div>
        </header>

        <div className="content">

            {onlyFollowings}

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
            {/* <SongCard id='default-1' name='1. Иисус - Высшее Имя' cats={['Рядовые']} isFollowed={false} ></SongCard>
            <SongCard id='default-2' name='2. Только один есть Бог' cats={['Рядовые']} isFollowed={false} ></SongCard>
            <SongCard id='default-3' name='3. Он - Всевышний' cats={['Рядовые']} isFollowed={false} ></SongCard>
            <SongCard id='default-4' name='4. В моей  жизни' cats={['Рядовые']} isFollowed={false} ></SongCard>
            <SongCard id='default-5' name='5. Иисус, Ты Царь царей' cats={['Рядовые']} isFollowed={false} ></SongCard>
            <SongCard id='default-6' name='6. Все придите, песню споём' cats={['Рядовые', 'Пасхальные']} isFollowed={false} ></SongCard>
            <SongCard id='default-7' name='7. Богу поём Аллилуйя' cats={['Рядовые']} isFollowed={false} ></SongCard>
            <SongCard id='default-8' name='8. Иисус, Ты моя жизнь' cats={['Рядовые']} isFollowed={false} ></SongCard>
            <SongCard id='default-9' name='9. Святое имя Иисус' cats={['Рядовые']} isFollowed={false} ></SongCard>
            <SongCard id='default-10' name='10. Иисус, Ты выходишь на берег' cats={['Рядовые']} isFollowed={false} ></SongCard>
            <SongCard id='default-11' name='11. Слава Тебе Отче' cats={['Рядовые']} isFollowed={false} ></SongCard>
            <SongCard id='default-12' name='12. Господу Богу песню пойте' cats={['Рядовые']} isFollowed={false} ></SongCard>
            <SongCard id='default-13' name='13. Сердце Господу поёт' cats={['Рядовые']} isFollowed={false} ></SongCard>
            <SongCard id='default-14' name='14. Пусть сойдет Дух Твой' cats={['Рядовые']} isFollowed={false} ></SongCard>
            <SongCard id='default-15' name='15. Святое имя Господа славлю' cats={['Рядовые']} isFollowed={false} ></SongCard>
            <SongCard id='default-16' name='16. Широко благодати Твоей течёт река' cats={['Рядовые']} isFollowed={false} ></SongCard>
            <SongCard id='default-17' name='17. Дух Святой, принеси огонь' cats={['Рядовые']} isFollowed={false} ></SongCard>
            <SongCard id='default-18' name='18. В Духе соединившись' cats={['Рядовые']} isFollowed={false} ></SongCard>
            <SongCard id='default-19' name='19. Прихожу к Тебе я' cats={['Рядовые']} isFollowed={false} ></SongCard>
            <SongCard id='default-20' name='20. Молись о Мириям' cats={['Рядовые']} isFollowed={false} ></SongCard> */}
        </div>

    </>);
}