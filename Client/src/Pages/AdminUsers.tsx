import { Profiler, useState } from "react";
import { User } from "../Context/Authentication/interfaces";
import Spinner from "../Components/Spinner";
import { useMutation, useQuery } from "react-query";
import { LoadUsers, RemoveUser } from "../API/AdminAPI";
import { queryClient } from "../query";
import AlertDisplay from "../Components/AlertDisplay";

import {
  StyledHeaders,
  StyledItems,
  StyledList,
  StyledTableContainer,
} from "./StyledPages/StyledTableView";

const AdminUsers = () => {
  const {
    data: Users,
    error: UserError,
    isLoading,
  } = useQuery(["Users"], LoadUsers);
  const [alert, setAlert] = useState({
    msg: "",
    type: false,
  });
  const { mutate: DeleteCall } = useMutation(RemoveUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["Users"]);
      setAlert({ msg: data.message, type: true });
    },
  });

  const DeleteAccount = (id: string) => {
    DeleteCall(id);
  };

  if (isLoading) return <Spinner />;

  if (UserError) return <div>Server Error</div>;

  if (Users.length === 0) return <div>No Users Found</div>;

  return (
    <Profiler
      id="AdminUsers"
      onRender={(id, phase, actualDuration) => {
        console.log({ id, phase, actualDuration });
      }}
    >
      <StyledTableContainer>
        {alert.msg && <AlertDisplay msg={alert.msg} type={alert.type} />}
        <StyledHeaders>
          <h2>Name</h2>
          <h2>Email</h2>
          <h2>isAdmin</h2>
          <h2>Joined</h2>
          <h2>Remove</h2>
        </StyledHeaders>
        <StyledList>
          {Users.map((user: User, index: number) => (
            <StyledItems key={index}>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.isAdmin ? "Admin" : "User"}</p>
              <p>{user.createdAt.slice(0, 10)}</p>
              <button
                className="btn"
                onClick={() => {
                  DeleteAccount(user._id);
                }}
              >
                Remove User
              </button>
            </StyledItems>
          ))}
        </StyledList>
      </StyledTableContainer>
    </Profiler>
  );
};

export default AdminUsers;
