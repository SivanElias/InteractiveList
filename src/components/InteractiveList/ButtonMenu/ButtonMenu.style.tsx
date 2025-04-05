import { Box, styled } from "@mui/material";

export const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "hiddenByDefault", // Exclude `hiddenByDefault` from being forwarded to the DOM
})<{ hiddenByDefault?: boolean }>(({ hiddenByDefault }) => ({
  display: "inline-flex",
  alignItems: "center",
  bgcolor: "background.paper",
  color: "text.secondary",
  ...(hiddenByDefault && {
    visibility: "hidden", // hiden by default
    opacity: 0,
    transition: "opacity 0.3s ease-in-out",
  }),
}));
