import { apiService } from "./ApiBaseService";

const ENDPOINTS = {
  TODOS: "/todos",
  TODO: id => `/todos/${id}`
};

class TodoService {
  async fetchTodos() {
    try {
      const { data } = await apiService.getApiClient().get(ENDPOINTS.TODOS);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async addTodo(newTodo) {
    try {
      const {
        data: { data: todo }
      } = await apiService.getApiClient().post(ENDPOINTS.TODOS, newTodo);

      return todo;
    } catch (error) {
      console.log(error);
    }
  }

  async updateTodo(updatedTodo) {
    try {
      const {
        data: { data: todo }
      } = await apiService
        .getApiClient()
        .put(ENDPOINTS.TODO(updatedTodo.id), updatedTodo);
      return todo;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTodo(id) {
    try {
      await apiService.getApiClient().delete(ENDPOINTS.TODO(id));
    } catch (error) {
      console.log(error);
    }
  }
}

export const todoService = new TodoService();
