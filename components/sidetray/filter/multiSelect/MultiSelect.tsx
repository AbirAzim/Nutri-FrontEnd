import React, { useEffect, useRef, useState } from "react";
import fuzzySearch from "../../../utility/fuzzySearch";
import CheckCircle from "../../../../public/icons/check_circle_black_24dp.svg";
import { IoSearchOutline } from "react-icons/io5";
// import Chips, { Chip } from '../../atoms/chips/Chips.component';
// import Icon from '../../atoms/icon/Icon.component';

import styles from "./MaltiSelect.module.scss";

const defaultState = (items: any[]) => {
  const defaultState: any = {};
  items &&
    items.forEach((item) => {
      defaultState[item] = "";
    });
  return defaultState;
};

interface MultiselectProps {
  categories?: string[];
  variant?: "inline" | "block";
  setCategories?: any;
  options: any[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  values?: any[];
  onSelect?: any;
  onDelete?: any;
}

const Multiselect = (props: MultiselectProps) => {
  const {
    label,
    placeholder,
    required,
    variant,
    options,
    onSelect,
    onDelete,
    values,
  } = props;
  // const [categories, setCategories] = useState([]);
  const [productCodes, setProductCodes] = useState<string[]>(options);
  const [suggestions, setSuggestions] = useState<any>(defaultState(options));
  const [showSuggestion, setShowSuggestion] = useState(false);

  const [category, setCategory] = useState("");

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowSuggestion(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const onChangeHandler = (e: any) => {
    setCategory(e.target.value);

    const searchLists: any = {};
    setShowSuggestion(true);
    productCodes.forEach((product) => {
      const value = fuzzySearch(product, e.target.value);
      if (value) searchLists[product] = value;
    });
    setSuggestions(searchLists);
  };

  // const onSaveHandler = (event: any) => {
  //   if (event.key === 'Enter') {
  //     const newCategories = [...categories, category];
  //     const productCodeList = [...productCodes, category];

  //     setCategory('');
  //     setCategories(newCategories);
  //     setProductCodes(productCodeList);

  //     setSuggestions(defaultState(productCodeList));
  //   }
  // };

  return (
    <div className={styles.field}>
      {label && (
        <label className={required ? styles.required : ""}>{label}</label>
      )}
      <div
        className={`${styles.field} ${styles.pCode}`}
        style={{ position: "relative" }}
        ref={ref}
      >
        <div className={`${variant ? "flex" : ""}`}>
          <div className={styles.pCode__input_field}>
            <IoSearchOutline className={styles.pCode__search_icon} />
            <input
              type="text"
              className={`${styles["custom-input"]}`}
              placeholder={placeholder}
              value={category}
              onClick={() => setShowSuggestion(true)}
              onChange={onChangeHandler}
            />
            <ul
              className={`${styles.pCode__searchList} y-scroll`}
              style={{ display: showSuggestion ? "block" : "none" }}
            >
              {Object.keys(suggestions).map((suggestion: any) => (
                <li
                  key={suggestion}
                  className={styles.pCode__searchItem}
                  dangerouslySetInnerHTML={{
                    __html: suggestions[suggestion] || suggestion,
                  }}
                  onClick={() => {
                    if (values?.indexOf(suggestion) === -1)
                      onSelect && onSelect(suggestion);
                    setShowSuggestion(false);
                  }}
                />
              ))}
            </ul>
          </div>
          <div className={styles.optionSelectContainer}>
            <div className={styles.options}>
              {values?.length
                ? values?.map((item, index) => {
                    const isSelected = values.includes(item);
                    return (
                      <div
                        className={`${styles.signleItem} ${
                          isSelected ? styles.selected : ""
                        }`}
                        key={index}
                        onClick={() => onSelect(item)}
                      >
                        <span>{item}</span>
                        {isSelected && (
                          <div className={styles.tick}>
                            <CheckCircle className={styles.ticked} />
                          </div>
                        )}
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Multiselect;
