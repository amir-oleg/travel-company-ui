/* eslint-disable import/no-cycle */
import Image from 'react-bootstrap/Image'
import home from '../assests/home.jpg'

function HomePage() {
	return (
		<div className="border d-flex align-items-center justify-content-center customHeight">
			<Image width={1500} src={home} />
		</div>
	)
}

export default HomePage
