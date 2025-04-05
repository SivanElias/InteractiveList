import { Add, Check, ReportGmailerrorred } from "@mui/icons-material";
// import CheckIcon from "@mui/icons-material/Check";
// import { CircularProgress } from "@mui/material";
import "../../../styles/spinner.css";

export type IconType = "loading" | "error" | "save";

export type SaveIconType = "add" | "check";

type IconSwitcherProps = {
  iconType: IconType;
  saveIconOption?: SaveIconType;
};

export const IconSwitcher = ({
  iconType,
  saveIconOption,
}: IconSwitcherProps) => {
  switch (iconType) {
    case "loading":
      return <div className="spinner" />;
    case "error":
      return <ReportGmailerrorred color="error" />;
    default:
      switch (saveIconOption) {
        case "add":
          return <Add />;
        case "check":
          return <Check />;
        default:
          return <Add />;
      }
  }
};
