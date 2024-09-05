import "./Profile.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profileImg from "../../assets/images/sm.jpg";
import { useEffect, useState } from "react";
import { userProfileAsync } from "../../redux/asyncThunks/authThunks";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";

export default function Profile() {
  const navigate = useNavigate();
  const [subscriptionData, setSubscriptionData] = useState(null);

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

  // useEffect (() => {
  //   const data = async () => {
  //     const res = await axios.get("http://localhost:5000/api/auth/profile" , {withCredentials: true});
  //     console.log(res);
  //   }
  //   data();
  // },[])

  const goBack = () => {
    navigate(-1);
  };

  const date = (time) => {
    // console.log(time)

    const newDate = new Date(time).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return newDate;
  };

  return (
    <div className="settingsContainer">
      <div className="backIcon">
        <Link to="/">
          <BsArrowLeft className="backIcon" />
        </Link>
      </div>

      {/* <div className="settings">
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
                    Subscription ID :
                    <span>{subscriptionData.subscriptionId}</span>
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
              </div>
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
      </div> */}
    </div>
  );
}
