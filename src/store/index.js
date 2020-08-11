import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
  },
  mutations: {
    addTask(state, task){
      state.tasks.push(task);

      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    updateTask(state, {id, date, description}){
      const tasks = state.tasks.concat()
      const idx = tasks.findIndex(t => t.id === id)
      const task = tasks[idx]

      const status = new Date(date) > new Date() ? 'active' : 'not-active'

      tasks[idx] = {...task, date, description, status}


      state.tasks = tasks
      localStorage.setItem('tasks', JSON.stringify(state.tasks))

    },
    updateStatus(state, id){
      const idx = state.tasks.findIndex(t => t.id === id)
      state.tasks[idx].status = 'completed'
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    deleteItem(state, id){
      const tasks = state.tasks.concat()
      const idx = tasks.findIndex(t => t.id === id)
      tasks.splice(idx, 1)
      state.tasks = tasks
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  },
  actions: {
    createTask({commit}, task){
      commit('addTask' , task)
    },
    updateTask({commit}, task){
      commit('updateTask' , task)
    },
    updateStatus({commit}, id){
      commit('updateStatus', id)
    },
    deleteItem({commit}, id){
      commit('deleteItem', id)
    }
  },
  getters: {
    getTasks: state => {
      return state.tasks 
    },
    getTaskById: state => (id) => {
      return state.tasks.find(el => el.id === id);
    }
  }
})
