import { useState } from "react";
import { Flex, HStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import SignInUp from "./components/SignInUp";
import TodoForm from "./components/forms/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const { loading, user, error } = useSelector((state) => state.user);
  const [editItem, setEditItem] = useState(null);
  return (
    <>
      {user?.access_token ? (
        <HStack
          spacing={8}
          alignContent={"space-around"}
          alignItems={"flex-start"}
          m={10}
        >
          <TodoForm editItem={editItem} setEditItem={setEditItem} />
          <TodoList setEditItem={setEditItem} />
          <TodoList setEditItem={setEditItem} completed={true} />
        </HStack>
      ) : (
        <SignInUp />
      )}
    </>
  );
}

export default App;
