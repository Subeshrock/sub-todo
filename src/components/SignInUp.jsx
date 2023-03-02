import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, VStack, Heading, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../redux/reducers/userReducer";
import TextWithLink from "./TextWithLink";
import EmailInput from "./forms/EmailInput";
import PasswordInput from "./forms/PasswordInput";

function SignInUp() {
  const [isAlready, setIsAlready] = useState(true);
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((state) => state.user);
  const toast = useToast();

  const methods = useForm();

  const onSubmit = (data) => {
    isAlready ? dispatch(loginUser(data)) : dispatch(signupUser(data));
  };

  return (
    <VStack>
      <Heading>{isAlready ? "Login" : "Sign Up"}</Heading>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <EmailInput />
            <PasswordInput />
            <Button
              mt={4}
              colorScheme="blue"
              isLoading={methods.formState.isSubmitting}
              type="submit"
            >
              {isAlready ? "Login" : "Sign Up"}
            </Button>
          </VStack>
        </form>
      </FormProvider>
      {isAlready ? (
        <TextWithLink
          firstSentence="Don't have an account"
          handleAlready={setIsAlready}
          lastWord="Sign Up."
        />
      ) : (
        <TextWithLink
          firstSentence="Already have an account"
          handleAlready={setIsAlready}
          lastWord="Login."
        />
      )}
      {user?.aud === "authenticated" && user?.toast === true
        ? toast({
            title: "Dear User",
            description: `Confirmation email has been sent to ${user.email}. Please confirm to login.`,
            status: "info",
            duration: 9000,
            isClosable: true,
          })
        : null}
    </VStack>
  );
}

export default SignInUp;
