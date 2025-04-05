import { ListItem, ListItemText, ListSubheader } from "@mui/material";
import { memo, useCallback } from "react";
import { Item, ValidationFunction } from "../../types";
import { validate } from "../../utils/validation";
import { StyledList } from "./InteractiveList.style";
import {
  InteractiveListItem,
  InputListItem,
  EmptyMessage,
} from "../InteractiveList";

const MemoizedInteractiveListItem = memo(InteractiveListItem);
const MemoizedInputListItem = memo(InputListItem);

type InteractiveListProps = {
  title: string;
  items: Item[];
  emptyMessage: string;
  inputPlaceholder: string;
  error?: boolean;
  readonly?: boolean;
  validationFunction: ValidationFunction;
  onAddItem: (value: string) => void;
  onEditItem: (itemId: string, value: string) => void;
  onDeleteItem: (itemId: string) => void;
  onActivateEdit: (itemId: string) => void;
  onDeactivateEdit: (itemId: string) => void;
};

export const InteractiveList = ({
  title,
  items,
  emptyMessage,
  inputPlaceholder,
  error,
  readonly,
  validationFunction,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onActivateEdit,
  onDeactivateEdit,
}: InteractiveListProps) => {
  const validateInput = useCallback(
    async (value: string) => {
      if (value === "") return false;
      try {
        const res = await validate(value, validationFunction);
        return res;
      } catch (e) {
        // handle error
        return false;
      }
    },
    [validationFunction]
  );

  const handleSubmitItem = useCallback(
    async (newValue: string) => {
      const isValid = await validateInput(newValue);
      if (isValid) {
        onAddItem(newValue);
        return true;
      }

      return false;
    },
    [validateInput, onAddItem]
  );

  const handleEditItem = useCallback(
    async (itemId: string, newValue: string) => {
      const isValid = await validateInput(newValue);

      if (isValid) {
        onEditItem(itemId, newValue);
        return true;
      }

      return false;
    },
    [validateInput, onEditItem]
  );

  return (
    <StyledList
      error={error}
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{ bgcolor: "darkblue", color: "white" }}
        >
          {title}
        </ListSubheader>
      }
    >
      {!readonly && (
        <MemoizedInputListItem
          id="new-item"
          placeholder={inputPlaceholder}
          initialValue=""
          onSave={handleSubmitItem}
          saveIconOption="add"
          border
        />
      )}
      {items.length > 0 ? (
        items.map(({ id, value, editMode }) =>
          readonly ? (
            <ListItem key={id} id={id}>
              <ListItemText primary={value} />
            </ListItem>
          ) : editMode ? (
            <MemoizedInputListItem
              key={id}
              id={id}
              initialValue={value}
              onSave={(newValue) => handleEditItem(id, newValue)}
              saveIconOption="check"
              onClickAwayItem={() => onDeactivateEdit(id)}
            />
          ) : (
            <MemoizedInteractiveListItem
              key={id}
              id={id}
              value={value}
              onEdit={onActivateEdit}
              onDelete={onDeleteItem}
            />
          )
        )
      ) : (
        <EmptyMessage message={emptyMessage} />
      )}
    </StyledList>
  );
};
