import "../styles/Equipment.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Equipment() {
  const location = useLocation();
  const { items } = location.state;

  return (
    <div className="equipmentDiv">
      <div className="navLinksScd">
        <Link to="/">Home</Link>
      </div>
      <h2 className="equipmentHeading">Your items</h2>
      <div className="itemsDiv">
        {items.map((item) => {
          return <img src={item.img} />;
        })}
      </div>
    </div>
  );
}
export default Equipment;
