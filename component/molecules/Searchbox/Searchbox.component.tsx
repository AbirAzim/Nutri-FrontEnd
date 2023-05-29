import { faSearch, faTimes } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { InputHTMLAttributes, useRef } from "react";
import styles from "./Searchbox.module.scss";

interface SearchboxProps
  extends React.DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLDivElement
  > {
  onReset: () => void;
}

const Searchbox = (props: SearchboxProps) => {
  const { value, onChange, onReset, ...inputProps } = props;
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasQuery = value !== "";
  const handleReset = () => {
    document.body.focus();
    // inputWrapperRef.current.blur();
    // inputWrapperRef.current.classList.add(styles.reset);
  };
  return (
    <div className={styles.search}>
      <div
        ref={inputWrapperRef}
        className={styles["search-container"]}
        {...inputProps}
      >
        <input
          ref={inputRef}
          placeholder="Search"
          type="text"
          className={styles.input}
          value={value}
          onChange={onChange}
        />
        <button
          className={styles.button}
          onClick={() => {
            hasQuery && onReset();
            handleReset();
          }}
        >
          <FontAwesomeIcon icon={hasQuery ? faTimes : faSearch} />
        </button>
      </div>
    </div>
  );
};

export default Searchbox;
