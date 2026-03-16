import './SongPage.css'
import { SongView } from '../../components/song_lyrics/SongView/SongView';
import { songs } from '../../data/songs';
import { useParams } from 'react-router-dom';
import { useSettings } from '../../hooks/useSettings';


export const SongPage = () => {
    const { id } = useParams<{ id: string }>();
    const song = songs.find(s => s.id === id) || songs[0];
    const { settings } = useSettings();

    return(<>
        <SongView showChords={settings.guitarMode} lyrics={song.lyrics}></SongView>
    </>);
}