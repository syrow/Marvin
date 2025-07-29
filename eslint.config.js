import { configApp } from '@adonisjs/eslint-config'
export default configApp({
      rules: {
            'prettier/prettier': 0,
            "@typescript-eslint/naming-convention": false
      }
})