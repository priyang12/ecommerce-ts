import { Profiler } from "react";
import { User } from "../Context/Authentication/interfaces";
import { useHistory } from "react-router-dom";
import Spinner from "../Components/Spinner";

import {
  StyledHeaders,
  StyledItems,
  StyledList,
  StyledTableContainer,
} from "./StyledPages/StyledTableView";
import { useQuery } from "react-query";
import { LoadUsers } from "../API/AdminAPI";

const AdminUsers = () => {
  const history = useHistory();
  const {
    data: Users,
    error: UserError,
    isLoading,
  } = useQuery(["Users"], LoadUsers);

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
                  history.push(`/StillWorking`);
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
