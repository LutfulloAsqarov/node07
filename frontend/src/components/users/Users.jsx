// import React, { useState } from "react";
// import {
//   useDeleteUserMutation,
//   useGetUsersQuery,
// } from "../../context/api/userApi";
// import Typography from "@mui/material/Typography";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import "./users.scss";

// const Users = () => {
//   const [page, setPage] = useState(1);
//   const handleChange = (event, value) => {
//     setPage(value);
//   };

//   const { data } = useGetUsersQuery({ limit: 3 });
//   const [handleDelete, { data: userData }] = useDeleteUserMutation();

//   if (!data || !data.payload) return <div>Loading...</div>;

//   const handleDeleteFunc = (id) => {
//     if (window.confirm("ochirmoqchimisz")) {
//       handleDelete(id);
//     }
//   };
//   let count = data?.total;
//   console.log(page);

//   return (
//     <div className="user">
//       <h2 className="user-title">Users</h2>
//       <div className="user-cards">
//         {data.payload.map((user) => (
//           <div key={user._id} className="user-card">
//             <div className="user-img">
//               <img src={user.url} alt={user.fname} className="user-avatar" />
//             </div>
//             <div className="user-info">
//               <h3 className="user-name">{user.fname}</h3>
//               <p className="user-username">@{user.username}</p>
//               <p className="user-age">Age: {user.age}</p>
//               <p
//                 className={`user-status ${
//                   user.isActive ? "active" : "inactive"
//                 }`}
//               >
//                 Status: {user.isActive ? "Active" : "Inactive"}
//               </p>
//               <div className="user-btns">
//                 <button>edit</button>
//                 <button onClick={() => handleDeleteFunc(user._id)}>
//                   delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="user-page">
//         <Stack spacing={2}>
//           <Typography>Page: {page}</Typography>
//           <Pagination count={count} page={page} onChange={handleChange} />
//         </Stack>
//       </div>
//     </div>
//   );
// };

// export default Users;

import React, { useState } from "react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../context/api/userApi";
// import Typography from "@mui/material/Typography";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
import "./users.scss";

const Users = () => {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const limit = 3;
  const { data, isFetching } = useGetUsersQuery();
  const [handleDelete] = useDeleteUserMutation();

  if (isFetching) return <div>Loading...</div>;

  const handleDeleteFunc = (id) => {
    if (window.confirm("O'chirmoqchimisiz")) {
      handleDelete(id).then(() => {
        setPage(1);
      });
    }
  };

  let totalPages = Math.ceil(data?.total / limit);

  return (
    <div className="user">
      <h2 className="user-title">Users</h2>
      <div className="user-cards">
        {data?.payload?.map((user) => (
          <div key={user._id} className="user-card">
            <div className="user-img">
              <img src={user.url} alt={user.fname} className="user-avatar" />
            </div>
            <div className="user-info">
              <h3 className="user-name">{user.fname}</h3>
              <p className="user-username">@{user.username}</p>
              <p className="user-age">Age: {user.age}</p>
              <p
                className={`user-status ${
                  user.isActive ? "active" : "inactive"
                }`}
              >
                Status: {user.isActive ? "Active" : "Inactive"}
              </p>
              <div className="user-btns">
                <button>edit</button>
                <button onClick={() => handleDeleteFunc(user._id)}>
                  delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
