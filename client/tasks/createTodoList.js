import axios from 'axios';

export function getTodoListID() {
  return axios.post('http://localhost:4200/todoList/create')
  }
