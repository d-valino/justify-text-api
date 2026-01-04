const DAILY_WORD_LIMIT = 80_000;

type UserUsage = {
	wordsToday: number;
	lastReset: string;
};

const store = new Map<string, UserUsage>();

function today(): string {
	return new Date().toISOString().split("T")[0];
}

function countWords(text: string): number {
	return text.trim().split(/\s+/).filter(Boolean).length;
}

export function consumeWords(email: string, text: string): boolean {
	const words = countWords(text);
	const date = today();

	const usage = store.get(email) ?? {
		wordsToday: 0,
		lastReset: date,
	};

	if (usage.lastReset !== date) {
		usage.wordsToday = 0;
		usage.lastReset = date;
	}

	if (usage.wordsToday + words > DAILY_WORD_LIMIT) {
		return false;
	}

	usage.wordsToday += words;
	store.set(email, usage);
	return true;
}
