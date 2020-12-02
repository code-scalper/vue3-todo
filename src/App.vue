<template>
  <div class="wrapper">
    <div class="header">
      <h1>{{ title }}</h1>
      <div class="input-container">
        <input
          type="text"
          id="taskInput"
          v-model="item.task"
          @keyup.enter="addTodo"
        />
        <button class="add-button" @click="addTodo">입력</button>
      </div>
    </div>
    <div class="section">
      <p v-if="todos.length === 0" class="no-todo">할일이 없습니다</p>
      <input
        type="text"
        v-model="searchTask"
        class="search-task"
        placeholder="검색어 입력"
      />
      {{ filteredTodos }}
      <ul>
        <li v-for="(todo, index) in filteredTodos" :key="index">
          <span @click="updateLike(index)">
            <BIconHeart class="like" v-if="!todo.like" />
            <BIconHeartFill class="like-checked" v-else />
          </span>

          <span
            class="todo"
            :class="{ done: todo.isDone }"
            @click="todo.isDone = !todo.isDone"
            >{{ todo.task }}</span
          >
          <BIconXCircle class="remove" @click="removeTodo(index)" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      title: "Todo App",
      item: {
        task: "",
        like: false,
        isDone: false,
      },
      searchTask: "",
      todos: [{ task: "공부하기", like: false, isDone: false }],
    };
  },
  computed: {
    filteredTodos() {
      return this.todos.filter((todo) => todo.task.includes(this.searchTask));
    },
  },
  methods: {
    addTodo() {
      if (this.item.task.trim().length === 0) {
        return;
      }
      const param = {
        task: this.item.task,
        like: false,
        isDone: false,
      };
      this.todos.push(param);
      this.item.task = "";
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    updateLike(index) {
      this.todos[index].like = !this.todos[index].like;
    },
    test() {
      console.log("hello");
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.wrapper {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}
.header {
  flex: 4;
  background: url("./assets/todo.jpg") no-repeat center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  padding: 0.5rem;
}
.section {
  flex: 7;
}
h1 {
  color: #fff;
}
.input-container {
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-auto-rows: minmax(30px, auto);
  grid-gap: 0.5rem;
}
.input-container > input {
  border: none;
  border-radius: 10px;
  text-indent: 15px;
}
.input-container > input:focus {
  outline: none;
}
.input-container > button {
  border: none;
  border-radius: 10px;
  color: #fff;
  background: #3b5998;
}
.input-container > button:focus {
  outline: none;
}
.section {
  overflow-y: scroll;
}
.section ul li {
  border-bottom: 1px solid #ccc;
  display: grid;
  grid-template-columns: 1fr 12fr 1fr;
  padding: 1rem 0.5rem 1rem 1rem;
  align-items: center;
  font-size: 14px;
}
.like {
  color: #ccc;
}
.like-checked {
  color: salmon;
}
.remove {
  color: salmon;
}
.no-todo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 12px;
  color: #ccc;
}
.done {
  text-decoration: line-through;
  color: #ccc;
}
.search-task {
  height: 30px;
  width: 100%;
  border: none;
  text-indent: 15px;
}
</style>
