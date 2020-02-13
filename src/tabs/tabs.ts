import './tabs.scss'

class tabBar {
    public tabs: any
    public tabList: any
    public tabBodySection: any
    public index: any
    public className: string
    public tabAddTab: any
    public addLl: any
    public addSection: any
    public removeTabCard: any
    public parentNode: any;
    public innerHTML: string;
    public children: any;
    public editTabCard: any
    public value: any;

    // 构造函数, 立即执行， 使用 querySelector 获取 DOM 元素
    constructor (tabClass: string) {
        // 获取整体盒子
        this.tabs = document.querySelector(tabClass)
        // 获取添加按钮
        this.tabAddTab = this.tabs.querySelector('.tabAddTab')
        // 获取 tabHeader ul
        this.addLl = this.tabs.querySelector('.tabHeader ul:first-of-type')
        // 获取 tabBody
        this.addSection = this.tabs.querySelector('.tabBody')
        // 引入 init()
        this.init()
    }
    init() {
        // 调用 update node
        this.tabUpdateNode()
        // 添加 tab 
        this.tabAddTab.onclick =  this.addTabBar.bind(this.tabAddTab, this)
        // 初始化操作，让相关元素绑定事件
        for ( let i = 0 ; i < this.tabList.length ; i++ ) {
            this.tabList[i].index = i
            // 使用 bind 解决 this 指向, 把 this 传递给 toggleTabBar(this: any) 把 this 指向构造函数，然后传递给 that
            this.tabList[i].addEventListener('click', this.toggleTabBar.bind(this.tabList[i], this))
            // 指向删除函数
            this.removeTabCard[i].onclick = this.removeTabBar.bind(this.removeTabCard[i], this)
            // 指向编辑函数
            this.editTabCard[i].ondblclick = this.editTabBar.bind(this.editTabCard[i], this)
            // 指向双击函数
            this.tabBodySection[i].ondblclick = this.editTabBar.bind(this.tabBodySection[i], this)
        }
    }
    tabUpdateNode() {
        // 节点函数 ，获取元素
        // 获取 li section .removeTabCard span
        this.tabList = this.tabs.querySelectorAll('li')
        this.tabBodySection = this.tabs.querySelectorAll('section')      
        this.removeTabCard = this.tabs.querySelectorAll('.removeTabCard') 
        this.editTabCard = this.tabs.querySelectorAll('span')  
    }
    // 切换函数
    toggleTabBar(that:any) {
        // 清除所有, 
        that.clearTabClass()
        // 添加 .tabLiActive
        this.className = 'tabLiActive'
        // 添加 tabBodyActive, 在当前的 Class
        that.tabBodySection[this.index].className = 'tabBodyActive'
    }
    // 删除所有函数, 排它
    clearTabClass() {
        for ( let i = 0 ; i < this.tabList.length ; i++ ) {
            this.tabList[i].className = ''
            this.tabBodySection[i].className = ''
        }
    }
    // 添加 Tab
    addTabBar(that:any) {
        // 先清除所有
        that.clearTabClass()
        // 随机生成一个随机数
        let random = Math.random()
        let tabHeaderLi = ' <li class="tabLiActive"><button><span> NAV? </span></button>|<button class="removeTabCard">X</button></li>'
        let tabBodySection = '<section class="tabBodyActive"> NAV? ' + random + 'SECTION </section>'
        that.addLl.insertAdjacentHTML('beforeend', tabHeaderLi)
        that.addSection.insertAdjacentHTML('beforeend', tabBodySection)
        that.init()
    }
    removeTabBar(that: any) {
        // 获取它的父元素 li 的索引号， 然后再阻止冒泡
        event.stopPropagation()
        let index = this.parentNode.index
        // remove() 方法可以删除元素
        that.tabList[index].remove()        
        that.tabBodySection[index].remove()
        that.init()
        if (document.querySelector('.tabLiActive')) return
        if (index == 0 ) {
            index++
        }
        index--
        that.tabList[index] && that.tabList[index].click()
    }
    editTabBar() {
        // window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection().empty();
        let typeValue = this.innerHTML
        
        this.innerHTML = '<input type="Text" />'
        let input = this.children[0]
        input.value = typeValue
        input.select()
        input.addEventListener('blur', function() {
            this.parentNode.innerHTML = this.value
        })
        
        input.addEventListener('keyup', function(event: any) {
            if (event.keyCode  == 13 ) {
                this.blur()
            }
        })
    }
}

new tabBar('.tabs')
