import { ReviewSchema, z } from "@ecommerce/validation";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { Loading, useGetList } from "react-admin";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { format, parseISO } from "date-fns";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export type Review = z.infer<typeof ReviewSchema>;

function LatestReview() {
  const { data: ReviewsData, isLoading: ReviewLoading } = useGetList<
    {
      id: string;
    } & Review
  >("reviews", {
    pagination: {
      page: 1,
      perPage: 15,
    },
    filter: {
      approved: false,
    },
    sort: {
      field: "createdAt",
      order: "-1",
    },
  });
  if (ReviewLoading) return <Loading loadingPrimary="Loading Reviews" />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Typography component="h2" fontSize="3rem">
        Latest Unapproved Review
      </Typography>
      <List sx={{ width: "100%", minWidth: 800, bgcolor: "background.paper" }}>
        {ReviewsData?.map((item) => (
          <>
            <ListItem
              alignItems="flex-start"
              button
              component={Link}
              to={`/review/${item._id}`}
            >
              <ListItemText
                primary={
                  typeof item.user === "string" ? item.user : item.user.name
                }
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {format(parseISO(item.createdAt), "yyyy-MM-dd' 'HH:mm")}
                    </Typography>
                  </>
                }
              />
              <ListItemText primary={item.comment} />
            </ListItem>
          </>
        ))}
        <Box
          sx={{
            flex: 1,
            m: 5,
          }}
        />
        <Link to="/reviews">
          <Button variant="contained" endIcon={<SendIcon />}>
            More Reviews
          </Button>
        </Link>
      </List>
    </Box>
  );
}

export default LatestReview;
