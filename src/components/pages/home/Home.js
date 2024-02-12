import "./Home.css";
import OrdersTable from "../../OrdersTable/OrdersTable";

const Home = () => {
  return (
    <div className="agent-view">
      <div className="search-bar">
        
      </div>
      <OrdersTable className="orders-table" />
    </div>
  );
};

export default Home;
