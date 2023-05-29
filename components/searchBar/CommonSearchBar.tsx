import React, {
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  FormEvent,
  ReactNode,
  CSSProperties,
} from "react";
import classes from "./SearchBar.module.scss";
import { FiFilter } from "react-icons/fi";
import { BsMic, BsSoundwave, BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import useOnClickOutside from "../utility/useOnClickOutside";
import Tooltip from "../../theme/toolTip/CustomToolTip";

interface SearchBarProps {
  input?: string;
  setInput?: Dispatch<SetStateAction<string>>;
  //handleCleanSearch?: () => void;
  handleSearchTagCleanFunc?: () => void;
  openPanel?: () => void;
  handleSubmitFunc?: () => void;
  isSearchTag?: boolean;
  isOpenPanel?: boolean;
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  styles?: CSSProperties;
}

interface CompareButtonProps {
  icon?: string | ReactNode;
  text?: string | number;
  disable?: boolean;
  handleClick?: () => void;
  style?: CSSProperties;
}

const CommonSearchBar = ({
  input = "",
  setInput = () => {},
  handleSubmitFunc = () => {},
  handleSearchTagCleanFunc = () => {},
  openPanel = () => {},
  isOpenPanel = false,
  isSearchTag = false,
  handleOnChange = () => {},
  styles = {},
}: SearchBarProps) => {
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useOnClickOutside(inputRef, () => {
    setIsSubmit(false);
    setIsInputFocus(false);
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input) {
      setIsSubmit(true);
      handleSubmitFunc();
    }
  };

  const handleClean = () => {
    setInput("");
    setIsSubmit(false);
    setIsInputFocus(false);
    // inputRef?.current?.focus();
  };

  const handleSearchTagClean = () => {
    handleSearchTagCleanFunc();
    setIsSubmit(false);
    setIsInputFocus(false);
  };

  return (
    <div className={classes.inputContainer} ref={inputRef} style={styles}>
      <div
        className={classes.filterIconContainer}
        // style={isOpenPanel ? { marginRight: "10px", paddingRight: "20px" } : {}}
      >
        <FiFilter
          className={`${classes.filterIcon} ${
            isOpenPanel
              ? classes.filterIconNotVisible
              : classes.filterIconVisible
          } ${isOpenPanel ? classes.active : ""}`}
          onClick={openPanel}
        />
      </div>
      <div className={classes.inputBox}>
        {isInputFocus ? null : isMicOn ? (
          <BsSoundwave className={classes.waveIcon} />
        ) : (
          <BsSearch className={classes.seachIcon} />
        )}
        <form onSubmit={handleSubmit}>
          <input
            // style={isOpenPanel ? { width: "30vw", minWidth: "200px" } : {}}
            disabled={isMicOn}
            placeholder={isMicOn ? "Speak" : "Search"}
            value={input}
            onChange={(e) => handleOnChange(e)}
            onFocus={() => setIsInputFocus(true)}
          />
        </form>

        {isSubmit ? (
          <AiOutlineClose
            className={classes.seachIconActive}
            onClick={handleClean}
          />
        ) : isInputFocus ? (
          <BsSearch
            className={`${classes.seachIconActive}`}
            onClick={(e) => {
              e.stopPropagation();
              if (input) {
                setIsSubmit(true);
              }
            }}
          />
        ) : (
          <>
            {isSearchTag ? (
              <AiOutlineClose
                className={classes.seachIconActive}
                onClick={handleSearchTagClean}
              />
            ) : (
              <Tooltip direction="bottom" content="Voice search">
                <BsMic
                  className={`${classes.mic} ${isMicOn ? classes.active : ""}`}
                  onClick={() => setIsMicOn(!isMicOn)}
                />
              </Tooltip>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommonSearchBar;
