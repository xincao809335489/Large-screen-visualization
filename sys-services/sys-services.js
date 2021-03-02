const express = require('express');
const bodyParser = require('body-parser');
const Mock = require('mockjs')
const apiData = require('./data/login.json') // 引入模拟接口的部分json数据
const echartsData = require('./data/echarts.json') // 引入模拟接口的部分json数据
const menusData = require('./data/menus.json') // 引入后台返回的路由json
const categories = require('./data/category.json'); // 引入数据分类json数据
const productDatas = require('./data/product.json') //引入产品管理列表数据
let app = express()
const Random = Mock.Random;
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
//模拟数据
let tables = Mock.mock({
    'list|30': [{
        "name|+1": ["王小虎", "王小强", "王小白", "王小黑"],
        "id|+1": 0,
        "address|+1": ["上海市普陀区金沙江路 1518 弄", "上海市普陀区金沙江路 1517 弄", "上海市普陀区金沙江路 1519 弄", "上海市普陀区金沙江路 1516 弄"],
        "date": Random.date(),
        "tag|+1": ["家", "公司"],
    }]
})

let lists = Mock.mock({
    'data|30': [{
        "name|+1": ['斑马', '狮子', '野兔', '毛驴'],
        "id|+1": 0,
        "desc|+1": ['斑马万里奔腾', '狮子真威猛，害怕', '野兔真可爱', '毛驴真萌萌哒'],
        "date": Random.date(),
        "src|+1": ['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg', 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg', 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg']
    }]
})
//处理跨域
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
//解析post请求参数
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json()); //data参数以字典格式传输
//获取表格数据
app.post('/lists', function (req, res) {
    const {
        searchName,
        pageIndex,
        pageSize
    } = req.body
    // pageIndex从1开始
    // let startRow = (pageIndex - 1) * pageSize + 1; //开始显示的行  
    // let endRow = pageIndex * pageSize + 1; //结束显示的行  
    // pageIndex从0开始
    let startRow = pageIndex * pageSize; //开始显示的行
    let endRow = (pageIndex + 1) * pageSize; //结束显示的行  
    const lists = tables.list.slice(startRow, endRow)
    const data = searchName ? lists.filter(item => item.name === searchName) : lists
    res.json(Mock.mock({
        'status': 200,
        'lists': lists,
        "total": tables.list.length
    }))
})
//批量删除数据
app.post('/deleteAllData', function (req, res) {
    let ids = req.body;
    ids = ids.map(id => parseInt(id));
    tables.list = tables.list.filter(u => !ids.includes(u.id));
    res.json(Mock.mock({
        'status': 200,
        'message': "删除成功"
    }))
})
//单条删除
app.post('/delData', function (req, res) {
    const {
        id
    } = req.body.id
    tables.list.splice(id, 1);
    console.log(tables.list.length)
    res.json(Mock.mock({
        'status': 200,
        'message': "删除成功"
    }))
})
//编辑单条数据
app.post('/editData', function (req, res) {
    const info = req.body
    let {
        id,
        name,
        address,
        date,
        tag
    } = info;
    tables.list.some(u => {
        if (u.id === parseInt(id)) {
            u.name = name;
            u.address = address;
            u.date = date;
            u.tag = tag;
            return true;
        }
    });
    res.json(Mock.mock({
        'status': 200,
        'message': '编辑成功'
    }))
})
//新增数据
app.post('/handleAddData', function (req, res) {
    const info = req.body
    info.id = tables.list.length
    tables.list.push(info)
    res.json(Mock.mock({
        'status': 200,
        'message': '新增成功'
    }))
})
//获取列表数据
app.post('/getListsData', function (req, res) {
    const {
        index,
        size
    } = req.body
    console.log(index, size)
    let startRow = index * size; //开始显示的行  
    let endRow = (index + 1) * size; //结束显示的行  
    const data = lists.data.slice(startRow, endRow)
    res.json(Mock.mock({
        'status': 200,
        'data': data,
        'total': lists.data.length
    }))
})
//登录数据
app.post('/login', function (req, res) {
    const username = req.body.username
    res.json(Mock.mock({
        'status': 0,
        'list': apiData[username]
    }))
})
//退出登录
app.get('/logOut', function (req, res) {
    res.json(Mock.mock({
        'status': 0,
        "msg": 'success'
    }))
})
app.get('/routers', function (req, res) {
    res.json(Mock.mock({
        'status': 0,
        "data": menusData.data
    }))
})
//获取北京空气质量aqi
app.get('/quality', function (req, res) {
    res.json(Mock.mock({
        'status': 200,
        "data": echartsData
    }))
})
//获取数据分类数据
app.get('/category', function (req, res) {
    res.json(Mock.mock({
        'status': 200,
        "data": categories
    }))
})
//获取产品分类列表数据
app.get('/product', function (req, res) {
    res.json(Mock.mock({
        'status': 200,
        "data": productDatas
    }))
})
//新增商品数据
app.post('/addShop', function (req, res) {
    const info = req.body
    productDatas.push(info)
    res.json(Mock.mock({
        'status': 200,
        'message': '新增成功'
    }))
})
//单独删除对应的row的tag信息
app.post('/deleteTag', function (req, res) {
    const {
        id,
        tagIndex
    } = req.body
    productDatas.map(item => {
        if(item.id === id){
            item.shopTags.splice(tagIndex,1)
        }
        return item
    })
    res.json(Mock.mock({
        'status': 200,
        'message': '删除tag成功'
    }))
})


//服务监听
const server = app.listen('8090', '0.0.0.0', (req, res) => {
    const host = server.address().address
    const port = server.address().port
    //反问的地址为：http://127.0.0.1:8090（0.0.0.0是没法访问的）
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})