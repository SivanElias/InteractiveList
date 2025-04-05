import ListItemText from "@mui/material/ListItemText";
import { StyledListItem } from "./InteractiveListItem.style";
import { ButtonMenu } from "../ButtonMenu";
import { Item } from "../../../types";

type InteractiveListItemProps = {
  id: Item["id"];
  value: Item["value"];
  onDelete: (itemId: Item["id"]) => void;
  onEdit: (itemId: Item["id"]) => void;
};
export function InteractiveListItem({
  id,
  value,
  onDelete,
  onEdit,
}: InteractiveListItemProps) {
  const buttonMenuClass = "buttonMenu"; // Dynamic class name

  return (
    <StyledListItem
      key={id}
      secondaryAction={
        <ButtonMenu
          onDelete={() => onDelete(id)}
          onEdit={() => onEdit(id)}
          className={buttonMenuClass}
          hiddenByDefault
        ></ButtonMenu>
      }
      buttonMenuClass={buttonMenuClass}
    >
      <ListItemText primary={value} />
    </StyledListItem>
  );
}
