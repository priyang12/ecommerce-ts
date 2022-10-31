import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/material";
import { Loading, Title, useGetList } from "react-admin";
import HelmetComponent from "../../HelmetComponent";
import LatestOrder from "./LatestOrder";
import Typography from "@mui/material/Typography";
import Chart from "./Chart";
import LatestReview from "./LatestReview";
import { Suspense } from "react";

const Dashboard = () => {
  const { data, total, isLoading, error } = useGetList("orders", {
    pagination: {
      page: 1,
      perPage: 10,
    },

    sort: {
      field: "createdAt",
      order: "ASC",
    },
  });

  if (isLoading) return <Loading loadingPrimary="Loading Latest Orders" />;

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

      <Box
        sx={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <div>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <Card
              sx={{
                p: "1rem 2rem",
              }}
            >
              <Typography component="h2">Total Orders {total}</Typography>
            </Card>
            <Card
              sx={{
                p: "1rem 2rem",
              }}
            >
              <Typography component="h2">Total Orders {total}</Typography>
            </Card>
          </Box>
          <LatestOrder data={data} />
        </div>
        <LatestReview />
      </Box>
    </Box>
  );
};

export default Dashboard;
