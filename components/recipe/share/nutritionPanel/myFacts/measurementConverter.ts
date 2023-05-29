const gramToPound = 0.00220462;
const gramToLitter = 0.001;

export const measurementConverter = (
  category: string = "",
  totalConsumptionInGram: number = 0,
): { amount: number; measurement: string } => {
  let amount;
  switch (category) {
    case "Liquid":
      amount = (totalConsumptionInGram * gramToLitter).toFixed(2);
      return {
        amount,
        measurement: "L",
      };

    default:
      amount = (totalConsumptionInGram * gramToPound).toFixed(2);
      return {
        amount,
        measurement: "LB",
      };
  }
};
