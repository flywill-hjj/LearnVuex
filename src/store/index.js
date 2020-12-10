import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //所有的任务列表
    list: [],
    //文本框的内容
    inputValue: 'aaa',
    //下一个Id
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    //为 store中的 inputValue赋值
    setInputValue(state, val) {
      state.inputValue = val
    },
    //添加列表项目
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    //根据id删除对应的任务事项
    removeItem(state, id) {
      //根据id查找对应项的索引
      const i = state.list.findIndex(x => x.id === id)
      //根据索引，删除对应的元素
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    //修改列表项的选中状态
    changeStatus(state, param) {
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    //请求已完成的任务
    cleanDone(state) {
      state.list = state.list.filter(x => x.done === false)
    },
    //修改视图的关键字
    changeViewKey(state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then(({
        data
      }) => {
        context.commit('initList', data)
      })
    }
  },
  getters: {
    //统计未完成的任务的条数
    unDoneLength(state) {
      return state.list.filter(x => x.done === false).length;
    },
    infolist(state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
  }
})

/* 
export default new Vuex.Store({
  //State提供唯一的公共数据源，所有共享的数据都要统一放到Store的State中进行存储
  state: {
    count: 0
  },
  //只有mutations中定义的函数，才有权利修改state中的数据
  mutations: {
    add(state) {
      //不要在mutations函数中，执行异步操作
      // setTimeout(() => {
      //   state.count++
      // }, 1000)
      state.count++
    },
    addN(state, step) {
      state.count += step
    },
    sub(state) {
      state.count--
    },
    subN(state, step) {
      state.count -= step
    }
  },
  //用来处理异步任务
  actions: {
    addAsync(context) {
      setTimeout(() => {
        //在actions中，不能直接修改state中的数据
        //必须通过context.commit()触发某个mutation才行
        context.commit('add')
      }, 1000)
    },
    addNAsync(context, step) {
      setTimeout(() => {
        context.commit('addN', step)
      }, 1000)
    },
    subAsync(context) {
      setTimeout(() => {
        context.commit('sub')
      }, 1000)
    },
    subNAsync(context, step) {
      setTimeout(() => {
        context.commit('subN', step)
      }, 1000)
    }
  },
  //用来对Store中的数据进行加工处理形成新的数据
  getters: {
    showNum(state) {
      return '当前最新的数量是【' + state.count + '】'
    }
  },
  modules: {}
}) */