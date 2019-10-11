<template>
  <div class="row">
    <div class="col-md-12 mt-3">
      <div class="card bg-gradient-secondary mt-3">
        <form class="card-body" @submit.prevent="handleAddTodo">
          <p class="mt-0">Create a new Todo.</p>
          <div class="form-group">
            <div class="input-group input-group-alternative">
              <input
                class="form-control"
                placeholder="Todo title.."
                name="title"
                type="text"
                @keyup="validate"
                v-model="newTodo.title"
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
                type="text"
                v-model="newTodo.description"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="priority">Set Priority</label>
            <select class="form-control" id="priority" v-model="newTodo.priority">
              <option selected>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div>
            <button
              :disabled="isDisabled"
              type="submit"
              class="btn btn-primary btn-round btn-block btn-lg"
            >Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddTodo",
  data: function() {
    return {
      newTodo: {
        title: "",
        description: "",
        priority: "High"
      },
      isDisabled: true
    };
  },
  methods: {
    ...mapActions(["addTodo"]),
    handleAddTodo() {
      let newTodo = {
        title: this.newTodo.title,
        description: this.newTodo.description,
        priority: this.newTodo.priority,
        completed: false
      };
      this.addTodo(newTodo);
      this.clearForm();
      this.showUpdate = false;
    },
    validate() {
      if (this.newTodo.title) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    clearForm() {
      (this.newTodo.title = ""), (this.newTodo.description = "");
      this.newTodo.priority = "High";
    }
  }
};
</script>

<style>
</style>