import { defaultTheme } from "react-admin";
import { createTheme } from "@mui/material";
import { red, pink, indigo, amber, deepPurple } from "@mui/material/colors";

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
