import { Identifier, useTheme } from "react-admin";
import { Review } from "../Dashboard/LatestReview";
import { red, green } from "@mui/material/colors";
import { Theme } from "../../Theme";

export const rowStyle = (selectedRow?: Identifier) => (record: Review) => {
  let style = {};
  if (!record) {
    return style;
  }
  if (selectedRow && selectedRow === record._id) {
    style = {
      ...style,
      backgroundColor: Theme.palette.primary[700],
    };
  }
  if (record.approved)
    return {
      ...style,
      borderLeftColor: green[500],
      borderLeftWidth: 5,
      borderLeftStyle: "solid",
    };

  if (!record.approved)
    return {
      ...style,
      borderLeftColor: red[500],
      borderLeftWidth: 5,
      borderLeftStyle: "solid",
    };
  return style;
};
