import { useEffect } from 'react';
import { useSettings } from '../hooks/useSettings';

export const AutoSettings = () => {
    useEffect(() => {
        const { settings } = useSettings();
        document.documentElement.style.setProperty('--user-song-fs', `${settings.textSize}rem`);

    }, []);
    return null;
};
