import { todoService } from "../../services/TodoService";
import { getPriority } from "os";

const state = {
  todos: [],
  alert: {
    message: "",
    color: ""
  }
};

const getters = {
  allTodos: state => state.todos
};

const actions = {
  async markComplete(data) {
    try {
      await todoService.updateTodo(data.updatedTodo, data.accessToken);
    } catch (error) {
      console.log(error);
    }
  },

  async updateTodo({ commit }, data) {
    try {
      const updatedTodo = await todoService.updateTodo(
        data.updatedTodo,
        data.token
      );
      console.log(updatedTodo);
      commit("updateTodo", updatedTodo);
    } catch (error) {
      console.log(error);
    }
  },

  async getAllTodos({ commit }, token) {
    try {
      const allTodos = await todoService.fetchTodos(token);
      commit("setTodos", allTodos);
    } catch (error) {
      console.log(error);
    }
  },
  async addTodo({ commit }, data) {
    try {
      const newTodo = await todoService.addTodo(data.newTodo, data.token);

      commit("newTodo", newTodo);
    } catch (error) {
      console.log(error);
    }
  },

  async deleteTodo({ commit }, data) {
    try {
      await todoService.deleteTodo(data.id, data.accessToken);

      commit("removeTodo", data.id);
    } catch (error) {
      console.log(error);
    }
  }
};

const getPriorityColor = item => {
  if (item.priority === "High") item.priorityColor = "#f5365c";
  if (item.priority === "Medium") item.priorityColor = "#ffbb33";
  if (item.priority === "Low") item.priorityColor = "#5e72e4";
};

const mutations = {
  setTodos: (state, todos) => {
    state.todos = todos.map(todo => {
      getPriorityColor(todo);
      return todo;
    });
  },
  newTodo: (state, todo) => {
    getPriorityColor(todo);
    state.todos.unshift(todo);
    // TODO reset form and set colors and alert message
  },

  updateTodo: (state, updatedTodo) => {
    state.todos.filter(todo => {
      if (todo.id === updatedTodo.id) {
        todo.title = updatedTodo.title;
        todo.description = updatedTodo.description;
        todo.priority = updatedTodo.priority;
      }
    });

    // TODO reset form and set colors and alert message
  },
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter(todo => todo.id !== id))
};

export default {
  state,
  getters,
  actions,
  mutations
};
