import { Link } from "react-router-dom";
import { Dots } from "../../svg";

export default function ProfileMenu(setPhotosVisible) {
  return (
    <div className="profile_menu_wrap">
      <div className="profile_menu">
        <Link to="/" className="profile_menu_active">
          Posts
        </Link>
        {/* <Link to="/" className="hover`">
          About
        </Link> */}
        <Link to="/" className="hover`">
          Friends
        </Link>
        <Link to="" className="hover`" onClick={() => setPhotosVisible(true)}>
          photos
        </Link>
        <Link to="/" className="hover`">
          Videos
        </Link>
        {/* <Link to="/" className="hover`">
          Check ins
        </Link>
        <Link to="/" className="hover`">
          More
        </Link>
        <div className="p10_dots">
          <Dots />
        </div> */}
      </div>
    </div>
  );
}
