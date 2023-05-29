/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from "react";
import SectionTitleWithIcon from "../../theme/recipe/sectionTitleWithIcon/SectionTitleWithIcon.component";
import RecipeItem from "../../theme/recipe/recipeItem/RecipeItem.component";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Copyable(props) {
  const { items, addItem, droppableId } = props;

  return (
    <Droppable droppableId={droppableId} isDropDisabled={true}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {items.map((item, index) => {
            return (
              <Draggable draggableId={`${item.id}`} index={index} key={item.id}>
                {(provided, snapshot) => (
                  <>
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <RecipeItem item={item} handleClick={addItem} />
                    </div>
                    {snapshot.isDragging && (
                      <RecipeItem item={item} handleClick={addItem} />
                    )}
                  </>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const DragAndDrop = () => {
  const [winReady, setwinReady] = useState(false);
  const [inputVlaue, setInputValue] = useState("");

  const [newIngredientsList, setNewIngredientsList] = useState<{}[]>([]);

  const [existingIngredientsList, setexistingIngredientsList] = useState([
    [
      {
        id: 3,
        label: "1 Frozen Banana",
      },
      {
        id: 4,
        label: "1/2 half ripe Avocado (or 1/4 large)",
      },
    ],
    [
      {
        id: 5,
        label: "1 Frozen Banana",
      },
      {
        id: 6,
        label: "1/2 half ripe Avocado (or 1/4 large)",
      },
      {
        id: 7,
        label: "1/2 half ripe Avocado (or 1/4 large)",
      },
    ],
    [
      {
        id: 8,
        label: "1/2 scoop vanilla protein powder",
      },
      {
        id: 9,
        label: "1cup dairy free milk of your choice",
      },
    ],
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVlaue) {
      setNewIngredientsList((pre) => [
        ...pre,
        { label: inputVlaue, id: Date.now() },
      ]);
    }
  };

  const addItem = (value: object) => {
    /* @ts-ignore */

    const item = findItem(value?.id);
    if (!item) {
      setNewIngredientsList((pre) => [...pre, { ...value }]);
    }
  };

  const deleteItem = (id: number) => {
    const filterData = newIngredientsList?.filter(
      /* @ts-ignore */
      (item) => item?.id !== Number(id)
    );
    setNewIngredientsList([...filterData]);
  };

  useEffect(() => {
    setwinReady(true);
  }, []);

  const findItem = (id) => {
    /* @ts-ignore */
    const item = newIngredientsList?.find((item) => item?.id === id);
    if (item) {
      return true;
    } else {
      return false;
    }
  };

  const copy = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];
    destClone.splice(droppableDestination.index, 0, item);
    return destClone;
  };

  const onDragEnd = (result) => {
    console.log("dragging");
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId !== "droppable") {
      if (destination.droppableId === "droppable") {
        const id =
          existingIngredientsList[parseInt(source?.droppableId)][source?.index]
            ?.id;
        const item = findItem(id);

        if (!item) {
          setNewIngredientsList((state) =>
            copy(
              existingIngredientsList[parseInt(source.droppableId)],
              state,
              source,
              destination
            )
          );
        } else {
          return;
        }
      } else {
        return;
      }
    } else {
      if (source.droppableId === destination.droppableId) {
        setNewIngredientsList((state) =>
          reorder(state, source.index, destination.index)
        );
      } else {
        return;
      }
    }
  };

  const onDragStart = (result) => {
    const { source, destination } = result;
  };

  return (
    <>
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onBeforeDragStart={onDragStart}
      >
        <div className="compare-down-sec">
          <div className="addrecipe-fixed-container">
            <div className="brdr-wrp-compareitems">
              <SectionTitleWithIcon
                title="Ingredients"
                icon="/icons/right-blender.svg"
              />
              <div className="add-recipe-form  ingredients">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      value={inputVlaue}
                      onChange={(e) => setInputValue(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Enter, paste, add or drag ingredients"
                    />
                  </div>
                </form>

                <ul className="make-recipe-listing">
                  {winReady ? (
                    <Droppable droppableId="droppable">
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          //   isDraggingOver={snapshot.isDraggingOver}
                        >
                          {newIngredientsList?.map((item: any, index) => (
                            <div key={item?.id}>
                              <Draggable
                                key={item?.id}
                                draggableId={`${item?.id}`}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {/* @ts-ignore */}

                                    <RecipeItem
                                      item={item}
                                      plusIcon={false}
                                      deleteIcon={true}
                                      handleDelete={deleteItem}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            </div>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>

          <div className="formulate-compare-wrp" style={{ display: "flex" }}>
            {winReady
              ? existingIngredientsList?.map((list, index) => {
                  return (
                    <div
                      className="brdr-wrp-compareitems"
                      style={{ flexGrow: 1 }}
                      key={index}
                    >
                      <SectionTitleWithIcon
                        title="Ingredients"
                        icon="/icons/right-blender.svg"
                      />

                      <ul className="make-recipe-listing">
                        <Copyable
                          items={list}
                          addItem={addItem}
                          droppableId={`${index}`}
                        />
                      </ul>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default DragAndDrop;
