import "./Profile.scss";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import profileImg from "../../assets/images/sm.jpg";
import { useEffect, useState } from "react";
import { userProfileAsync } from "../../redux/asyncThunks/authThunks";

export default function Profile() {
  const navigate = useNavigate();
  const [subscriptionData , setSubscriptionData] = useState([]); 


  const { user } = useSelector((state) => state.auth);

  const profileData = useSelector((state) => state.profile);


  const dispatch = useDispatch();

  useEffect(() => {
    const getProfileDatails = async () => {
      const response = await dispatch(userProfileAsync()).unwrap();
      setSubscriptionData(response.userDetails.subscription)

    };
    getProfileDatails();
  }, []);

  const goBack = () => {
    navigate(-1);
  };


  const date = (time) => {

    // console.log(time)

  const newDate =   new Date(time).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return newDate;
  }

  return (
    <div className="settings">
      <div className="profileBack">
        <Link to="#" onClick={goBack}>
          <IoMdArrowRoundBack className="backArrow" />
        </Link>
      </div>
      <div className="settingsWrapper">
        <div className="profileData">
          <div className="left">
            <div className="profileUpdatedImg">
              <img src={user.user.profilePic || profileImg} alt="Profile" />
            </div>
          </div>

          <div className="right">
            <div className="profileName">
              <h3>{user.user.name}</h3>
            </div>
            <div className="ProfileEmail">
              <p>{user.user.email}</p>
            </div>
            <div className="profileEditBtn">
              <button>Edit</button>
              <Link to={"/changepassword"}>
                <p className="changePwd">Change Password</p>
              </Link>
            </div>
          </div>
        </div>

        <hr className="lineBr" />
        <div className="subscriptionPlans">
          <p>Your Subscriptions</p>

          {subscriptionData ?
            <div className="subscriptionPlansData">
            <div className="planInfo left">
              <p>
                Name Of Plan : <span>{subscriptionData.plan}</span>
              </p>
              <p>
                Custmer Name : <span>{subscriptionData.name}</span>
              </p>
              <p>
                Custmer Email : <span>{subscriptionData.email}</span>
              </p>
              <p>
                Subscription ID : <span>{subscriptionData.subscriptionId}</span>
              </p>
            </div>
            <div className="planInfo right">
              <p>
                Start Date : <span>{date(subscriptionData.startDate)}</span>
              </p>
              <p>
                Expire Date : <span>{date(subscriptionData.endDate)}</span>
              </p>
              <p>
                Plan Price : <span>{subscriptionData.price} /-</span>
              </p>
              <div className="subscriptionPlansDataBtn">
                <button>Cancel</button>
                <button>Upgrade</button>
              </div>
            </div>
          </div> :
          <p className="noplan">  You din't have active plan</p>
          }
        
        </div>
      </div>
    </div>
  );
}
