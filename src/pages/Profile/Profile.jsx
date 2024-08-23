// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react'
// import { Context, baseUrl } from '../../main';

// const Profile = () => {

//     const { setUser, setIsAuthenticated, setLoading } = useContext(Context);

//     useEffect(() => {
//       setLoading(true);
//       axios
//         .get(`${baseUrl}/api/auth/profile`, {
//           withCredentials: true,
//         })
//         .then((res) => {
//           setUser(res.data.user);
//           setIsAuthenticated(true);
//           setLoading(false);
//         })
//         .catch((error) => {
//           setUser({});
//           setIsAuthenticated(false);
//           setLoading(false);
//           console.log(error)
//         });
//     }, []);

//   return (
//     <div>
//       profile
//     </div>
//   )
// }

// export default Profile
