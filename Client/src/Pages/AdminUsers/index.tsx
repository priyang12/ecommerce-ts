import { Profiler } from "react";
import { User } from "../../Context/Authentication/interfaces";
import { useLoadUsers, useRemoveUser } from "../../API/AdminAPI";
import Spinner from "../../Components/Spinner";
import AlertDisplay from "../../Components/AlertDisplay";
import {
  StyledHeaders,
  StyledItems,
  StyledList,
  StyledTableContainer,
} from "./../StyledPages/StyledTableView";

const AdminUsers = () => {
  const { data: Users, error: UserError, isLoading } = useLoadUsers();
  const { mutate: DeleteCall, isSuccess, data } = useRemoveUser();

  if (isLoading) return <Spinner />;

  if (UserError) return <div>Server Error</div>;

  if (!Users || Users.length === 0) return <div>No Users Found</div>;

  return (
    <Profiler
      id="AdminUsers"
      onRender={(id, phase, actualDuration) => {
        console.log({ id, phase, actualDuration });
      }}
    >
      <StyledTableContainer>
        {isSuccess && (
          <AlertDisplay msg={data?.message || "User Removed"} type={true} />
        )}
        <StyledHeaders>
          <h2>Name</h2>
          <h2>Email</h2>
          <h2>isAdmin</h2>
          <h2>Joined</h2>
          <h2>Remove</h2>
        </StyledHeaders>
        <StyledList>
          {Users.map((user: User) => (
            <StyledItems key={user._id}>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.isAdmin ? "Admin" : "User"}</p>
              <p>{user.createdAt.slice(0, 10)}</p>
              <button
                className="btn"
                data-testid={`remove-user-${user._id}`}
                onClick={() => {
                  DeleteCall(user._id);
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
