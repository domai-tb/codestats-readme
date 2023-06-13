import express from 'express'
import api from './api/profile'
import history from './api/history'
import topLangs from './api/top-langs'
import profile from './api/profile'

const app = express()


app.use('/profile', profile)
app.use('/history', history)
app.use('/toplang', topLangs)

app.get('/', (_, res) => {
	res.redirect(301, 'https://github.com/domai-tb/codestats-readme')
})

app.listen(3000, () => {
	console.log('server launched!')
})
