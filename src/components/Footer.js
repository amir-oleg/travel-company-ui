import Navbar from 'react-bootstrap/Navbar'
import { Button } from 'react-bootstrap'

const style = {
	backgroundColor: '#F8F8F8',
	borderTop: '1px solid #E7E7E7',
	textAlign: 'center',
	padding: '20px',
	position: 'fixed',
	left: '0',
	bottom: '0',
	height: '60px',
	width: '100%',
}

export default function Footer() {
	return (
		<Navbar bg="dark" variant="dark" style={style}>
			<Button>О нас</Button>
		</Navbar>
	)
}
