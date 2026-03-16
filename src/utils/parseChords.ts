export function parseLine(line: string) {
    let text = '';
    let chords: { name: string; pos: number }[] = [];
    let pos = 0;
    let i = 0;
    let isBold = false;
    let boldRanges: { start: number; end: number }[] = [];

    while (i < line.length) {
        if (line[i] === '[') {
            const end = line.indexOf(']', i);
            if (end !== -1) {
                const chordName = line.slice(i + 1, end);
                chords.push({ name: chordName, pos: pos });
                i = end + 1;
                continue;
            }
        } else if (line[i] === '{') {
            isBold = true;
            boldRanges.push({ start: pos, end: pos });
            i++;
            continue;
        } else if (line[i] === '}') {
            if (isBold && boldRanges.length > 0) {
                boldRanges[boldRanges.length - 1].end = pos;
            }
            isBold = false;
            i++;
            continue;
        }

        text += line[i];
        pos++;
        i++;
    }

    return { text, chords, boldRanges };
}