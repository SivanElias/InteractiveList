import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useCallback, useState } from "react";
import { InteractiveList } from "../components";
import { Item, ValidationFunction } from "../types";

const meta: Meta<typeof InteractiveList> = {
  title: "Components/InteractiveList",
  component: InteractiveList,
  tags: ["autodocs"],
  argTypes: {
    onAddItem: { action: "added" },
    onEditItem: { action: "edited" },
    onDeleteItem: { action: "deleted" },
    onActivateEdit: { action: "edit activated" },
    onDeactivateEdit: { action: "edit deactivated" },
  },
  args: {
    onAddItem: fn(),
    onEditItem: fn(),
    onDeleteItem: fn(),
    onActivateEdit: fn(),
    onDeactivateEdit: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveListWrapper = (args: any) => {
  const [items, setItems] = useState<Item[]>([]);

  // /**example for async validation function */
  // const validation = useCallback(async (value: string): Promise<boolean> => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       if (value === "sss") resolve(false);
  //       else resolve(true);
  //     }, 1000);
  //   });
  // }, []);

  const handleSubmitItem = useCallback(async (newValue: string) => {
    setItems((prevItems) => [
      ...prevItems,
      { id: String(prevItems.length + 1), value: newValue },
    ]);
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
      {...args}
      items={items}
      //   validationFunction={regexPattern}
      onAddItem={handleSubmitItem}
      onEditItem={handleEditItem}
      onDeleteItem={handleDeleteItem}
      onActivateEdit={activateItemEditing}
      onDeactivateEdit={deactivateItemEditing}
    />
  );
};

// Story definition
export const AsyncValidation: Story = {
  render: (args) => <InteractiveListWrapper {...args} />,
  args: {
    title: "Interactive List",
    emptyMessage: "No items available.",
    inputPlaceholder: "Please enter item name. (Note: 'sivan' is not allowed).",
    error: false,
    readonly: false,
    validationFunction: async (value: string): Promise<boolean> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (value === "sivan") resolve(false);
          else resolve(true);
        }, 1000);
      });
    },
  },
};

// Story definition
export const SyncValidation: Story = {
  render: (args) => <InteractiveListWrapper {...args} />,
  args: {
    title: "Interactive List",
    emptyMessage: "No items available.",
    inputPlaceholder: "Please enter item name. (Note: 'hello' is not allowed)",
    error: false,
    readonly: false,
    validationFunction: ((value: string) =>
      value !== "hello") as ValidationFunction,
  },
};

// Story definition
export const RegexValidation: Story = {
  render: (args) => <InteractiveListWrapper {...args} />,
  args: {
    title: "Interactive List",
    emptyMessage: "No site added yet.",
    inputPlaceholder:
      "(e.g: www.<whatever>.com/) use Enter or + to add it to list",
    error: false,
    readonly: false,
    validationFunction: /^www\.[A-Za-z0-9-]{2,}\.com$/ as ValidationFunction,
  },
};
