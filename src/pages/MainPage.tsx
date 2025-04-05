import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { InteractiveList } from "../components";
import {
  INTERACTIVE_LIST_EMPTY_MESSEGE,
  INTERACTIVE_LIST_INPUT_PLACEHOLDER,
  INTERACTIVE_LIST_TITLE,
} from "../constants";
import { Item } from "../types";

//   const regexPattern = /^www\.[A-Za-z0-9-]{2,}\.com$/; // example for regex validation

export default function MainPage() {
  const [items, setItems] = useState<Item[]>([]);

  /**example for async validation function */
  const validation = useCallback(async (value: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (value === "sss") resolve(false);
        else resolve(true);
      }, 1000);
    });
  }, []);

  const handleSubmitItem = useCallback(async (newValue: string) => {
    setItems((prevItems) => [...prevItems, { id: uuidv4(), value: newValue }]);
  }, []);

  const handleEditItem = useCallback(
    async (itemId: string, newValue: string) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId
            ? { id: item.id, value: newValue, editMode: false }
            : item
        )
      );
    },
    []
  );

  const handleDeleteItem = useCallback((itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }, []);

  const activateItemEditing = useCallback((itemId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, editMode: true } : item
      )
    );
  }, []);

  const deactivateItemEditing = useCallback((itemId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, editMode: false } : item
      )
    );
  }, []);

  return (
    <InteractiveList
      items={items}
      title={INTERACTIVE_LIST_TITLE}
      emptyMessage={INTERACTIVE_LIST_EMPTY_MESSEGE}
      inputPlaceholder={INTERACTIVE_LIST_INPUT_PLACEHOLDER}
      validationFunction={validation}
      //   validationFunction={regexPattern}
      onAddItem={handleSubmitItem}
      onEditItem={handleEditItem}
      onDeleteItem={handleDeleteItem}
      onActivateEdit={activateItemEditing}
      onDeactivateEdit={deactivateItemEditing}
    />
  );
}
