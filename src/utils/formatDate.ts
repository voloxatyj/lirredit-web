/* eslint-disable camelcase */
export const formatDate = function* (
	time: string,
): Generator<IteratorResult<string> | IteratorYieldResult<string>> {
	const date = new Date((time || '').replace(/-/g, '/').replace(/[TZ]/g, ' '));
	const diff = (new Date().getTime() - date.getTime()) / 1000;
	const day_diff = Math.floor(diff / 86400);
	const { value } =
		day_diff >= 1 ? getDayDiff(day_diff).next() : getDiffInDay(diff).next();
	yield value;
};

const getDayDiff = function* (day_diff: number): Generator<string> {
	let word = null;

	if (day_diff < 7) {
		word = day_diff > 1 ? 'days' : 'day';
		yield `${day_diff} ${word} ago`;
	}

	if (day_diff < 31) {
		const week = Math.ceil(day_diff / 7);
		word = week > 1 ? 'weeks' : 'week';
		yield `${week} ${word} ago`;
	}

	if (day_diff > 31 && day_diff <= 365) {
		const month = Math.ceil(day_diff / 31);
		word = month > 1 ? 'months' : 'month';
		yield `${month} ${word} ago`;
	}

	const year = Math.ceil(day_diff / 365);
	word = year > 1 ? 'years' : 'year';
	yield `${year} ${word} ago`;
};

const getDiffInDay = function* (diff: number): Generator<string> {
	let word = null;

	if (diff < 60) {
		yield 'just now';
	}

	if (diff < 3600) {
		const minutes = Math.floor(diff / 60);
		word = minutes > 1 ? 'minutes' : 'minute';
		yield `${minutes} ${word} ago`;
	}

	const hours = Math.floor(diff / 3600);
	word = hours > 1 ? 'hours' : 'hour';
	yield `${hours} ${word} ago`;
};
