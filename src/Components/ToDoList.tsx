import React, { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import Button from "./Common/Button";
import useAPI, { ErrorResponse } from "API/API";

interface todoprops {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<todoprops[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const { getTodos, createTodo, updateTodo, deleteTodo } = useAPI();

  useEffect(() => {
    const fetchAndSetTodos = async () => {
      try {
        const todosFromAPI = await getTodos();
        setTodos(todosFromAPI);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchAndSetTodos();
  }, []);

  const handleNewTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleNewTodoAdd = async () => {
    if (newTodo.trim() === "") return;

    try {
      const newTodoItem = await createTodo(newTodo);

      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleTodoToggle = async (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );

    try {
      await updateTodo(
        id,
        updatedTodos.find((todo) => todo.id === id)?.todo || "",
        updatedTodos.find((todo) => todo.id === id)?.isCompleted || false
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleTodoDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleTodoEdit = (id: number, text: string) => {
    setIsEditMode(id);
    setEditedText(text);
  };

  const handleTodoSubmit = async (id: number, newText: string) => {
    try {
      const updatedTodo = await updateTodo(
        id,
        newText,
        todos.find((todo) => todo.id === id)?.isCompleted || false
      );

      const updatedTodos = todos.map((todo) =>
        todo.id === id ? updatedTodo : todo
      );

      setTodos(updatedTodos);
      setIsEditMode(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleTodoCancel = () => {
    setIsEditMode(null);
  };

  return (
    <SContainer>
      <STitle>메모장</STitle>
      <STodoForm>
        <SInput
          type="text"
          placeholder="메모를 입력하세요"
          value={newTodo}
          onChange={handleNewTodoChange}
          data-testid="new-todo-input"
        />
        <SAddButton
          onClick={handleNewTodoAdd}
          data-testid="new-todo-add-button"
        >
          Add
        </SAddButton>
      </STodoForm>
      <STodoItems>
        {todos.map((todo) => (
          <STodoItem key={todo.id}>
            <STodoItemContainer>
              <SCheckbox
                type="checkbox"
                checked={todo.isCompleted}
                onClick={() => handleTodoToggle(todo.id)}
              />
              <STodoLabel>
                {isEditMode === todo.id ? (
                  <STodoEditForm onSubmit={(e) => e.preventDefault()}>
                    <SInput
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <SSubmitButton
                      data-testid="submit-button"
                      onClick={(e) => {
                        handleTodoSubmit(todo.id, editedText);
                      }}
                      disabled={editedText.trim() === ""}
                    >
                      확인
                    </SSubmitButton>
                    <SCancelButton
                      data-testid="cancel-button"
                      onClick={(e) => {
                        handleTodoCancel();
                      }}
                    >
                      취소
                    </SCancelButton>
                  </STodoEditForm>
                ) : (
                  <>
                    <STodoText isCompleted={todo.isCompleted}>
                      {todo.todo}
                    </STodoText>
                    <SModifyButton
                      data-testid="modify-button"
                      onClick={(e) => {
                        handleTodoEdit(todo.id, todo.todo);
                      }}
                    >
                      수정
                    </SModifyButton>
                    <SDeleteButton
                      data-testid="delete-button"
                      onClick={(e) => {
                        handleTodoDelete(todo.id);
                      }}
                    >
                      삭제
                    </SDeleteButton>
                  </>
                )}
              </STodoLabel>
            </STodoItemContainer>
          </STodoItem>
        ))}
      </STodoItems>
    </SContainer>
  );
};

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const STitle = styled.h1``;

const STodoForm = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
`;

const SAddButton = styled.button``;

const STodoItems = styled.ul`
  list-style: none;
  padding: 0;
`;

const STodoItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const STodoItemContainer = styled.div`
  display: flex;
`;

const STodoLabel = styled.div`
  display: flex;
  align-items: center;
`;

const SCheckbox = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-right: 5px;
  position: relative;
  cursor: pointer;

  &:checked {
    background-color: #007bff;
    border-color: #007bff;
  }

  &:checked::before {
    content: "\u2713";
    font-size: 12px;
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const STodoText = styled.span<{ isCompleted: boolean }>`
  margin-left: 5px;
  text-decoration: ${(props) => (props.isCompleted ? "line-through" : "none")};
`;

const SModifyButton = styled.button``;

const SDeleteButton = styled.button``;

const STodoEditForm = styled.form`
  display: flex;
  align-items: center;
`;

const SSubmitButton = styled.button``;

const SCancelButton = styled.button``;

export default TodoList;
