import "../styles/Equipment.css";
import { Link } from "react-router-dom";

function Equipment() {
  return (
    <div className="equipmentDiv">
      <div className="navLinksScd">
        <Link to="/">Home</Link>
        <Link to="/Equipment">Equipment</Link>
        <Link to="/Character">Character</Link>
        <Link to="/Fight">Fight</Link>
      </div>
      <h2 className="equipmentHeading">Your items</h2>
    </div>
  );
}
export default Equipment;
