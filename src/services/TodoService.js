import axios from "axios";
import { setAuthHeader, configureHttp } from "./ServiceConfiguration";

const todoService = {
  init() {
    configureHttp();
    setAuthHeader();
  },
  async deleteTodo(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todos/${id}`);
    } catch (error) {
      console.log(error);
    }
  },
  async updateTodo(updatedTodo) {
    try {
      const {
        data: { data: todo }
      } = await axios.put(
        `http://127.0.0.1:8000/api/todos/${updatedTodo.id}`,
        updatedTodo
      );
      return todo;
    } catch (error) {
      console.log(error);
    }
  },
  async addTodo(newTodo) {
    try {
      const {
        data: { data: todo }
      } = await axios.post(`http://127.0.0.1:8000/api/todos`, newTodo);

      return todo;
    } catch (error) {
      console.log(error);
    }
  },
  async fetchTodos() {
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/todos`);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
};

export default todoService;
