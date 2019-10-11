import axios from "axios";

class TodoService {
  async deleteTodo(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access_token")
          )}`
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateTodo(updatedTodo) {
    try {
      const {
        data: { data: todo }
      } = await axios.put(
        `http://127.0.0.1:8000/api/todos/${updatedTodo.id}`,
        updatedTodo,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("access_token")
            )}`
          }
        }
      );
      return todo;
    } catch (error) {
      console.log(error);
    }
  }

  async addTodo(newTodo) {
    try {
      const {
        data: { data: todo }
      } = await axios.post(`http://127.0.0.1:8000/api/todos`, newTodo, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access_token")
          )}}`
        }
      });

      return todo;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchTodos() {
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/todos`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access_token")
          )}}`
        }
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export const todoService = new TodoService();
