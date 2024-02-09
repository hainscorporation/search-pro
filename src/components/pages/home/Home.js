import './Home.css'
import OrdersTable from '../../OrdersTable/OrdersTable'

const Home = () => {
	return (
		<>
			<div className='search-bar'>
				<h1>SEARCH PRO</h1>
			</div>
			<OrdersTable className='orders-table' /> 
		</>
	)
}

export default Home;
