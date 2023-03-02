import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

function PasswordInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isInvalid={errors.password}>
      <VStack spacing={2} align="flex-start">
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: { value: true, message: "This is required" },
            minLength: {
              value: 8,
              message: "Password should not be less than 8 characters.",
            },
          })}
        />

        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </VStack>
    </FormControl>
  );
}

export default PasswordInput;
