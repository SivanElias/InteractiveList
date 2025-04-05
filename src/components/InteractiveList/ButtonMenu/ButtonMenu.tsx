// import * as React from "react";
import { Divider, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { StyledBox } from "./ButtonMenu.style";

type ButtonMenuProps = {
  onDelete: () => void;
  onEdit: () => void;
  className?: string;
  hiddenByDefault?: boolean;
};

export const ButtonMenu = ({
  onDelete,
  onEdit,
  className,
  hiddenByDefault,
}: ButtonMenuProps) => {
  return (
    <StyledBox className={className} hiddenByDefault={hiddenByDefault}>
      <IconButton aria-label="delete" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
      <Divider orientation="vertical" variant="middle" flexItem />
      <IconButton aria-label="edit" onClick={onEdit}>
        <EditIcon />
      </IconButton>
    </StyledBox>
  );
};
