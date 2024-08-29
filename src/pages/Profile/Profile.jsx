import "./Profile.scss";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import profileImg from "../../assets/images/sm.jpg";

export default function Profile() {

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="settings">
      <div className="profileBack">
        <Link to="#" onClick={goBack}>
          <IoMdArrowRoundBack className="backArrow" />
        </Link>
      </div>
      <div className="settingsWrapper">
        <div className="settingsIcon">
          <span title="Delete Account">
            <FaRegTrashAlt />
          </span>
        </div>
        <div className="profileData">
         
              <div className="profileUpdatedImg">
                <img src={user.user.profilePic || profileImg } alt="Profile" />
              </div>
              <div className="profileName">
                <h3>{user.user.name}</h3>
              </div>
              <div className="ProfileEmail">
                <span>{user.user.email}</span>
              </div>


              <div className="profileEditBtn">
                <button>Edit</button>
                <div className="changePwd">
                  <Link to={"/changepassword"}>
                    <span className="changePwd">Change Password</span>
                  </Link>
                </div>
              </div>
        </div>
      </div>
    </div>
  );
}
