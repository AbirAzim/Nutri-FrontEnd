import React from "react";
import { FormProvider } from "react-hook-form";
import Textarea from "../../organisms/Forms/Textarea.component";
import Textfield from "../../organisms/Forms/Textfield.component";

export const defaultPlan = {
  planName: "",
  description: "",
};

const PlanForm = ({ methods }) => {
  return (
    <FormProvider {...methods}>
      <div style={{ background: "#fff", padding: "20px 10px 10px" }}>
        <Textfield name="planName" placeholder="Plan Name" className="mb-10" />
        <Textarea name="description" placeholder="Plan Description" />
      </div>
      <div style={{ height: 10, backgroundColor: "#f8f8f8" }} />
    </FormProvider>
  );
};

export default PlanForm;
