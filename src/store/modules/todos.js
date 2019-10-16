import { todoService } from "../../services/TodoService";

const state = {
  todos: [],
  alert: {
    message: ""
  },
  showUpdate: false
};

const getters = {
  allTodos: state => state.todos,
  showUpdate: state => state.showUpdate,
  alert: state => state.alert
};

const actions = {
  async markComplete({ commit }, data) {
    try {
      await todoService.updateTodo(data);
    } catch (error) {
      console.log(error);
    }
  },

  async showUpdateForm({ commit }, data) {
    try {
      commit("SHOW_UPDATE_FORM", data);
    } catch (error) {
      console.log(error);
    }
  },

  async updateTodo({ commit }, data) {
    try {
      const updatedTodo = await todoService.updateTodo(data);
      commit("UPDATE_TODO", updatedTodo);
    } catch (error) {
      console.log(error);
    }
  },

  async getAllTodos({ commit }) {
    try {
      const allTodos = await todoService.fetchTodos();
      commit("SET_TODOS", allTodos);
    } catch (error) {
      console.log(error);
    }
  },

  async addTodo({ commit }, data) {
    try {
      const newTodo = await todoService.addTodo(data);

      commit("ADD_TODO", newTodo);
    } catch (error) {
      console.log(error);
    }
  },

  async deleteTodo({ commit }, data) {
    try {
      await todoService.deleteTodo(data);

      commit("REMOVE_TODO", data);
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
  SET_TODOS: (state, todos) => {
    state.todos = todos.map(todo => {
      getPriorityColor(todo);
      return todo;
    });
  },

  ADD_TODO: (state, todo) => {
    getPriorityColor(todo);
    state.todos.unshift(todo);
    state.alert = {
      message: "Todo successfully created.",
      class: "alert-success"
    };
  },

  UPDATE_TODO: (state, updatedTodo) => {
    state.todos.filter(todo => {
      if (todo.id === updatedTodo.id) {
        todo.title = updatedTodo.title;
        todo.description = updatedTodo.description;
        todo.priority = updatedTodo.priority;
        getPriorityColor(todo);
      }
    });
    state.showUpdate = false;
    state.alert = {
      message: "Todo successfully updated.",
      class: "alert-primary"
    };
  },

  REMOVE_TODO: (state, id) =>
    (state.todos = state.todos.filter(todo => todo.id !== id)),

  SHOW_UPDATE_FORM: (state, data) => (state.showUpdate = data),

  DELETE_ALERT_MESSAGE: state => {
    state.alert.message = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
