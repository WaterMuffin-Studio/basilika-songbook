import { europeanToAnglo, chordsMajor, chordsMinor, chords7Major, chords7Minor } from "../data/chords";

export function transpone(chord: string, step: number, system: "en" | "eu"): string {
    const allGroups = [chordsMajor, chordsMinor, chords7Major, chords7Minor];
    
    for (const group of allGroups) {
        const index = group.indexOf(chord);
        
        if (index !== -1) {
            const newIndex = (index + (step % 12) + 12) % 12;
            const transposedEu = group[newIndex];
            
            return system === "en" ? europeanToAnglo[transposedEu] : transposedEu;
        }
    }

    return chord;
}
