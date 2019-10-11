<template>
  <div class="row">
    <div class="col-md-12 mt-3">
      <div class="card bg-gradient-secondary mt-3">
        <form class="card-body" @submit.prevent="handleUpdate(accessToken)">
          <p class="mt-0">Update a todo</p>
          <div class="form-group">
            <div class="input-group input-group-alternative">
              <input
                class="form-control"
                placeholder="Update title.."
                name="title"
                type="text"
                @keyup="validate"
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
              @click.prevent="handleUpdate(accessToken)"
            >Update</button>
          </div>

          <br />
          <div>
            <button
              type="submit"
              class="btn btn-primary btn-round btn-block btn-lg"
              @click.prevent="handleAddTodo(accessToken)"
              :disabled="isDisabled"
            >Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "UpdateTodo",
  data: function() {
    return {
      isDisabled: false,
      alert: {
        message: "",
        color: ""
      }
    };
  },
  props: ["updatedTodo"],
  computed: {
    ...mapGetters(["accessToken"])
  },
  methods: {
    ...mapActions(["addTodo", "updateTodo", "showUpdateForm"]),
    handleAddTodo(token) {
      let newTodo = {
        title: this.updatedTodo.title,
        description: this.updatedTodo.description,
        priority: this.updatedTodo.priority,
        id: this.updatedTodo.id
      };
      let data = {
        newTodo,
        token
      };
      this.addTodo(data);
      this.showUpdateForm(false);
      this.alert = { message: "Todo successfully created.", color: "success" };
    },
    handleUpdate(token) {
      let updatedTodo = {
        title: this.updatedTodo.title,
        description: this.updatedTodo.description,
        priority: this.updatedTodo.priority,
        id: this.updatedTodo.id
      };

      let data = {
        updatedTodo,
        token
      };
      this.updateTodo(data);
      this.showUpdate = false;
      this.alert = { message: "Todo successfully updated.", color: "primary" };
    },
    validate() {
      if (this.updatedTodo.title) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    }
  }
};
</script>

<style>
</style>