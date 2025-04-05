import { Typography } from "@mui/material";
import { CenteredBox } from "./EmptyMessage.style";

type EmptyMessageProps = {
  message: string;
};

export const EmptyMessage = ({ message }: EmptyMessageProps) => {
  return (
    <CenteredBox>
      <Typography color="grey">{message}</Typography>
    </CenteredBox>
  );
};
