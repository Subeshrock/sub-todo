import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

function EmailInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isInvalid={errors.email}>
      <VStack spacing={2} align="flex-start">
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          {...register("email", {
            required: { value: true, message: "This is Required" },
            pattern: { value: /^\S+@\S+$/i, message: "Invalid Email" },
          })}
        />

        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </VStack>
    </FormControl>
  );
}

export default EmailInput;
