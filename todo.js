let vm = new Vue({
    el: '#app',
    data: {
        todos: [
            {isSelect: true, tittle: '面试'}
        ],
        todo: '',
        hash: '',
        isActive: '',
        t: ''
    },
    created(){//当vue创建时执行的方法
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    watch: {//只监控一层 例如todos数组的变化
        todos: {
            handler(){
                localStorage.setItem('todos', JSON.stringify(this.todos))
            }, deep: true
        }
    },
    methods: {
        add(){
            let todo = {isSelect: false, tittle: this.todo};
            this.todos.push(todo);
            this.todo = '';
        },
        remove(val){
            this.todos = this.todos.filter(item => val !== item);
        },
        change(todo){
            //    当前点击的这一项
            this.t = todo;
        },
        reset(){
            this.t = ''
        }
    },
    computed: {
        total(){
            return this.todos.filter(item => !item.isSelect).length
        },
        lists(){
            if (this.hash === 'complete') {
                return this.todos;
            } else if (this.hash === 'finish') {
                return this.todos.filter(item => item.isSelect)
            } else {
                return this.todos.filter(item => !item.isSelect)
            }
        }
    },
    directives: {
        autoFocus(el, bindings){
            //    bindings中有一个value属性代表指令对应的值
            if (bindings.value) {
                el.focus();
            }
        }
    }
});
let listener = () => {
    let hash = window.location.hash.slice(1) || 'complete';//如果打开页面没有hash默认'complete'
    vm.hash = hash;
};
listener();//页面加载就获取一次hash否则会回到默认hash
window.addEventListener('hashchange', listener, false);

//将数据渲染到页面上
//获取数据将内容插入到列表中
//点击删除，实现当前项
//算出当前未完成的事件的个数
//点击删除
//点击完成后增加del样式：class“{del:'xxx'}”