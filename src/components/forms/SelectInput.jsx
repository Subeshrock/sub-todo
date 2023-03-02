import React from "react";
import {
  FormControl,
  FormLabel,
  Select,
  VStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

function SelectInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isInvalid={errors.category}>
      <VStack spacing={2} align="flex-start">
        <FormLabel htmlFor="category">Select Category</FormLabel>
        <Select
          id="category"
          placeholder="Select a Category"
          {...register("category", {
            required: { value: true, message: "Choose at least one option." },
          })}
        >
          <option value="shopping">Shopping</option>
          <option value="business">Business</option>
          <option value="grocery">Grocery</option>
          <option value="home">Home</option>
          <option value="office">Office</option>
        </Select>
        <FormErrorMessage>
          {errors.category && errors.category.message}
        </FormErrorMessage>
      </VStack>
    </FormControl>
  );
}

export default SelectInput;
