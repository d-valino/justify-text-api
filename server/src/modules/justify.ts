const LINE_LIMIT = 80;

export default function justify(input: string): string {
    const words = input.replace(/\n/g, '').split(/\s+/);
    let output = '';
    
    let i = 0;
    const number_of_words = words.length;

    while (i < number_of_words) {
        const line = [];
        let total_letters = 0;

        // Select words
        while (i < number_of_words && total_letters + words[i].length + line.length <= LINE_LIMIT) {
            total_letters += words[i].length;
            line.push(words[i]);
            i++;
        }

        if (line.length === 1) {
            output += line[0] + '\n';
            continue;
        }

        // Calculate number of spaces
        const total_spaces = LINE_LIMIT - total_letters;
        const normal_spaces = Math.floor(total_spaces / (line.length - 1));
        let extra_spaces = total_spaces % (line.length - 1);

        // Justify line
        let justified_line = '';
        for (let index = 0; index < line.length; index++) {
            justified_line += line[index];
            if (index < line.length - 1) {
                justified_line += ' '.repeat(normal_spaces);
                if (extra_spaces > 0) {
                    justified_line += ' ';
                    extra_spaces--;
                }
            }
        }
        justified_line += '\n';
        output += justified_line;
    }

    return output;
}
