import axios from "axios";
let config = {
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`
  }
};

class TodoService {
  async addTodo(newTodo) {
    try {
      const { data } = await axios.post(`todos`, newTodo);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchTodos() {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/todos`,
        config
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export const todoService = new TodoService();
