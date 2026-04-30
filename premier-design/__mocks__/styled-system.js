module.exports = {
	css: () => '',
	cva: () => (options) => {
		if (options && options.variant) {
			return `root ${options.variant}`;
		}
		return 'root primary';
	},
	cx: (...args) => args.filter(Boolean).join(' '),
};
