import "./Home.css";
import OrdersTable from "../../OrdersTable/OrdersTable";
import SearchBar from "../../SearchBar/SearchBar";

const Home = () => {
  return (
    <div className="agent-view">
      <SearchBar /> 
      <OrdersTable className="orders-table" />
    </div>
  );
};

export default Home;
