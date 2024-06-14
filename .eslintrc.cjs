module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'airbnb-base',
		'plugin:vue/vue3-essential',
		'plugin:prettier/recommended',
		'@vue/eslint-config-prettier/skip-formatting',
		'@vue/prettier',
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ['import', 'unused-imports', 'prettier'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
		],
		'vue/html-self-closing': [
			'error',
			{
				html: {
					void: 'always',
					normal: 'never',
					component: 'always',
				},
				svg: 'always',
				math: 'always',
			},
		],
		'vue/max-attributes-per-line': [
			'error',
			{
				singleline: 5,
				multiline: 5,
			},
		],
		'vue/first-attribute-linebreak': [
			'error',
			{
				singleline: 'ignore',
				multiline: 'below',
			},
		],
		'vue/require-default-prop': 'error',
		'vue/multi-word-component-names': [
			'error',
			{
				ignores: [],
			},
		],
		'vue/no-v-html': 'off',
		'no-unused-vars': 'off',
		'unused-imports/no-unused-imports': 'warn',
		'unused-imports/no-unused-vars': [
			'error',
			{
				vars: 'all',
				args: 'none',
				ignoreRestSiblings: true,
			},
		],
		'import/order': [
			'error',
			{
				pathGroups: [
					{
						pattern: '@/**',
						group: 'external',
						position: 'after',
					},
				],
				alphabetize: { order: 'asc', caseInsensitive: false },
				'newlines-between': 'always-and-inside-groups',
				warnOnUnassignedImports: true,
			},
		],
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: ['vite.config.js'],
			},
		],
		'import/no-default-export': 'error',
		'import/prefer-default-export': 'off',
	},
	overrides: [
		{
			files: ['*.js?(x)', '*.json'],
			rules: {
				'prettier/prettier': 'off',
			},
		},
		{
			files: ['*.vue'],
			rules: {
				'vue/multi-word-component-names': 'off',
			},
		},
		{
			files: ['vite.config.js', 'postcss.config.js', 'tailwind.config.js'],
			rules: {
				'import/no-default-export': 'off',
			},
		},
	],
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['@', './src'],
					['virtual:svg-icons-register', 'svg-icons-register'],
				],
				extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
			},
		},
	},
	ignorePatterns: ['node_modules/', 'dist/'],
};
