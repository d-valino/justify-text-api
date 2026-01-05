const LINE_LIMIT = 80;


function fillLine(state: {index: number}, words: string[], line: string[]): { totalLetters: number; endedBySplit: boolean }
{
	const number_of_words = words.length;
	let totalLetters = 0;
	let endedBySplit = false;
	while (state.index < number_of_words)
	{
		// line.length accounts for spaces between words
		if (totalLetters + words[state.index].length + line.length <= LINE_LIMIT)
		{
			totalLetters += words[state.index].length;
			line.push(words[state.index]);
			state.index++;
			continue;
		}
		else if (words[state.index].length + totalLetters > LINE_LIMIT)
		{
			const spaceLeft = LINE_LIMIT - (totalLetters + line.length);
			if (spaceLeft > 0)
			{
				const part1 = words[state.index].substring(0, spaceLeft);
				const part2 = words[state.index].substring(spaceLeft);
				line.push(part1);
				totalLetters += part1.length;
				words[state.index] = part2;
				endedBySplit = true;
			}
		}
		break ;
	}
	return {totalLetters, endedBySplit};
}


function justifyLine(line: string[], total_letters: number): string
{
	const total_spaces = LINE_LIMIT - total_letters;
	const normal_spaces = Math.floor(total_spaces / (line.length - 1));
	let extra_spaces = total_spaces % (line.length - 1);
	
	let justified_line = '';
	for (let index = 0; index < line.length; index++)
	{
		justified_line += line[index];
		if (index < line.length - 1)
		{
			justified_line += ' '.repeat(normal_spaces);
			if (extra_spaces > 0)
			{
				justified_line += ' ';
				extra_spaces--;
			}
		}
	}
	return (justified_line + '\n');
}


// Justify only one paragraph
function justifyParagraph(paragraph: string): string
{
	const clean_paragraph = paragraph.replace(/\n/g, ' ').trim();
	if (!clean_paragraph)
		return ('');

	const words = clean_paragraph.split(/\s+/);
	let output = '';

	const state = {index: 0};
	const number_of_words = words.length;
	while (state.index < number_of_words)
	{
		const line: string[] = [];
		
		// Select words to fill the line
		const { totalLetters, endedBySplit } = fillLine(state, words, line);

		// No justification if the line is 1 word long or is the last line
		if (line.length === 1 || (state.index === number_of_words && !endedBySplit)) {
			output += line.join(' ') + '\n';
			continue;
		}

		output += justifyLine(line, totalLetters);
	}
	return (output.trimEnd() + '\n');
}


export default function justify(input: string): string
{
	const paragraphs = input.split(/\n\s*\n/);

	// Process each paragraph and join
	return (paragraphs.map(p => justifyParagraph(p)).join(''));
}
