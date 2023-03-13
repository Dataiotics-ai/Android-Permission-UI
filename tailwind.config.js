module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
	daisyui: {
		themes: ["light"],
	},
	plugins: [require("daisyui")],
};
