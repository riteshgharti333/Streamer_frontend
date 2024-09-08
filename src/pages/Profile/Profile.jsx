import "./Profile.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profileImg from "../../assets/images/sm.jpg";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";

const priceBackgroundMap = {
  700: "url('../../assets/images/st.jpg')",
  900: "url('../../assets/images/sm.jpg')",
  1500: "url('../../assets/images/sg.jpg')",
  // Add more mappings as needed
};

export default function Profile() {
  const baseUrl = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [openCancelId, setOpenCancelId] = useState(null); // Track which subscription's cancel modal is open

  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/auth/profile`, {
          withCredentials: true,
        });
        setSubscriptionData(data.userDetails.subscription);
        console.log(data.userDetails.subscription[0])
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      }
    };
    fetchData();
  }, [baseUrl]);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${baseUrl}/subscriptions/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setSubscriptionData((prevData) =>
        prevData.filter((subscription) => subscription._id !== id)
      );
      setOpenCancelId(null); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting subscription:", error);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const formatDate = (time) => {
    const newDate = new Date(time).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return newDate;
  };

  // Cancel component to handle subscription cancellation
  const Cancel = ({ subscriptionId, closeCancelModal }) => {
    return (
      <div className="openCancel">
        <div className="openCancelInfo">
          <p>Do you want to cancel this subscription?</p>
          <button onClick={() => handleDelete(subscriptionId)}>Yes</button>
          <button onClick={closeCancelModal}>No</button>
        </div>
      </div>
    );
  };

  // Toggles cancel modal for a specific subscription
  const toggleCancelModal = (id) => {
    setOpenCancelId(id === openCancelId ? null : id);
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

          {subscriptionData.length > 0 ? (
            <div className="subscriptionPlans">
              <p>Your Subscriptions</p>

              {subscriptionData.map((subscription) => (
                <div className="subscriptionPlansData" key={subscription._id}>
                  
                  {openCancelId === subscription._id && (
                    <Cancel
                      subscriptionId={subscription.subscriptionId}
                      closeCancelModal={() => setOpenCancelId(null)}
                    />
                  )}

                  <div className="planInfo left">
                    <p>
                      Name Of Plan: <span>{subscription.plan}</span>
                    </p>
                    <p>
                      Customer Name: <span>{subscription.name}</span>
                    </p>
                    <p>
                      Customer Email: <span>{subscription.email}</span>
                    </p>
                    <p>
                      Subscription ID: <span>{subscription.subscriptionId}</span>
                    </p>
                  </div>

                  <div className="planInfo right">
                    <p>
                      Start Date:{" "}
                      <span>{formatDate(subscription.startDate)}</span>
                    </p>
                    <p>
                      Expire Date: <span>{formatDate(subscription.endDate)}</span>
                    </p>
                    <p>
                      Plan Price: <span>{subscription.price} /-</span>
                    </p>
                    <div className="subscriptionPlansDataBtn">
                      <button
                        onClick={() => toggleCancelModal(subscription._id)}
                      >
                        Cancel
                      </button>
                      <button>Upgrade</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="noplan">
              You don't have an active plan
              <Link to={"/subscriptions"}>
                <span className="seeplan">See plans.</span>
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
