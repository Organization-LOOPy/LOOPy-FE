import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),

  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      prettier, // 플러그인 등록
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      'plugin:prettier/recommended', 
    ],
    rules: {
      'prettier/prettier': 'warn', // prettier 위반 시 ESLint에서 warn 처리
    },
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
  },
])
