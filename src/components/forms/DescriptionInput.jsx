import React from "react";
import {
  FormControl,
  FormLabel,
  Textarea,
  VStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

function DescriptionInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isInvalid={errors.description}>
      <VStack spacing={2} align="flex-start">
        <FormLabel htmlFor="description">Todo Description</FormLabel>
        <Textarea
          id="description"
          placeholder="Enter Description for you todo"
          resize="none"
          {...register("description", {
            required: { value: true, message: "Description is Required" },
            maxLength: { value: 100, message: "100 Characters max" },
          })}
        />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </VStack>
    </FormControl>
  );
}

export default DescriptionInput;
