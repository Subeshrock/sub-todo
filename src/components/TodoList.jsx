import React, { useEffect } from "react";
import {
  List,
  ListItem,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { DeleteIcon, CheckIcon, EditIcon } from "@chakra-ui/icons";

import {
  getTodos,
  deleteTodo,
  updateTodo,
} from "../redux/reducers/todoReducer";
import { supabase } from "../utils/supabaseClient";

const MotionItem = motion(ListItem);

const itemVariants = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 150 } },
  exit: { x: -200, opacity: 0, transition: { duration: 0.5 } },
};

function TodoList({ setEditItem, completed }) {
  let todos = useSelector((state) => state.todos.todos);
  if (completed) {
    todos = todos.filter((todo) => todo.is_completed === true);
  } else {
    todos = todos.filter((todo) => todo.is_completed === false);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
    const channel = supabase
      .channel("todo_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "todo" },
        () => {
          dispatch(getTodos());
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const handleComplete = (id) => {
    const data = {};
    data.id = id;
    data.is_completed = true;
    dispatch(updateTodo(data));
  };

  const handleEdit = (id) => {
    const editItem = todos.find((item) => item.id === id);
    setEditItem(editItem);
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <List spacing={4}>
      <AnimatePresence>
        {todos.length > 0 &&
          todos.map((todo) => (
            <MotionItem
              key={todo.id}
              variants={itemVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              p={5}
              // rounded={6}
              // background={formBackground}
              // display="flex"

              // w="500px"
            >
              <Stat>
                <StatNumber>{todo.title}</StatNumber>
                <StatLabel>{todo.description}</StatLabel>
                <StatHelpText>{todo.category}</StatHelpText>
              </Stat>
              <Button
                mr={3}
                colorScheme="red"
                size="xs"
                rightIcon={<DeleteIcon />}
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </Button>
              <Button
                mr={3}
                colorScheme="orange"
                size="xs"
                rightIcon={<EditIcon />}
                onClick={() => handleEdit(todo.id)}
              >
                Edit
              </Button>
              {!todo.is_completed && (
                <Button
                  colorScheme="teal"
                  size="xs"
                  rightIcon={<CheckIcon />}
                  onClick={() => handleComplete(todo.id)}
                >
                  Complete
                </Button>
              )}
            </MotionItem>
          ))}
      </AnimatePresence>
    </List>
  );
}

export default TodoList;
