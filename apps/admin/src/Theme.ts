import { defaultTheme } from "react-admin";
import { createTheme } from "@mui/material";
import red from "@mui/material/colors/red";
import pink from "@mui/material/colors/pink";
import indigo from "@mui/material/colors/pink";
import amber from "@mui/material/colors/amber";
import deepPurple from "@mui/material/colors/deepPurple";

export const darkTheme = createTheme({
  palette: {
    primary: amber,
    secondary: deepPurple,
    mode: "dark",
    error: red,
  },
});

export const Theme = {
  ...defaultTheme,
  palette: {
    ...defaultTheme.palette,
    primary: indigo,
    secondary: pink,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  components: {
    ...defaultTheme.components,
    RaDatagrid: {
      styleOverrides: {
        root: {
          backgroundColor: "Lavender",
          "& .RaDatagrid-headerCell": {
            backgroundColor: "MistyRose",
          },
        },
      },
    },
  },
};
