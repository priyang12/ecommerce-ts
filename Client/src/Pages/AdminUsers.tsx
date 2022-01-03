import { Profiler } from "react";
import Spinner from "../Components/Spinner";
import { User } from "../Context/Authentication/interfaces";
import { useFetch } from "../Utils/CustomHooks";
import {
  StyledHeaders,
  StyledItems,
  StyledList,
  StyledTableContainer,
} from "./StyledPages/StyledTableView";

const AdminUsers = () => {
  const [Users, Errors, loading] = useFetch("/api/users/admin/all");

  if (loading) return <Spinner />;

  if (Errors) return <div>{Errors}</div>;

  if (!Users) return <div>Server Error Please Try Again</div>;

  if (Users.length === 0) return <div>No Users Found</div>;

  return (
    <Profiler
      id='AdminUsers'
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
              <button className='btn'>Remove User</button>
            </StyledItems>
          ))}
        </StyledList>
      </StyledTableContainer>
    </Profiler>
  );
};

export default AdminUsers;
