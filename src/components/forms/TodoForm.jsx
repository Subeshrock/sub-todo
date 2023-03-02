import React, { useEffect } from "react";
import { Button, VStack } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AddIcon, EditIcon } from "@chakra-ui/icons";

import { createTodo, updateTodo } from "../../redux/reducers/todoReducer";

import TitleInput from "./TitleInput";
import DescriptionInput from "./DescriptionInput";
import SelectInput from "./SelectInput";

const MotionButton = motion(Button);

function TodoForm({ editItem, setEditItem }) {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.user.user.user.id);
  const methods = useForm();

  const handleCreate = (data) => {
    data.user_id = user_id;
    dispatch(createTodo(data));
    methods.reset();
  };

  useEffect(() => {
    if (editItem) {
      methods.setValue("title", editItem.title);
      methods.setValue("description", editItem.description);
      methods.setValue("category", editItem.category);
    }
  }, [editItem, methods]);

  const handleEdit = (data) => {
    data.id = editItem.id;
    dispatch(updateTodo(data));
    setEditItem(null);
    methods.reset();
  };

  return (
    <VStack>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(editItem ? handleEdit : handleCreate)}
        >
          <VStack spacing={4}>
            <TitleInput name="title" />
            <DescriptionInput />
            <SelectInput />
            {
              <MotionButton
                colorScheme="blue"
                isLoading={methods.formState.isSubmitting}
                mt={3}
                type="submit"
                whileHover={{ scale: 1.05 }}
                rightIcon={editItem ? <EditIcon /> : <AddIcon />}
              >
                {editItem ? "Update Todo" : "Add Todo"}
              </MotionButton>
            }
          </VStack>
        </form>
      </FormProvider>
    </VStack>
  );
}

export default TodoForm;
