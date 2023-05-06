import Cookie from "js-cookie";
export default {
    state: {
        //控制菜单的展开还是收起
        isCollapse: false,
        //面包屑数据
        tabList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            },
        ],
        //aside的菜单
        menu: []
    },
    mutations: {
        //修改菜单展开收起的方法
        CollapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //更新面包屑数据
        selectMenu(state, val) {
            //判断添加的数据是否为首页
            if (val.name !== 'home') {
                const a = state.tabList.findIndex(item => item.name === val.name)
                //如果不存在
                if (a === -1) {
                    state.tabList.push(val)
                }
            }
        },
        //删除指定的tag数据
        closeTag(state, item) {
            const index = state.tabList.findIndex(val => val.name === item.name)
            state.tabList.splice(index, 1)
        },
        //动态传入aside权限菜单数据
        getMenu(state, val) {
            state.menu = val
            //将val数据存入Cookie作为缓存
            Cookie.set('menu', JSON.stringify(val))
        },
        addMenu(state, router) {
            //判断缓存中是否有数据
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            //组装动态路由的数据
            const menuArry = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArry.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArry.push(item)
                }
            });
            //路由动态添加
            menuArry.forEach(item => {
                router.addRoute('main', item)
            })
        }

    }
}