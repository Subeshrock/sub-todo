import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

function TitleInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isInvalid={errors.title}>
      <VStack spacing={2} align="flex-start">
        <FormLabel htmlFor="title">Todo Title</FormLabel>
        <Input
          id="title"
          placeholder="Enter Todo Title"
          {...register("title", {
            required: { value: true, message: "Title is required" },
            minLength: {
              value: 5,
              message: "Title should not be less than 5 character",
            },
          })}
        />
        <FormErrorMessage>
          {errors.title && errors.title.message}
        </FormErrorMessage>
      </VStack>
    </FormControl>
  );
}

export default TitleInput;
