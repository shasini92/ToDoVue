import axios from "axios";
import { todoService } from "../../../services/TodoService";

const state = {
  todos: []
};

const getters = {
  allTodos: state => state.todos
};

const actions = {
  async getAllTodos({ commit }) {
    try {
      const allTodos = await todoService.fetchTodos();
      console.log(allTodos);

      commit("setTodos", allTodos);
    } catch (error) {
      console.log(error);
    }
  },
  async addTodo({ commit }, data) {
    try {
      const newTodo = await todoService.addTodo(data);
      commit("newTodo", newTodo);
    } catch (error) {
      console.log(error);
    }
  },
  async updateTodo({ commit }, updatedTodo) {
    const { data } = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`,
      updatedTodo
    );
    commit("updateTodo", data);
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    commit("removeTodo", id);
  }
};

const mutations = {
  setTodos: (state, todos) => {
    state.todos = todos;
    // state.todos = todos.map(todo => {
    //   if (todo.priority === "High") todo.priorityColor = "#f5365c";
    //   if (todo.priority === "Medium") todo.priorityColor = "#ffbb33";
    //   if (todo.priority === "Low") todo.priorityColor = "#5e72e4";
    //   return todo;
    // });
  },
  newTodo: (state, todo) => {
    state.todos.unshift(todo);
    // TODO reset form and set colors
    // if (todo.priority === "High") todo.priorityColor = "#f5365c";
    //     if (todo.priority === "Medium") todo.priorityColor = "#ffbb33";
    //     if (todo.priority === "Low") todo.priorityColor = "#5e72e4";
    //     this.showUpdate = false;
    //     this.alertMessage = "Todo successfully created.";
    //     this.alertColor = "success";
  },
  updateTodo: (state, updatedTodo) => {
    state.todos.filter(todo => {
      if (todo.id === updatedTodo.id) {
        todo.title = updatedTodo.title;
      }
    });
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
