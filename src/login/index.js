// 1体验打包
// 1.1准备项目和源代码
import { checkCode, checkPhone } from '@/utils/check'
console.log(checkPhone('13812345678'))
console.log(checkCode('66666688'))
// 1.2准备webpack打包环境
// npm i webpack webpack-cli --save-dev
// 1.3运行自定义命令打包观察webpack效果（npm run 自定义命令）
// npm run build

// // 结合./public/index.js编写js核心代码
// document.querySelector('.btn').addEventListener('click', () => {
//   // 在登录页的login-form表单中，名字=mobile的元素，取值
//   const phone = document.querySelector('.login-form [name=mobile]').value
//   const code = document.querySelector('.login-form [name=code]').value
//   // 调用引入的封装的函数，如果不符合则进入条件
//   if (!checkPhone(phone)) {
//     console.log('手机号长度必须是11位')
//     return
//   }
//   // 如果手机号符合要求，再校验验证码
//   if (!checkCode(code)) {
//     console.log('验证码长度必须是6位')
//     return
//   }
//   // 如果两个if都没有进去，则符合要求
//   console.log('提交到服务器登录...')
// })

// 引入第三方的样式在前，可以自己到node_module文件夹当中直接找到路径，前提是得先npm i bootstrap引入后才会有提示
import 'bootstrap/dist/css/bootstrap.min.css'

// 准备css代码，并引入到js中，由于css属于纯输出效果，没有逻辑需要获取到，因此不引入相关{变量}from'文件'
import './index.css'
import './index.less'

// 将此配置放到主业务逻辑中的顶部，以影响后续所有逻辑
// if表达式需要与webpack.config.js 打包配置中设置的key一致，在运行时，左侧表达式原地运行，被webpack替换的字符串，如果是'production'，则执行生产环境
// if (process.env.NODE_ENV === 'production') {
//   // 给console的log属性，重新、覆盖性，赋予空函数
//   console.log = function () {}
// }

// 上述if条件表达式，等价于
process.env.NODE_ENV === 'production'
  ? (console.log = function () {})
  : console.log

console.log('开发模式下好用，生产模式下失效')

//注意:js中引入本地图片资源要用 import 方式(如果是网络图片http地址，字符串可以直按写)
import imgObj from './assets/logo-4kb.png'
// 创建图片标签
const theImg = document.createElement('img')
// 给标签src属性赋予地址
theImg.src = imgObj
// 获取需要加入图片的html标签，并通过appendChild方式加img标签到此标签尾部
document.querySelector('.login-wrap').appendChild(theImg)

// npm下包，往项目中加入axios第三方包

// ================================

// 导入自己封装的axios和alert；或者叫引入方法

// 默认引入，随便定义一个变量，默认导入名字自定义，路径是回到上一级，然后是业务文件夹里面的request.js
import myAxios from '@/utils/request.js'

// 命名导入，需要在大括号中写入同名，以作引入
import { myAlert } from '@/utils/alert.js'

// 注意，引入后，需要在本业务中使用，否则vscode显示灰色，如果是设置了格式化保存，案例保存ctrl+s，则会自动删掉没有使用到的引入

// 将此前监听的打印log业务，加上函数调用，通过调用函数使用引入模块

// 结合./public/index.js编写js核心代码
document.querySelector('.btn').addEventListener('click', () => {
  // 在登录页的login-form表单中，名字=mobile的元素，取值
  const phone = document.querySelector('.login-form [name=mobile]').value
  const code = document.querySelector('.login-form [name=code]').value
  // 调用引入的封装的函数，如果不符合则进入条件
  if (!checkPhone(phone)) {
    myAlert(false, '手机号长度必须是11位')
    console.log('手机号长度必须是11位')
    return
  }
  // 如果手机号符合要求，再校验验证码
  if (!checkCode(code)) {
    myAlert(false, '验证码长度必须是6位')
    console.log('验证码长度必须是6位')
    return
  }
  // 如果两个if都没有进去，则符合要求
  console.log('提交到服务器登录...')

  myAxios({
    // 接口文档
    url: '/v1_0/authorizations',
    method: 'post',
    data: {
      mobile: phone,
      code: code,
    },
  })
    .then((result) => {
      myAlert(true, '登陆成功')
      // 保存登录成功后服务器返回的token到本地，以后续打开其他页面时验证
      localStorage.setItem('token', result.data.token)
      setTimeout(() => {
        // 不同页面不同文件夹，需要../返回上一级
        location.href = '../content/index.html'
      }, 1500)
      console.log(result)
    })
    .catch((result) => {
      myAlert(false, error.response.data.message)
      console.dir(error.response.data.message)
    })
})

// 打印警告
// console.warn('123')

// alias别名引入路径
// import youAxios from '@/utils/request.js'
// console.log(youAxios)
