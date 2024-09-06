import "./Profile.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profileImg from "../../assets/images/sm.jpg";
import { useEffect, useState } from "react";
import { userProfileAsync } from "../../redux/asyncThunks/authThunks";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";

const priceBackgroundMap = {
  "700": "url('../../assets/images/st.jpg')",
  "900": "url('../../assets/images/sm.jpg')",
  "1500": "url('../../assets/images/sg.jpg')",
  // Add more mappings as needed
};


export default function Profile() {
  const navigate = useNavigate();
  const [subscriptionData, setSubscriptionData] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const profileData = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const getProfile = async () => {
  //    const res =  await dispatch(userProfileAsync()).unwrap();
  //    console.log(res);
  //   };
  //   getProfile();
  // }, [dispatch]);

  // useEffect(() => {

  // })

  let price;

 

  useEffect(() => {
    const data = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/auth/profile",
        { withCredentials: true }
      );
      setSubscriptionData(data.userDetails.subscription);
      console.log(data.userDetails.subscription[0]);
    };
    data();
  }, []);

  const backgroundImage = priceBackgroundMap[price] || 'none';

  const style = {
    backgroundImage
  };

  const goBack = () => {
    navigate(-1);
  };

  const date = (time) => {
    const newDate = new Date(time).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return newDate;
  };

  return (
    <div className="settingsContainer">
      <div className="prevIcon">
        <Link to="/">
          <BsArrowLeft className="backIcon" />
        </Link>
      </div>

      <div className="settings">
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
          {subscriptionData ? (
            <div className="subscriptionPlans">
              <p>Your Subscriptions</p>

              {subscriptionData.map((subscription) => (
                <div className="subscriptionPlansData" key={subscription._id} style={style}>
                  <div className="planInfo left">
                    <p>
                      Name Of Plan : <span>{subscription.plan}</span>
                    </p>
                    <p>
                      Custmer Name : <span>{subscription.name}</span>
                    </p>
                    <p>
                      Custmer Email : <span>{subscription.email}</span>
                    </p>
                    <p>
                      Subscription ID :
                      <span>{subscription.subscriptionId}</span>
                    </p>
                  </div>
                  <div className="planInfo right">
                    <p>
                      Start Date : <span>{date(subscription.startDate)}</span>
                    </p>
                    <p>
                      Expire Date : <span>{date(subscription.endDate)}</span>
                    </p>
                    <p>
                      Plan Price : <span>{subscription.price} /-</span>
                    </p>
                    <div className="subscriptionPlansDataBtn">
                      <button>Cancel</button>
                      <button>Upgrade</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="noplan">
              You din't have active plan
              <Link to={"/subscriptions"}>
                <span className="seeplan">See plan.</span>
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
