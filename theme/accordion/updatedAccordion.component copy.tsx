import React, { memo } from "react";
import AccordComponent from "./accordComponent.component";

type CustomAccordionProps = {
  title: string;
  content?: any;
  type?: string;
  counter?: number;
  dailyGoalsData: string;
  servingSize?: number;
  sinngleIngQuintity?: number;
  disabled?: undefined | boolean;
  link?: undefined | null | string;
};

const UpdatedCustomAccordion = ({
  title,
  content,
  type,
  counter = 1,
  dailyGoalsData,
  servingSize = 1,
  sinngleIngQuintity = 1,
  disabled = undefined,
  link = undefined,
}: CustomAccordionProps) => {
  if (dailyGoalsData) {
    dailyGoalsData = JSON?.parse(dailyGoalsData) || {};
  }

  const calculateDailyPercentage = (
    recipeNutrientValue: number,
    dailyGoals: number,
  ) => {
    return Math?.round(
      ((100 / dailyGoals) *
        recipeNutrientValue *
        counter *
        sinngleIngQuintity) /
        servingSize,
    );
  };

  const populateAccordionData = (childrenFelid: any, firstChild: boolean) => {
    return (
      childrenFelid &&
      Object?.entries(childrenFelid)?.map((itm: any, index) => {
        const dailyDosePercentage: any =
          dailyGoalsData?.[itm[1]?.blendNutrientRefference?._id];
        const dailyGoals = dailyDosePercentage?.goal
          ? parseFloat(dailyDosePercentage?.goal)
          : parseFloat(dailyDosePercentage?.dri);
        const value = itm[1];

        if (itm[1]?.childs && Object.keys(itm[1]?.childs)?.length > 0) {
          if (firstChild) {
            return (
              <div key={itm[0] + Date.now()}>
                <AccordComponent
                  title={itm[0]}
                  plusMinusIcon={true}
                  value={itm[1]?.value}
                  unit={itm[1]?.blendNutrientRefference?.units}
                  percentage={
                    dailyDosePercentage
                      ? `${calculateDailyPercentage(
                          parseFloat(itm[1]?.value),
                          dailyGoals,
                        )}%`
                      : ""
                  }
                  counter={counter}
                  sinngleIngQuintity={sinngleIngQuintity}
                  nutritionId={itm[1]?.blendNutrientRefference?._id}
                  servingSize={servingSize}
                  showChildren={itm[1]?.blendNutrientRefference?.showChildren}
                  disabled={value?.disabled}
                  link={value?.link}
                >
                  {populateAccordionData(itm[1]?.childs, false)}
                </AccordComponent>
              </div>
            );
          } else {
            return (
              <div style={{ marginLeft: "18px" }} key={itm[0] + Date.now()}>
                <AccordComponent
                  title={itm[0]}
                  plusMinusIcon={true}
                  value={itm[1]?.value}
                  unit={itm[1]?.blendNutrientRefference?.units}
                  percentage={
                    dailyDosePercentage
                      ? `${calculateDailyPercentage(
                          parseFloat(itm[1]?.value),
                          dailyGoals,
                        )}%`
                      : ""
                  }
                  counter={counter}
                  sinngleIngQuintity={sinngleIngQuintity}
                  nutritionId={itm[1]?.blendNutrientRefference?._id}
                  servingSize={servingSize}
                  showChildren={itm[1]?.blendNutrientRefference?.showChildren}
                  disabled={value?.disabled}
                  link={value?.link}
                >
                  {populateAccordionData(itm[1]?.childs, false)}
                </AccordComponent>
              </div>
            );
          }
        } else {
          if (firstChild) {
            return (
              <div key={itm[0] + Date.now()}>
                <AccordComponent
                  title={itm[0]}
                  plusMinusIcon={false}
                  value={itm[1]?.value}
                  unit={itm[1]?.blendNutrientRefference?.units}
                  percentage={
                    dailyDosePercentage
                      ? `${calculateDailyPercentage(
                          parseFloat(itm[1]?.value),
                          dailyGoals,
                        )}%`
                      : ""
                  }
                  counter={counter}
                  sinngleIngQuintity={sinngleIngQuintity}
                  nutritionId={itm[1]?.blendNutrientRefference?._id}
                  servingSize={servingSize}
                  showChildren={itm[1]?.blendNutrientRefference?.showChildren}
                  disabled={value?.disabled}
                  link={value?.link}
                />
              </div>
            );
          } else {
            return (
              <div style={{ marginLeft: "18px" }} key={itm[0] + Date.now()}>
                <AccordComponent
                  title={itm[0]}
                  plusMinusIcon={false}
                  value={itm[1]?.value}
                  unit={itm[1]?.blendNutrientRefference?.units}
                  percentage={
                    dailyDosePercentage
                      ? `${calculateDailyPercentage(
                          parseFloat(itm[1]?.value),
                          dailyGoals,
                        )}%`
                      : ""
                  }
                  counter={counter}
                  sinngleIngQuintity={sinngleIngQuintity}
                  nutritionId={itm[1]?.blendNutrientRefference?._id}
                  servingSize={servingSize}
                  showChildren={itm[1]?.blendNutrientRefference?.showChildren}
                  disabled={value?.disabled}
                  link={value?.link}
                />
              </div>
            );
          }
        }
      })
    );
  };

  return (
    content && (
      <AccordComponent
        title={title}
        type={type}
        counter={counter}
        key={title + Date.now()}
        servingSize={servingSize}
        sinngleIngQuintity={sinngleIngQuintity}
        disabled={disabled}
        link={link}
      >
        {populateAccordionData(content, true)}
      </AccordComponent>
    )
  );
};

export default memo(UpdatedCustomAccordion);
