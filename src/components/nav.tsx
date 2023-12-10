import React from 'react'
import { Link } from 'react-router-dom'
import './css/nav.css'

const Navigation: React.FC = () => {
	return (
		<div className='menu'>
			<input type='checkbox' id='check' />
			<label htmlFor='check' className='button'>
				<span></span>
				<span></span>
				<span></span>
			</label>
			<nav>
				<Link to='/'>Home</Link>
				<Link to='/tutorials/2-sum'>Tutorials</Link>
				<Link to='/contact'>Contact</Link>
			</nav>
		</div>
	)
}

export default Navigation
