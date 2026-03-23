import { parseLine } from '../../../utils/parseChords';
import { useState } from 'react';
import { transpone } from '../../../utils/transponeChrods';
import { useSettings } from '../../../hooks/useSettings';
import './SongView.css';

interface Props {
    lyrics: string;
    showChords: boolean;
    transponeStep: number;
}

export const SongView = ({ lyrics, showChords, transponeStep }: Props) => {
    const { settings } = useSettings();
    const startChordsSystem = settings.chordsStyle;
    const [chordsSystem, setChordsSystem] = useState<"en" | "eu">("en");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const lines = lyrics.split('\n').filter(line => line.trim() !== '');
    setTimeout(() => {
        setChordsSystem(startChordsSystem);
        setIsLoading(false)
    }, 0);

    const renderTextWithBold = (text: string, boldRanges: { start: number; end: number }[]) => {
        if (boldRanges.length === 0) return text;

        let result = [];
        let lastIndex = 0;

        boldRanges.forEach((range, idx) => {
            if (range.start > lastIndex) {
                result.push(
                    <span key={`text-${idx}`}>
                        {text.slice(lastIndex, range.start)}
                    </span>
                );
            }
            
            result.push(
                <span key={`bold-${idx}`} className="bold-text">
                    <i>{text.slice(range.start, range.end)}</i>
                </span>
            );
            
            lastIndex = range.end;
        });

        if (lastIndex < text.length) {
            result.push(
                <span key="text-end">{text.slice(lastIndex)}</span>
            );
        }

        return result;
    };

    return (
        <div className="song-view">
            {lines.map((line, index) => {
                const { text, chords, boldRanges } = parseLine(line);

                return (
                    <div key={index} className={`song-line ${!showChords ? 'no-chords' : ''}`}>
                        {showChords && chords.length > 0 && (
                            <div className="chords-line">
                                {chords.map((chord, i) => (
                                    <span
                                        key={i}
                                        style={{ marginLeft: `${chord.pos}ch`, position: 'absolute' }}
                                    >
                                        { !isLoading && transpone(chord.name, transponeStep, chordsSystem)}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className={`text-line ${showChords ? "" : "wrappable"}`}>
                            {renderTextWithBold(text, boldRanges)}{!showChords && <span className="red">*</span>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};