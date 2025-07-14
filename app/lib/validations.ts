import { Rule } from "antd/lib/form";
import moment from "moment";
import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

export const textInputValidationRulesOp: Rule[] = [
  {
    required: false,
    message: "Please input a non-empty value",
    whitespace: true,
  },
];

export const generalValidationRules: Rule[] = [
  { required: true, message: "Field is required!" },
];

export const textInputValidationRules: Rule[] = [
  ...generalValidationRules,
  { whitespace: true },
];

export const numberInputValidationRules: Rule[] = [
  ...generalValidationRules,
  { type: "number" },
];

export const childrenAgeValidationRule = [
  {
    validator: (_: any, value: string) => {
      if (!value || value.trim() === "") return Promise.resolve();

      const ages = value.split(",").map((age) => age.trim());
      const allNumbers = ages.every((age) => /^\d+$/.test(age));

      if (!allNumbers) {
        return Promise.reject(
          new Error(
            "Please enter numbers only, separated by commas (e.g. 5,10)"
          )
        );
      }

      return Promise.resolve();
    },
  },
];

export const isDateGreaterThanOrEqualToCurrentDay = (date: Dayjs) => {
    if (!date) return false;
  
    const currentDate = dayjs().startOf("day");
    return date.isSameOrAfter(currentDate, "day");
  };

  export const dateRangeHasToBeGreaterThanOrEqualToCurrentDayRule: Rule = {
    validator: async (_, value: Dayjs[]) => {
      if (!value || value.length !== 2) {
        throw new Error("Please select arrival and departure dates");
      }
  
      const [start, end] = value;
  
      if (!isDateGreaterThanOrEqualToCurrentDay(start)) {
        throw new Error("Arrival date must be today or a future date");
      }
  
      if (!isDateGreaterThanOrEqualToCurrentDay(end)) {
        throw new Error("Departure date must be today or a future date");
      }
  
      return true;
    },
  };
  
  export const dateMustBeTodayOrFutureRule: Rule = {
    validator: (_, value: Dayjs) => {
      if (!value) {
        return Promise.reject(new Error("Please select a date"));
      }
  
      const today = dayjs().startOf("day");
      if (value.isSameOrAfter(today, "day")) {
        return Promise.resolve();
      }
  
      return Promise.reject(new Error("Date must be today or a future date"));
    },
  };