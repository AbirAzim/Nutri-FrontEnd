import React, { useRef, useEffect, useState, Fragment, useMemo } from "react";
import Image from "next/image";
import {
  FaChevronLeft,
  FaEdit,
  FaEllipsisH,
  FaPen,
  FaPlus,
  FaRegTrashAlt,
} from "react-icons/fa";
import IconButton from "../../../atoms/Button/IconButton.component";
import Textfield from "../../../organisms/Forms/Textfield.component";
import ToggleMenu from "../../../organisms/Tabmenu/ToggleMenu.component";
// import GroceryComponent from "./grocery/Grocery.component";
import styles from "./Panel.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { FormProvider, useForm } from "react-hook-form";
import Publish from "../../../../helpers/Publish";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  ADD_GROCERY_ITEM,
  ADD_PANTRY_ITEM,
  DELETE_CART_ITEM,
  GET_CART_DATA,
  SEARCH_INGREDIENTS_FOR_GROCERY,
} from "../../../../graphql/Cart";
import {
  addGroceries,
  addGrocery,
  addPantries,
  addPantry,
  addStaple,
  addStaples,
  deleteCartIngredients,
} from "../../../../redux/slices/Cart.slice";
import SearchPanel, { defaultGrocery } from "./_SearchPanel";
import ItemList from "./_ItemList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faBagShopping,
  faCartShopping,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faRefrigerator } from "@fortawesome/pro-solid-svg-icons";
import TrayWrapper from "../../../../components/sidetray/TrayWrapper";
import TrayTag from "../../../../components/sidetray/TrayTag";

interface CartPanelProps {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}

function CartPanel({ showPanle, showTagByDefaut }: CartPanelProps) {
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(1);

  const handleClick = () => {
    setOpen(() => !open);
  };

  return (
    <TrayWrapper
      showTagByDefaut={showTagByDefaut}
      closeTray={handleClick}
      openTray={open}
      showPanle={showPanle}
      panleTag={(hover) => (
        <TrayTag
          icon={<FontAwesomeIcon icon={faCartShopping} />}
          placeMent="left"
          hover={hover}
        />
      )}
    >
      <div>
        <ToggleMenu
          toggleState={[toggle, setToggle]}
          menu={[
            { label: "Grocery", icon: faCartShopping },
            { label: "Shopping", icon: faBagShopping },
          ]}
        />
        {toggle === 1 && <GroceryPanel />}
        {toggle === 2 && <ShoppingPanel />}
      </div>
    </TrayWrapper>
  );
}

const GroceryPanel = () => {
  const [toggle, setToggle] = useState<1 | 2>(1);
  const [checkedGroceries, setCheckedGroceries] = useState<string[]>([]);
  const [checkedPantries, setCheckedPantries] = useState<string[]>([]);
  const [checkedStaples, setCheckedStaples] = useState<string[]>([]);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"query" | "quantity">("query");
  const [isStaple, setIsStaple] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<any>({});

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const { groceries, pantries, staples } = useAppSelector(
    (state) => state.cart,
  );

  const methods = useForm({
    defaultValues: useMemo(() => defaultGrocery, []),
  });

  const { data } = useQuery(GET_CART_DATA, {
    variables: { userId },
    skip: userId === "",
  });
  const [deleteCartItem, deleteState] = useMutation(DELETE_CART_ITEM);

  const deleteItem = async (ids: string[], isStaples?: boolean) => {
    const variables = {
      userId: userId,
      groceries: toggle === 1 ? ids : [],
      pantries: toggle === 2 && !isStaples ? ids : [],
      staples: toggle === 2 && isStaples ? ids : [],
    };
    await Publish({
      mutate: deleteCartItem,
      variables: variables,
      state: deleteState,
      success: `Deleted ${toggle === 1 ? "Grocery" : "Pantry"} Successfully`,
      onSuccess: () => {
        dispatch(
          deleteCartIngredients({
            ingredients: variables,
          }),
        );
      },
    });
  };

  const deleteItems = async () => {
    const variables = {
      userId: userId,
      groceries: checkedGroceries,
      pantries: checkedPantries,
      staples: checkedStaples,
    };
    await Publish({
      mutate: deleteCartItem,
      variables: variables,
      state: deleteState,
      success: `Deleted ${toggle === 1 ? "Grocery" : "Pantry"} Successfully`,
      onSuccess: () => {
        dispatch(
          deleteCartIngredients({
            ingredients: variables,
          }),
        );
      },
    });
  };

  const openEditPanel = (item, isStaple) => {
    methods.reset({
      ammount: item.quantity,
      units: item.selectedPortion,
    });

    setOpen(true);
    setMode("quantity");

    const ingredient = {
      id: item?.ingredientId?._id,
      ingredientName: item?.ingredientId?.ingredientName,
      featuredImage: item?.ingredientId?.featuredImage,
      portions: item?.ingredientId?.portions || [],
    };
    setSelectedIngredient(ingredient);
    setIsEditMode(true);
    if (isStaple) {
      setIsStaple(true);
    } else {
      setIsStaple(false);
    }
  };

  useMemo(() => {
    if (data?.getMyGroceryList) {
      dispatch(addGroceries(data?.getMyGroceryList));
    }
    if (data?.getPantryList) {
      dispatch(addPantries(data?.getPantryList));
    }
    if (data?.getStapleList) {
      dispatch(addStaples(data?.getStapleList));
    }
  }, [data, dispatch]);

  const items = useMemo(
    () =>
      toggle === 1
        ? Array.isArray(groceries)
          ? groceries
          : []
        : Array.isArray(pantries)
        ? pantries
        : [],
    [groceries, pantries, toggle],
  );

  const hasBatchDelete =
    toggle === 1 ? checkedGroceries.length > 0 : checkedPantries.length > 0;

  return (
    <Fragment>
      <div className="flex jc-between ai-center">
        <ToggleMenu
          toggleState={[toggle, setToggle]}
          width="8rem"
          menu={[{ icon: faListCheck }, { icon: faRefrigerator }]}
        />
        <div className="text-green" style={{ transform: "translateX(-7.5px)" }}>
          {toggle === 1 ? "List" : "Pantry"}
        </div>
        <div>
          <IconButton
            size="medium"
            fontName={faTrashCan}
            variant={hasBatchDelete ? "primary" : "disabled"}
            onClick={deleteItems}
          />
        </div>
      </div>
      <SearchPanel
        methods={methods}
        toggle={toggle}
        isEditModeState={[isEditMode, setIsEditMode]}
        isStapleState={[isStaple, setIsStaple]}
        openState={[open, setOpen]}
        modeState={[mode, setMode]}
        selectedIngredientState={[selectedIngredient, setSelectedIngredient]}
      />
      <div className={styles.ingredients}>
        <div className={styles.ingredients__header}>
          <h2>Ingredients</h2>
          <h2>Servings</h2>
        </div>
        <ItemList
          items={items}
          toggle={toggle}
          checkedGroceriesState={[checkedGroceries, setCheckedGroceries]}
          checkedPantriesState={[checkedPantries, setCheckedPantries]}
          checkedStaplesState={[checkedStaples, setCheckedStaples]}
          openEditPanel={openEditPanel}
          deleteItems={deleteItem}
        />
      </div>
      {toggle === 2 && (
        <div className={styles.staples}>
          <h2 className={styles.staples__header}>Staples</h2>
          <ItemList
            isStaples
            toggle={toggle}
            items={Array.isArray(staples) ? staples : []}
            checkedGroceriesState={[checkedGroceries, setCheckedGroceries]}
            checkedPantriesState={[checkedPantries, setCheckedPantries]}
            checkedStaplesState={[checkedStaples, setCheckedStaples]}
            openEditPanel={openEditPanel}
            deleteItems={deleteItem}
          />
        </div>
      )}
    </Fragment>
  );
};

const ShoppingPanel = () => {
  const [toggle, setToggle] = useState(1);
  return <div>Coming Soon... </div>;
};

export default CartPanel;
