import React from "react";
import CustomAccordion from "../../theme/accordion/accordionCopy.component";

interface recursiveAccordianInterface {
  dataObject: object;
}

const RecursiveAccordian = ({ dataObject }: recursiveAccordianInterface) => {
  dataObject;

  const populateAccordian = (data) => {
    return Object.entries(data).map((entries, index) => {
      return (
        <div key={`${entries}`}>
          {/* @ts-ignore */}
          {Object.keys(entries[1].children).length !== 0 ? (
            <CustomAccordion title={entries[0]} dataObject={entries}>
              {/* @ts-ignore */}
              {populateAccordian(entries[1]?.children)}
            </CustomAccordion>
          ) : (
            //@ts-ignore
            entries[1].value && (
              <CustomAccordion
                title={entries[0]}
                iconRight={false}
                plusMinusIcon={false}
                dataObject={entries}
                //@ts-ignore
                value={entries[1]?.value}
                //@ts-ignore
                unit={entries[1]?.Unit}
              />
            )
          )}
        </div>
      );
    });
  };
  return (
    <div>
      {dataObject ? (
        Object.entries(dataObject).map((entries, index) => {
          return (
            <CustomAccordion key={`${entries}`} title={entries[0]}>
              {populateAccordian(entries[1])}
            </CustomAccordion>
          );
        })
      ) : (
        <div>
          <CustomAccordion title={"Energy"} />
          <CustomAccordion title={"Vitamins"} />
          <CustomAccordion title={"Minerals"} />
        </div>
      )}
    </div>
  );
};
export default RecursiveAccordian;
