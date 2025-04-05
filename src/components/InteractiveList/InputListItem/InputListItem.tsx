import {
  ClickAwayListener,
  IconButton,
  InputBase,
  SxProps,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Theme } from "@emotion/react";
import { IconSwitcher, IconType, SaveIconType } from "./IconSwitcher";
import { StyledListItem } from "./InputListItem.style";
import { Item } from "../../../types";

const getIconType = (isLoading: boolean, isError: boolean): IconType => {
  if (isLoading) {
    return "loading";
  } else if (isError) {
    return "error";
  } else {
    return "save";
  }
};

type InputListItemProps = {
  id: Item["id"];
  initialValue: Item["value"];
  onSave: (newValue: Item["value"]) => Promise<boolean>;
  onClickAwayItem?: () => void;
  placeholder?: string;
  saveIconOption?: SaveIconType;
  border?: boolean;
  sx?: SxProps<Theme>;
};

export function InputListItem({
  id,
  initialValue,
  onSave,
  onClickAwayItem,
  placeholder,
  saveIconOption,
  border,
  sx,
}: InputListItemProps) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleSubmit = async () => {
    if (inputValue === initialValue) return;
    setIsLoading(true);
    try {
      const isValid = await onSave(inputValue);
      if (isValid) {
        setInputValue(initialValue);
      }
      setIsError(!isValid);
    } catch (e) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const handleClickAway = () => {
    setInputValue(initialValue);
    setIsError(false);
    onClickAwayItem && onClickAwayItem();
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <StyledListItem
        sx={{
          ...sx,
        }}
        key={id}
        secondaryAction={
          <IconButton
            aria-label="check"
            onClick={handleSubmit}
            disabled={
              isLoading ||
              isError ||
              inputValue === "" ||
              inputValue === initialValue
            }
          >
            <IconSwitcher
              iconType={getIconType(isLoading, isError)}
              saveIconOption={saveIconOption}
            />
          </IconButton>
        }
        error={isError}
        border={border}
      >
        <InputBase
          id={`edit-item-${id}`}
          autoFocus
          sx={{ flex: 1 }}
          inputProps={{ "aria-label": "add item" }}
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
            setIsError(false);
          }}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
          placeholder={placeholder}
        />
      </StyledListItem>
    </ClickAwayListener>
  );
}
