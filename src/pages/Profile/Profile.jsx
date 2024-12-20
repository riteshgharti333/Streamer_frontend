import "./Profile.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { toast } from "react-toastify";
import {
  updateProfileAsync,
  userProfileAsync,
} from "../../redux/asyncThunks/authThunks";
import { profileSchema } from "../../schemas";
import { useFormik } from "formik";
import { deleteSubscriptionAsync } from "../../redux/asyncThunks/subscriptionThunks";
import { Skeleton } from "@mui/material";
import axios from "axios";

export default function Profile() {
  const baseUrl = import.meta.env.VITE_API_KEY;

  const navigate = useNavigate();
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [openCancelId, setOpenCancelId] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [profileData, setProfileData] = useState({});

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { profile } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);

      const { data } = await axios.get(`${baseUrl}/auth/profile`, {
        withCredentials: true,
      });

      if (data) {
        setSubscriptionData(data.userDetails.subscription);
        setProfileData(data.userDetails.user);
      }

      setIsLoading(false);
    };

    fetchProfileData();
  }, [dispatch, profile]);

  const handleDelete = async (id) => {
    try {
      const res = await dispatch(deleteSubscriptionAsync(id)).unwrap();
      toast.success(res.message);

      await dispatch(userProfileAsync()).unwrap();

      setOpenCancelId(null);
    } catch (error) {
      toast.error(error.message);
      console.error("Error deleting subscription:", error);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        name: profileData.name || "",
        email: profileData.email || "",
      },
      validationSchema: profileSchema,
      onSubmit: async (values) => {
        if (
          values.name === profileData.name &&
          values.email === profileData.email
        ) {
          toast.info("No changes detected.");
          return;
        }
        try {
          const response = await dispatch(updateProfileAsync(values)).unwrap();
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, user: response.user })
          );
          toast.success(response.message);
        } catch (error) {
          toast.error(error.message);
          console.log(error);
        } finally {
          setUpdateMode(false);
        }
      },
    });

  const formatDate = (time) => {
    const newDate = new Date(time).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return newDate;
  };

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
        <Link to="#" onClick={goBack}>
          {isLoading ? (
            <div className="backIcon"></div>
          ) : (
            <BsArrowLeft className="backIcon" />
          )}
        </Link>
      </div>

      <div className="settings">
        {isLoading ? (
          <div className="settingsSke">
            <Skeleton
              variant="rectangular"
              width="50%"
              height={200}
              style={{ borderRadius: "10px" }}
            />
            <Skeleton
              variant="rectangular"
              width="50%"
              height={50}
              className="subChild"
            />
            <Skeleton
              variant="rectangular"
              width="50%"
              height={50}
              className="subChild"
            />
          </div>
        ) : (
          <>
            <div className="settingsWrapper bg-primary">
              <div className="profileData">
                <div className="right">
                  {updateMode ? (
                    <form className="updateMode" onSubmit={handleSubmit}>
                      <div className="inputValid">
                        <div className="inputType">
                          <input
                            type="text"
                            autoComplete="off"
                            placeholder="Username"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        {errors.name && touched.name ? (
                          <p className="formError">{errors.name}</p>
                        ) : null}
                      </div>
                      <div className="inputValid">
                        <div className="inputType">
                          <input
                            type="text"
                            autoComplete="off"
                            placeholder="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        {errors.email && touched.email ? (
                          <p className="formError">{errors.email}</p>
                        ) : null}
                      </div>
                      <div className="profileEditBtn">
                        <button
                          type="button"
                          onClick={() => setUpdateMode(false)}
                        >
                          Cancel
                        </button>
                        <button type="submit">Update</button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="profileName">
                        <h3>{profileData.name}</h3>
                      </div>
                      <div className="profileEmail">
                        <p>{profileData.email}</p>
                      </div>
                      <div className="profileEditBtn">
                        <button onClick={() => setUpdateMode(!updateMode)}>
                          Edit
                        </button>
                      </div>
                    </>
                  )}
                </div>
                <Link to={"/updatepassword"}>
                  <p className="changePwd">Change Password</p>
                </Link>
              </div>

              <hr className="lineBr" />

              {subscriptionData.length > 0 ? (
                <div className="subscriptionPlans">
                  <p>Your Subscriptions</p>

                  {subscriptionData.map((subscription) => (
                    <div
                      className="subscriptionPlansData"
                      key={subscription._id}
                    >
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
                          Subscription ID:{" "}
                          <span>{subscription.subscriptionId}</span>
                        </p>
                      </div>

                      <div className="planInfo right">
                        <p>
                          Start Date:{" "}
                          <span>{formatDate(subscription.startDate)}</span>
                        </p>
                        <p>
                          Expire Date:{" "}
                          <span>{formatDate(subscription.endDate)}</span>
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

                          <button>
                            <Link to={"/subscriptions"}>Upgrade </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="noplan">
                  You don not have any active plan
                  <Link to={"/subscriptions"}>
                    <span className="seeplan">See plans.</span>
                  </Link>
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
