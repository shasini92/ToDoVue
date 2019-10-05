<template>
  <div class="main-wrapper">
    <section class="section pb-0 main-section bg-gradient-info">
      <main class="container card shadow shadow-lg--hover mt-3" id="todolist">
        <!-- CREATE NEW TODO -->
        <div class="row">
          <div class="col-md-12 mt-3">
            <div class="card bg-gradient-secondary shadow shadow-lg--hover mt-3">
              <form class="card-body" @submit.prevent="addnewTodo($event)">
                <p class="mt-0">Create a new Todo.</p>
                <div class="form-group">
                  <div class="input-group input-group-alternative">
                    <input
                      class="form-control"
                      placeholder="Todo title.."
                      name="title"
                      type="text"
                      v-model="userInfo.email"
                    />
                  </div>
                </div>
                <br />
                <div class="form-group">
                  <div class="input-group input-group-alternative">
                    <input
                      class="form-control"
                      placeholder="Todo Description..."
                      name="description"
                      type="password"
                      v-model="userInfo.password"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="priority">Set Priority</label>
                  <select class="form-control" id="priority">
                    <option selected>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div>
                  <button type="submit" class="btn btn-primary btn-round btn-block btn-lg">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- TODO LIST -->
        <ul id="todo-list">
          <transition-group>
            <li
              class="todo-item"
              v-for="todo in todos"
              :key="todo.id"
              @click="showDetail(todo, $event)"
            >
              <div class="handle-wrapper">
                <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
              </div>
              <div class="todo-info">
                <span
                  class="label todo-title"
                  :class="{'is-complete':todo.completed}"
                >{{todo.title}}</span>
                <span
                  class="label todo-description ml-4"
                  v-if="todo.description"
                >{{todo.description}}</span>
              </div>
              <div class="todo-priority">
                <div class="priority-dot" :style="{background:todo.priorityColor}"></div>
                <span>{{todo.priority }} Priority</span>
              </div>

              <!-- ACTIONS -->

              <div class="actions">
                <div></div>

                <button
                  type="checkbox"
                  class="btn-picto"
                  @click.stop="markComplete(todo)"
                  :title="todo.completed ? 'Undone' : 'Done'"
                >
                  <input type="checkbox" @change="markComplete" class="btn-picto" />
                  <i
                    aria-hidden="true"
                    class="material-icons"
                  >{{ todo.completed ? 'check_box' : 'check_box_outline_blank' }}</i>
                </button>
                <button
                  @click.stop="deleteTodo(todo.id)"
                  type="button"
                  aria-label="Delete"
                  title="Delete"
                  class="btn-picto"
                >
                  <i aria-hidden="true" class="material-icons">delete</i>
                </button>
              </div>
            </li>
          </transition-group>
        </ul>
      </main>
    </section>
    <!-- <TodoDetailModal /> -->
  </div>
</template>


<script>
// import TodoDetailModal from "./TodoDetailModal";
import axios from "axios";

export default {
  components: {
    // TodoDetailModal
  },
  name: "Todo",
  data: function() {
    return {
      todos: [],
      checkkAll: false,
      newTodoText: "",
      isFullScreen: false,
      elem: document.documentElement,
      userLoggedIn: false,
      priorityColor: null,
      userData: {},
      userInfo: ""
    };
  },
  created() {
    //  this.userLoggedIn = true;

    axios
      .get("http://127.0.0.1:8000/api/todos")
      .then(({ data }) => {
        this.todos = data.data;
      })
      .catch(err => console.log(err));
  },

  methods: {
    // showDetail(todoItem, e) {
    //   console.log(
    //     "$(e.target).hasClass('.fa-tag') ",
    //     $(e.target).hasClass("fa-tag")
    //   );

    //   if ($(e.target).hasClass("fa-tag")) {
    //     console.log("clicked ", e.target);
    //     return false;
    //   } else {
    //     e.preventDefault();
    //     // e.stopPropagation();
    //     Bus.$emit("showDetailedTaskModal", todoItem);
    //   }
    // },
    // clearTodos() {
    //   this.$store.state.todos = [];
    //   this.updateTodos();
    // },

    deleteTodo(id) {
      axios
        .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(res => (this.todos = this.todos.filter(todo => todo.id != id)))
        .catch(err => console.log(err));
    },
    markComplete(todo) {
      this.todos[this.todos.indexOf(todo)].completed = !this.todos[
        this.todos.indexOf(todo)
      ].completed;

      // console.log("TCL: markComplete -> todoFound", todoFound);
    }
    // addnewTodo(e) {
    //   if (this.newTodoText.length > 0) {
    //     e.preventDefault();
    //     let newTodo = {
    //       completed: false,
    //       id: uuidv4(),
    //       title: this.newTodoText,
    //       description: null,
    //       inDate: moment().format("MMM D"),
    //       priority: "None",
    //       tags: [],
    //       priorityColor: "#11cdef"
    //     };
    //     this.createNewTodo(newTodo);
    //     // this.userData.todos.push(newTodo);

    //     // this.todos.unshift(newTodo);
    //     newTodo.id++;
    //     this.newTodoText = "";
    //     this.updateTodos();
    //   }
    // },
    // checkLogin() {}
  }
};
</script>

<style scoped>
.is-complete {
  text-decoration: line-through;
}

section.main-section {
  height: 100%;
}
.card-body {
  text-align: left;
}

@keyframes strikeitem {
  to {
    width: calc(100% + 1rem);
  }
}
.count {
  font-size: 16px;
}

#todolist {
  margin: 4rem auto;
  padding: 2rem 3rem 3rem;
  /* max-width: 750px; */
  background: #fff;
  color: #32325d;
  box-shadow: 0 0 19px 10px rgba(100, 100, 100, 0.2);
  overflow: visible;
}
#todolist .row {
  text-align: left;
}
#todolist h1 {
  /*text-align:center;*/
  font-weight: normal;
  font-size: 2.6rem;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
#todolist h1 span {
  display: block;
  font-size: 0.8rem;
  margin-bottom: 0.7rem;
  margin-left: 3px;
  margin-top: 0.2rem;
}

#todolist .emptylist {
  margin-top: 2.6rem;
  text-align: center;
  letter-spacing: 0.05em;
  font-style: italic;
  opacity: 0.8;
}
#todolist ul {
  margin-top: 1rem;
  list-style: none;
  padding: 0;
}
#todolist .todolist-move {
  transition: transform 1s;
}
#todolist li {
  display: flex;
  margin-top: 5px;
  padding: 0.5rem 1rem;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  text-align: left;
  padding-left: 5px;
}

#todolist .actions {
  flex-shrink: 0;
}
#todolist .label {
  position: relative;
  transition: opacity 0.2s linear;
}
#todolist .label.todo-title {
  /* display: block; */
  color: #7a797e;
}
#todolist .done .label,
#todolist .done .todo-priority,
#todolist .done .todo-tags,
#todolist .done .todo-date,
#todolist .done .actions {
  opacity: 0.6;
}
#todolist .done .label:before {
  content: "";
  position: absolute;
  top: 50%;
  left: -0.5rem;
  display: block;
  width: 0%;
  height: 1px;
  background: #fff;
  animation: strikeitem 0.3s ease-out 0s forwards;
}
#todolist .btn-picto {
  border: none;
  background: none;
  -webkit-appearance: none;
  cursor: pointer;
  color: #11cdef;
}

/* TOOGLE COMPONENT */
.togglebutton-wrapper {
  margin-top: 1em;
}
.togglebutton-wrapper label {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.togglebutton-wrapper input {
  position: absolute;
  left: -9999px;
}
.togglebutton-wrapper .togglebutton-label {
  font-size: 0.8rem;
  letter-spacing: 0.1em;
}
.togglebutton-wrapper .tooglebutton-box {
  position: relative;
  display: block;
  margin-left: 0.6em;
  width: 38px;
  height: 22px;
  background: white;
  /*border:1px solid black;*/
  border-radius: 999px;
  cursor: pointer;
}
.togglebutton-wrapper .tooglebutton-box:before {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  display: block;
  width: 18px;
  height: 18px;
  /*border:1px solid #11cdef;*/
  border-radius: 50%;
  background: #11cdef;
  opacity: 0.7;
  transition: all 0.2s ease-in-out;
}
.togglebutton-wrapper.togglebutton-focus .tooglebutton-box {
  box-shadow: 0px 0px 0px 3px rgba(0, 0, 0, 0.1);
}
.togglebutton-wrapper.togglebutton-checked .tooglebutton-box:before {
  left: calc(100% - 4px - 16px);
  opacity: 1;
}
.scroll-area {
  position: relative;
  margin: auto;
  width: 100%;
  max-height: 450px;
  min-height: 350px;
}
.scroll-area .ps__scrollbar-y-rail {
  background: rgb(232, 232, 232);
  opacity: 1;
  width: 10px;
  border-radius: 8px;
}
.todo-footer {
  position: absolute;
  bottom: 0;
}
.todo-footer ul {
  display: flex;
}
.todo-footer .actions {
  display: flex;
}
.todo-footer .actions button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-wrapper {
  height: 100%;
}
@media screen and (min-width: 370px) {
  section.main-section {
    padding: 0;
  }
  #todolist {
    padding: 1.5rem;
    margin: 1rem auto;
  }
  #todolist h1 {
    font-size: 1.5rem;
  }
  .count.completed {
    text-align: left;
  }
  .count.pending {
    text-align: left;
  }
}
.fa.submit-icon {
  position: absolute;
  right: 30px;
  top: 12px;
  font-size: 25px;
  cursor: pointer;
}
.badge {
  font-size: 80%;
}
.navbar-dark .navbar-brand {
  font-size: 20px;
}
.todo-info {
  flex: 1 70%;
}
.todo-date {
  font-size: 12px;
  color: #8898aa;
  flex: 1 10%;
}
.my-style .vue-notification .notification-title {
  color: red !important;
}

#todolist li.todo-item:hover {
  background-color: #f4f5f7;
  cursor: pointer;
}
.todo-item .handle-wrapper {
  width: 20px;
  color: #b5b5b5;
  opacity: 0;
}
#todolist li.todo-item:hover .handle-wrapper {
  opacity: 1;
}
.handle-wrapper:hover {
  cursor: move;
}
.ghost {
  border-bottom: 1px solid #11cdef;
}
.user-icon img {
  width: 40px;
  cursor: pointer;
  border-radius: 50%;
}
.label.todo-description {
  font-size: 16px;
  background: #dedede;
  padding: 5px 8px;
  border-radius: 6px;
  color: #000;
  line-height: normal;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.badge.badge-pill.badge-info {
  font-size: 11px;
  margin-right: 5px;
  text-transform: capitalize;
  line-height: normal;
  padding: 3px 10px;
}
@media screen and (max-width: 370px) {
  #todolist {
    max-width: 400px;
    padding: 1rem;
  }
}
@media screen and (max-width: 768px) {
  #todolist {
    max-width: 650px;
    padding: 1.25rem;
  }
}
.todo-priority {
  flex: 1 20%;
  display: flex;
  align-items: center;
}
.todo-tags {
  flex: 1 10%;
  text-align: center;
}
.todo-tags .fa-tag[data-toggle="dropdown"] {
  color: #7a797e;
  height: 30px;
  display: flex;
  width: 30px;
  align-items: center;
  justify-content: center;
  margin: auto;
  transition: all 0.2s;
  border-radius: 50%;
}
.todo-tags .fa-tag[data-toggle="dropdown"]:hover {
  background: rgba(17, 205, 239, 0.5);
  color: #fff;
  transform: scale(1.2);
}
.todo-desc-icon {
  width: 20px;
}
.priority-dot {
  height: 10px;
  width: 10px;
  background: #333;
  border-radius: 50%;
  margin-right: 10px;
}
.todo-tags .dropdown-menu.show .badge-pill.badge {
  font-size: 12px;
  text-transform: capitalize;
  padding: 8px 8px;
  display: block;
  margin: 10px;
  width: 120px;
  margin: 8px auto;
}
.dropdown-header {
  color: #7a797e;
  text-align: center;
  font-size: 16px;
  padding: 4px;
  text-transform: none;
  font-weight: 600;
  border-bottom: 1px solid #c5c5c5;
  margin: 0 20px;
}
.no-tags {
  text-align: center;
  font-size: 14px;
  margin: 10px 0;
}
@media (max-width: 767px) {
  #todolist li {
    flex-wrap: wrap;
  }
  .todo-info {
    flex: 1 70%;
  }
  .todo-priority {
    flex: 1 25%;
    display: flex;
    align-items: center;
    order: 2;
    flex-shrink: 0;
    flex-grow: 0;
  }
  .todo-tags {
    flex: 1 10%;
    text-align: center;
    order: 3;
    flex-grow: 0;
  }
  .todo-date {
    flex: 1 10%;
    align-items: center;
  }
  #todolist .actions {
    flex-shrink: 0;
  }
}
</style>
