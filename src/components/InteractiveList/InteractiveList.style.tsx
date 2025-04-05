import { List, styled } from "@mui/material";

export const StyledList = styled(List, {
  shouldForwardProp: (prop) => prop !== "error", // Exclude `hiddenByDefault` from being forwarded to the DOM
})<{ error?: boolean }>(({ error }) => ({
  width: "100%",
  maxWidth: 500,
  height: 250,
  bgcolor: "background.paper",
  border: "1px solid grey",
  ...(error && {
    border: "1px solid red",
  }),
  overflow: "auto",
}));
