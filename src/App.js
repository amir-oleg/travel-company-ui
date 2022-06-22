/* eslint-disable import/no-cycle */
import { BrowserRouter } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { Context } from './index'
import { getCountries } from './API/ConstsService'

const App = observer(() => {
	const { searchStore } = useContext(Context)

	useEffect(() => {
		getCountries().then((data) => searchStore.setCountries(data))
	}, [])

	return (
		<BrowserRouter>
			<NavBar />
			<AppRouter />
		</BrowserRouter>
	)
})

export default App
