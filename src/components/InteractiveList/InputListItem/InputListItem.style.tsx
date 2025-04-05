import { ListItem, styled } from "@mui/material";

export const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "error" && prop !== "border", // Exclude `hiddenByDefault` from being forwarded to the DOM
})<{ error?: boolean; border?: boolean }>(({ error, border }) => ({
  ...(border &&{
      borderBottom: "1px solid grey",
    }),
  ...(error && {
    border: "1px solid red",
  }),
}));
