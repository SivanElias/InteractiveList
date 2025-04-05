import { ListItem, styled } from "@mui/material";

export const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "buttonMenuClass", // Exclude `hiddenByDefault` from being forwarded to the DOM
})<{ buttonMenuClass: string }>(({ buttonMenuClass }) => ({
  "&:hover": {
    backgroundColor: "lightcyan", // Change the color to your desired one
  },
  [`&:hover .${buttonMenuClass}`]: {
    visibility: "inherit",
    opacity: 1,
  },
}));
