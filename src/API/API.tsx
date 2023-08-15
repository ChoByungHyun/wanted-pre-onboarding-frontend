import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export interface AuthResponse {
  access_token: string;
}

export interface ErrorResponse {
  error: string;
}

const axiosInstance = axios.create({
  baseURL: "https://www.pre-onboarding-selection-task.shop/",
});

const useAPI = () => {
  const [error, setError] = useState<string | null>(null);
  const [access_token, setAccess_token] = useState<string | null>(
    localStorage.getItem("token")
  );
  useEffect(() => {
    setAccess_token(localStorage.getItem("token"));
  }, []);

  const signup = async (
    email: string,
    password: string
  ): Promise<AuthResponse | ErrorResponse> => {
    const requestURL = "/auth/signup";
    try {
      const response = await axiosInstance.post<AuthResponse>(requestURL, {
        email: email,
        password: password,
      });

      return response.data;
    } catch (error) {
      setError("Error signing up");
      throw error;
    }
  };

  const signin = async (
    email: string,
    password: string
  ): Promise<AuthResponse | ErrorResponse> => {
    const requestURL = "/auth/signin";
    try {
      const response = await axiosInstance.post<AuthResponse>(requestURL, {
        email: email,
        password: password,
      });

      localStorage.setItem("token", response.data.access_token);

      return response.data;
    } catch (error) {
      setError("Error signing in");
      throw error;
    }
  };

  const createTodo = async (todo: string): Promise<Todo> => {
    const requestURL = "/todos";
    try {
      const response = await axiosInstance.post<Todo>(
        requestURL,
        { todo },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      setError("Error creating todo");
      throw error;
    }
  };

  const getTodos = async (): Promise<Todo[]> => {
    const requestURL = "/todos";
    try {
      const response = await axiosInstance.get<Todo[]>(requestURL, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      return response.data;
    } catch (error) {
      setError("Error fetching todos");
      throw error;
    }
  };

  const updateTodo = async (
    id: number,
    todo: string,
    isCompleted: boolean
  ): Promise<Todo> => {
    const requestURL = `/todos/${id}`;
    try {
      const response = await axiosInstance.put<Todo>(
        requestURL,
        {
          todo: todo,
          isCompleted: isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      setError("Error updating todo");
      throw error;
    }
  };

  const deleteTodo = async (id: number): Promise<AxiosResponse> => {
    const requestURL = `/todos/${id}`;
    try {
      const response = await axiosInstance.delete(requestURL, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      return response;
    } catch (error) {
      setError("Error deleting todo");
      throw error;
    }
  };

  return {
    error,
    signup,
    signin,
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
  };
};

export default useAPI;
