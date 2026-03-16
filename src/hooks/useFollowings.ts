import { useState, useEffect } from 'react';

export const useFollowings = () => {
    const [followings, setFollowings] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem('user-followings');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('user-followings', JSON.stringify(followings));
    }, [followings]);

    const addSongToFollowings = (songId: string) => {
        if (!followings.includes(songId)) {
            setFollowings(prev => ([...prev, songId]));
        }
    };

    const removeSongFromFollowings = (songId: string) => {
        setFollowings(prev => (prev.filter(id => id !== songId)));
    };

    
    return {
        followings,
        addSongToFollowings,
        removeSongFromFollowings,
    };
}