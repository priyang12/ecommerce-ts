import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Box } from "@mui/material";
import { Loading, Title, useGetList } from "react-admin";
import { Link } from "react-router-dom";
import HelmetComponent from "../../HelmetComponent";
import Chart from "./Chart";

const Dashboard = () => {
  const { data, total, isLoading, error } = useGetList("orders", {
    pagination: {
      page: 1,
      perPage: 10,
    },
    sort: {
      field: "createdAt",
      order: "-1",
    },
  });

  if (isLoading) return <Loading />;

  if (error) return <p>ERROR</p>;

  return (
    <Box
      sx={{
        fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
      }}
    >
      <HelmetComponent>
        <title>Dashboard</title>
      </HelmetComponent>
      <Card
        sx={{
          maxWidth: 500,
          borderRadius: "20px",
          mt: "10px",
        }}
      >
        <Title title="Welcome to the administration" />
        <CardContent
          sx={{
            borderRadius: "20px",
          }}
        >
          <h1>Welcome to Admin to shopit for managing your Shop</h1>
        </CardContent>
      </Card>
      <Chart />
      <h1>Recent Orders {total}</h1>
      <List>
        {data?.map((record) => (
          <ListItem
            component={Link}
            to={`/orders/${record._id}`}
            key={record.id}
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            <div>{record.user.name}</div>
            <div>{record.user.email}</div>
            <div>{record.totalPrice}</div>
            <div>{record.isDelivered ? "Delivered" : "Not Delivered"}</div>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Dashboard;
