<template>
  <div class="row">
    <div class="col-md-12 mt-3">
      <div class="card bg-gradient-secondary mt-3">
        <form class="card-body" @submit.prevent="handleUpdate">
          <p class="mt-0">Update a todo</p>
          <div class="form-group">
            <div class="input-group input-group-alternative">
              <input
                class="form-control"
                placeholder="Update title.."
                name="title"
                type="text"
                v-model="updatedTodo.title"
              />
            </div>
          </div>
          <br />
          <div class="form-group">
            <div class="input-group input-group-alternative">
              <input
                class="form-control"
                placeholder="Update Todo Description..."
                name="description"
                type="text"
                v-model="updatedTodo.description"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="priority">Set Priority</label>
            <select class="form-control" id="priority" v-model="updatedTodo.priority">
              <option selected>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div>
            <button
              :disabled="isDisabled"
              type="submit"
              class="btn btn-info btn-round btn-block btn-lg"
              @click.prevent="handleUpdate"
            >Update</button>
          </div>
          <br />
          <div>
            <button
              type="submit"
              class="btn btn-primary btn-round btn-block btn-lg"
              @click.prevent="handleAddTodo"
              :disabled="isDisabled"
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
  name: "UpdateTodo",

  data: function() {
    return {
      alert: {
        message: "",
        color: ""
      }
    };
  },

  props: ["updatedTodo"],

  computed: {
    isDisabled() {
      if (this.updatedTodo.title) {
        return false;
      } else {
        return true;
      }
    }
  },

  methods: {
    ...mapActions(["addTodo", "updateTodo", "showUpdateForm"]),

    handleAddTodo() {
      let newTodo = {
        title: this.updatedTodo.title,
        description: this.updatedTodo.description,
        priority: this.updatedTodo.priority,
        id: this.updatedTodo.id
      };

      this.addTodo(newTodo);
      this.showUpdateForm(false);
    },

    handleUpdate(token) {
      let updatedTodo = {
        title: this.updatedTodo.title,
        description: this.updatedTodo.description,
        priority: this.updatedTodo.priority,
        id: this.updatedTodo.id
      };

      this.updateTodo(updatedTodo);
      this.showUpdate = false;
    }
  }
};
</script>

<style>
</style>