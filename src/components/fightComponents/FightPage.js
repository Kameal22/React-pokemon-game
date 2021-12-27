import "../../styles/FightPage.css";
import { Link } from "react-router-dom";

function Fight() {
  return (
    <div className="fightDiv">
      <div className="navLinksScd">
        <Link to="/">Home</Link>
      </div>
      <h2 className="fightHeading">Fight</h2>
      <div className="fightSelectingDiv">
        <h4 className="startEncounter">
          <Link className="startEncounter" to="/Fight">
            Start encounter
          </Link>
        </h4>
      </div>
    </div>
  );
}
export default Fight;
