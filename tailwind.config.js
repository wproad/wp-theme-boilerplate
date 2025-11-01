/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./**/*.php",
		"./assets/**/*.{js,html}",
		"./template/**/*.{php,html}",
		"./includes/**/*.php"
	],
	theme: {
		extend: {
			typography: () => ({
				custom: {
					css: {
						"--tw-prose-body": "var(--color-n-1)",
						"--tw-prose-headings": "var(--color-n-1)",
						"--tw-prose-lead": "var(--color-n-1)",
						"--tw-prose-links": "var(--color-n-1)",
						"--tw-prose-bold": "var(--color-n-1)",
						"--tw-prose-counters": "var(--color-n-1)",
						"--tw-prose-bullets": "var(--color-n-1)",
						"--tw-prose-hr": "var(--color-n-5)",
						"--tw-prose-quotes": "var(--color-n-1)",
						"--tw-prose-quote-borders": "var(--color-n-5)",
						"--tw-prose-captions": "var(--color-n-1)",
						"--tw-prose-code": "var(--color-n-1)",
						"--tw-prose-pre-code": "var(--color-n-1)",
						"--tw-prose-pre-bg": "var(--color-n-3)",
						"--tw-prose-th-borders": "var(--color-n-11)",
						"--tw-prose-td-borders": "var(--color-n-11)",
						"--tw-prose-invert-body": "var(--color-white)",
						"--tw-prose-invert-headings": "var(--color-white)",
						"--tw-prose-invert-lead": "var(--color-white)",
						"--tw-prose-invert-links": "var(--color-white)",
						"--tw-prose-invert-bold": "var(--color-white)",
						"--tw-prose-invert-counters": "var(--color-white)",
						"--tw-prose-invert-bullets": "var(--color-white)",
						"--tw-prose-invert-hr": "var(--color-n-8)",
						"--tw-prose-invert-quotes": "var(--color-white)",
						"--tw-prose-invert-quote-borders": "var(--color-n-8)",
						"--tw-prose-invert-captions": "var(--color-white)",
						"--tw-prose-invert-code": "var(--color-white)",
						"--tw-prose-invert-pre-code": "var(--color-white)",
						"--tw-prose-invert-pre-bg": "var(--color-n-8)",
						"--tw-prose-invert-th-borders": "var(--color-n-8)",
						"--tw-prose-invert-td-borders": "var(--color-n-8)",
					},
				},
			}),
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/postcss'),
		require('autoprefixer'),
	],
};