export const randomRgbColor = function* (): Generator<string> {
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	yield `rgb(${r},${g},${b})`;
};
