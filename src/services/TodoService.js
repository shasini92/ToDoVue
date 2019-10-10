import axios from "axios";

class TodoService {
  async markComplete(updatedTodo, token) {
    try {
      const {
        data: { data: todo }
      } = await axios.put(
        `http://127.0.0.1:8000/api/todos/${updatedTodo.id}`,
        updatedTodo,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return todo;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTodo(id, token) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("todo deleted");
    } catch (error) {
      console.log(error);
    }
  }

  async updateTodo(updatedTodo, token) {
    try {
      const {
        data: { data: todo }
      } = await axios.put(
        `http://127.0.0.1:8000/api/todos/${updatedTodo.id}`,
        updatedTodo,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return todo;
    } catch (error) {
      console.log(error);
    }
  }

  async addTodo(newTodo, token) {
    try {
      const {
        data: { data: todo }
      } = await axios.post(`http://127.0.0.1:8000/api/todos`, newTodo, {
        headers: {
          Authorization: `Bearer ${token}}`
        }
      });
      console.log(todo);

      return todo;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchTodos(token) {
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/todos`, {
        headers: {
          Authorization: `Bearer ${token}}`
        }
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export const todoService = new TodoService();
