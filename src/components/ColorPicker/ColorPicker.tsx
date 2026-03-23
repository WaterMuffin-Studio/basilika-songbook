import React, { useState } from 'react';
import './ColorPicker.css';
import { useSettings } from '../../hooks/useSettings';


interface ColorPickerProps {
    label: string;
    colorVar: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, colorVar }) => {
    const { settings, setChordsColor, setBgColor, setTextColor } = useSettings();
    const findStartColor = () => {
        if (colorVar == "--user-chords") {
            return settings.chordsColor;
        }
        else if (colorVar == "--user-bg") {
            return settings.bgColor;
        }
        else if (colorVar == "--user-text") {
            return settings.textColor;
        }
    };
    const startColor = findStartColor();

    // const [isLoading, setIsLoading] = useState<boolean>(true);
    const [color, setColor] = useState<string>(() => {
        if (colorVar == "--user-chords") {
            return "#c54623";
        }
        else if (colorVar == "--user-bg") {
            return "#ffffff";
        }
        else if (colorVar == "--user-text") {
            return "#141b21";
        }
        return "#141b21"
    });
    setTimeout(() => {
        if (startColor) {
            setColor(startColor);
        }
        else {
            if (colorVar == "--user-chords") {
                setColor("#c54623");
            }
            else if (colorVar == "--user-bg") {
                setColor("#ffffff");
            }
            else if (colorVar == "--user-text") {
                setColor("#141b21");
            }
        }
        // setIsLoading(false);
    }, 0);



    const handleColorChange = (newColor: string) => {
        setColor(newColor);
        document.documentElement.style.setProperty(colorVar, newColor);
        if (colorVar == "--user-chords") {
            setChordsColor(newColor);
        }
        else if (colorVar == "--user-bg") {
            setBgColor(newColor);
        }
        else if (colorVar == "--user-text") {
            setTextColor(newColor);
        }
    };

    // function validateColor(color: string): string {
    //     const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    //     const hslRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;

    //     if (hexRegex.test(color)) {
    //         return color;
    //     }

    //     const hslMatch = color.match(hslRegex);
    //     if (hslMatch) {
    //         const [_, h, s, l] = hslMatch.map(Number);
    //         if (h <= 360 && s <= 100 && l <= 100) {
    //             return color;
    //         }
    //     }

    //     if (colorVar == "--user-chords") {
    //         return "#c54623";
    //     }
    //     else if (colorVar == "--user-bg") {
    //         return "#ffffff";
    //     }
    //     else if (colorVar == "--user-text") {
    //         return "#141b21";
    //     }

    //     return "#141b21";
    // }

    return (
        <div className="color-picker">
            <p className="picker-label">{label}</p>
            <div className="color-controls">
                <input
                    type="text"
                    value={color}
                    onChange={(e) => handleColorChange(e.target.value)}
                    placeholder="#RRGGBB"
                />
                <input
                    type="color"
                    value={color}
                    onChange={(e) => handleColorChange(e.target.value)}
                />
            </div>
        </div>
    );
};