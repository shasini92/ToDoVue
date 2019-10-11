<template>
  <div class="main-wrapper">
    <section class="section pb-0 main-section bg-gradient-info">
      <main class="container card shadow shadow-lg--hover mt-3" id="todolist">
        <AddTodo v-if="!showUpdate" />
        <UpdateTodo v-if="showUpdate" :updatedTodo="updatedTodo" />

        <!-- ALERT MESSAGES -->
        <div class="row" v-if="alert.message">
          <div class="col-md-12 mt-3">
            <div class="alert alert-dismissible fade show" :class="alert.class" role="alert">
              <strong>{{alert.message}}</strong>
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>

        <!-- TODOS LIST -->
        <ul>
          <li
            class="todo-item card w-100 mt-3"
            v-for="todo in allTodos"
            :key="todo.id"
            @click="handleUpdateForm(todo,$event)"
          >
            <h5 class="card-header w-100" :class="{'is-complete':todo.completed}">
              {{todo.title}}
              <button
                @click.stop="handleDelete(todo.id)"
                type="button"
                aria-label="Delete"
                title="Delete"
                class="btn-picto float-right"
              >
                <i aria-hidden="true" class="material-icons">delete</i>
              </button>
              <button
                type="checkbox"
                class="btn-picto float-right"
                @click.stop="handleComplete(todo.id)"
                :title="todo.completed ? 'Undone' : 'Done'"
              >
                <input type="checkbox" class="btn-picto" />
                <i
                  aria-hidden="true"
                  class="material-icons"
                >{{ todo.completed ? 'check_box' : 'check_box_outline_blank' }}</i>
              </button>
            </h5>
            <div class="card-body mr-auto w-100">
              <div class="row">
                <div class="col-md-8">
                  <h6 :class="{'is-complete':todo.completed}">{{todo.description}}</h6>
                </div>
                <div class="col-md-4 ml-auto todo-priority text-right">
                  <div class="priority-dot" :style="{background:todo.priorityColor}"></div>
                  <span>{{todo.priority }} Priority</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </main>
    </section>
  </div>
</template>


<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import AddTodo from "../components/AddTodo";
import UpdateTodo from "../components/UpdateTodo";

export default {
  name: "Todo",
  data: function() {
    return {
      newTodo: {
        title: "",
        description: "",
        priority: "High"
      },
      updatedTodo: {
        title: "",
        description: "",
        priority: ""
      },
      isDisabled: true
    };
  },
  computed: {
    ...mapGetters(["allTodos", "showUpdate", "alert"])
  },
  methods: {
    ...mapActions([
      "getAllTodos",
      "addTodo",
      "updateTodo",
      "deleteTodo",
      "markComplete",
      "showUpdateForm"
    ]),

    handleUpdateForm(todoItem, e) {
      this.updatedTodo.title = todoItem.title;
      this.updatedTodo.description = todoItem.description;
      this.updatedTodo.priority = todoItem.priority;
      this.updatedTodo.id = todoItem.id;
      this.showUpdateForm(true);
    },
    validate() {
      if (this.newTodo.title || this.updatedTodo.title) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    handleDelete(id) {
      this.deleteTodo(id);
      this.alert.message = "Todo successfully deleted.";
      this.alert.class = "alert-danger";
    },
    handleComplete(id) {
      let updatedTodo = this.allTodos.filter(element => {
        if (element.id === id) {
          element.completed = !element.completed;
          return element;
        }
      })[0];

      updatedTodo.id = id;

      this.markComplete(updatedTodo);
    }
  },
  created() {
    if (!localStorage.getItem("access_token")) this.$router.push("/login");
    else {
      this.getAllTodos();
    }
  },
  components: {
    AddTodo,
    UpdateTodo
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

#todolist .btn-picto {
  border: none;
  background: none;
  -webkit-appearance: none;
  cursor: pointer;
  color: #11cdef;
}

.main-wrapper {
  height: 100%;
}

#todolist li.todo-item:hover {
  background-color: #f4f5f7;
  cursor: pointer;
}

.priority-dot {
  display: inline-block;
  height: 10px;
  width: 10px;
  background: #333;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
