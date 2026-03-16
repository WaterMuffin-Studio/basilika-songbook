import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface FollowingsContextType {
    followings: string[];
    addSongToFollowings: (songId: string) => void;
    removeSongFromFollowings: (songId: string) => void;
}

const FollowingsContext = createContext<FollowingsContextType | undefined>(undefined);

export const FollowingsProvider = ({ children }: { children: ReactNode }) => {
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
            setFollowings(prev => [...prev, songId]);
        }
    };

    const removeSongFromFollowings = (songId: string) => {
        setFollowings(prev => prev.filter(id => id !== songId));
    };

    return (
        <FollowingsContext.Provider value={{ 
            followings, 
            addSongToFollowings, 
            removeSongFromFollowings 
        }}>
            {children}
        </FollowingsContext.Provider>
    );
};

export const useFollowings = () => {
    const context = useContext(FollowingsContext);
    if (!context) {
        throw new Error('useFollowings must be used within FollowingsProvider');
    }
    return context;
};