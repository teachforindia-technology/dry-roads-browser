const gulp = require('gulp')

const {tasks} = require('dry-roads')

gulp.task('dist', () => {
	const source = [
			'./lib/crossroads-fetch-accounts.js',
			'./lib/crossroads-action-creators.js'
		],
		destination = 'dist'
	tasks.buildDist({
		source,
		destination
	})
})

gulp.task('lint', () => {
	const source = ['**/*.js','!node_modules/**', '!dist/**']
	tasks.lint({source})
})

gulp.task('publish', ['lint', 'dist'])
