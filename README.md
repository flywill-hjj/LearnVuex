## Vuex的核心概念
### State
#### State提供唯一的公共数据源，所有共享的数据都要统一放到Store的State中进行存储。
```js
//创建store数据源，提供唯一公共数据
const store = new Vuex.Store({
  state:{ count: 0 }
})
```
* 组件访问State中数据的第一种方式：
  ```js
  //1.从vuex中按需导入mapState函数
  this.$store.state.全局数据名称
  ```
* 通过刚才导入的mapState函数，将当前组件需要的全局数据，映射为当前组件的computed计算属性：
  ```js
  //1.将全局数据，映射为当前组件的计算属性
  computed:{
    ...mapState(['count'])
  }
  ```

### Mutation
#### Mutation用于变更Store中的数据。
* 只能通过mutation变更Store数据，不可以直接操作Store中的数据
* 通过这种方式虽然操作起来稍微繁琐一些，但是可以集中监控所有数据的变化
```js
//定义Mutation
const store = new Vuex.Store({
  state:{
    count:0
  },
  mutations:{
    add(state){
      //变更状态
      state.count++
    }
  }
})
``` 
+ 触发mutations的第一种方式 this.$store.commit()
```js
methods:{
  handle1(){
    //触发mutations 的第一种方式
    this.$store.commit('add')
  }
}
```
可以在触发mutations时传递参数
```js
//定义Mutation
const store = new Vuex.Store({
  state:{
    count:0
  },
  mutations:{
    addN(state,step){
      //变更状态
      state.count += step
    }
  }
})
```
```js
//触发mutation
methods:{
  handle2(){
    //在调用commit函数
    //触发mutations时携带参数
    this.$store.commit('addN',3)
  }
}
```
+ 触发mutations的第二种方式
  ```js
  //1.从vuex中按需导入mapMutations函数
  import { mapMutations } from 'vuex'
  ```
  通过刚才导入的mapMutations函数，将需要的mutations函数，映射为当前组件的methods方法
  ```js
  //2.将指定的mutations函数，映射为当前组件的methods函数
  methods:{
    ...mapMutations(['add','addN'])
  }
  ```


### Action
#### Action用来处理异步任务
* 如果通过异步操作变更数据，必须通过Action,而不能使用Mutation
* 但是在Action中还是要通过触发Mutation的方式间接变更数据
  ```js
  //定义Action
  const store = new Vuex.Store({
    //...省略其他代码
    mutations:{
      add(state){
        state.count++
      }
    },
    actions:{
      addAsync(context){
        setTimeout(()=>{
          context.commit('add')
        },1000)
      }
    }
  })
  ```
  + 触发Action的第一种方式this.$store.dispatch()是触发actions的第一种方式
  ```js
  methods:{
    handle(){
      //触发actions的第一种方式
      this.$store.dispatch('addAsync')
    }
  }
  ```
  + 触发actions异步任务时携带参数
  ```js
  //定义 Action
  const store = new Vuex.Store({
    //...省略其他代码
    mutations:{
      addN(state,step){
        state.count += step;
      }
    },
    actions:{
      addNAsync(context,step){
        setTimeout(()=>{
          context.commit('addN',step)
        },1000)
      }
    }
  })
  ```
  ```js
  //触发Action
  methods:{
    handle(){
      //在调用dispatch函数
      //触发actions时携带参数
      this.$store.dispatch('addNAsync',5)
    }
  }
  ```
  + 触发action的第二种方式
  ```js
  //1.从vuex中按需导入mapActions函数
  import { mapActions } from 'vuex'
  ```
  通过刚才导入的mapActions函数，将需要的actions函数，映射为当前组件的methods方法:
  ```js
  //2.将指定的actions函数，映射为当前组件的methods函数
  methods:{
    ...mapActions(['addASync','addNASync'])
  }
  ```

### Getter
#### Getter 用来对Store中的数据进行加工处理形成新的数据
* Getter可以对Store中已有的数据加工处理之后形成新的数据，类似Vue的计算属性
* Store中数据发生变化，Getter的数据也会跟着变化
  ```js
  //定义Getter
  const store = new Vuex.Store({
    state:{
      count:0
    },
    getters:{
      showNum:state=>{
        return '当前最新的数量是[' + state.count + ']'
      }
    }
  })
  ```
  + 使用getters的第一种方式
  ```js
    this.$store.getters.名称
  ```
  + 使用getters的第二种方式
  ```js
    import { mapGetters } from 'vuex'
    computed:{
      ...mapGetters(['showNum'])
    }
  ```


## 基于Vuex的案例
### 实现步骤
#### 初始化项目
* 通过vue ui命令打开可视化面板，创建新项目vuex-demo2
* 安装vuex依赖包npm install vuex axios ant-design-vue -S
* 实现Todos基本布局(基于已有样式模板)