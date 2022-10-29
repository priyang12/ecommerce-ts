import * as React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { ListItemSecondaryAction, Box } from "@mui/material";
import { format, parseISO } from "date-fns";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function LatestOrder({ data }: any) {
  return (
    <>
      <Typography
        sx={{ flex: "1 1 100%" }}
        color="inherit"
        variant="subtitle1"
        component="h2"
      >
        Recent Orders
      </Typography>

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {data?.map((record: any) => (
          <>
            <ListItem
              alignItems="flex-start"
              button
              component={Link}
              to={`/orders/${record._id}`}
            >
              <ListItemAvatar>
                <Avatar
                  alt={record.user.name}
                  src="/static/images/avatar/1.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary={record.user.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {format(parseISO(record.createdAt), "yyyy-MM-dd' 'HH:mm")}
                    </Typography>
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction
                sx={{
                  display: "flex",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    marginRight: "1em",
                    color: "text.primary",
                  }}
                >
                  {record.totalPrice}$
                </Box>
                <Box>{record.isDelivered ? <CheckIcon /> : <CloseIcon />}</Box>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    </>
  );
}

export default LatestOrder;
