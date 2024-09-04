/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				concrete: "#f2f2f2",
				alto: "#d3d3d3",
				denim: "#137eb2",
			},
		},
	},
	plugins: [],
}
