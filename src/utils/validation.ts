import { isPromise, ValidationFunction } from "../types";

export const validate = async (
  value: string,
  validationFunction: ValidationFunction
): Promise<boolean> => {
  // Check if it's a RegExp
  if (validationFunction instanceof RegExp) {
    return validationFunction.test(value); // Use .test for regex validation (sync)
  }

  // Call the validation function and check if it returns a Promise
  const result = validationFunction(value);

  if (isPromise(result)) {
    const res = await result;
    return res;
  }

  return result;
};
