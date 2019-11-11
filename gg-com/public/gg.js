// 通过给请求的服务器设置CORS来实现跨域请求数据
getFriend.onclick = () => {
    const request = new XMLHttpRequest
    request.open('GET', 'http://qq-com:8888/friends.json')
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            console.log(JSON.parse(request.response));
        }
    }
    request.send()
}

// // JSONP借用script标签的特性，跨域获取数据
// let friends = document.createElement('script')
// friends.src = 'http://qq-com:8888/friends.js'
// document.body.appendChild(friends)
// // 如果没有这个onload函数，log执行得比friends加载更快，报错
// friends.onload = () => { console.log(xxx) }

// 现在我们优化一下上面的代码
// 由于我们给qq.js默认设置了xxx的全局对象，这样并不是太好，可能会出现污染
// 为了解决这个办法，我们随机生成一个函数来避免这个问题
// 同时我们将jsonp封装成一个函数，便于利用

let jsonp = (url) => {
    return new Promise((resolve, reject) => {
        let random = 'alongfreakfunctionname' + Math.random()
        window[random] = (data) => {
            resolve(data)
        }
        const script = document.createElement('script')
        script.src = `${url}?callback=${random}`
        document.body.appendChild(script)
        script.onload = () => {
            script.remove()
        }
        script.onerror = () => {
            reject()
        }
    })
}
jsonp('http://qq-com:8888/friends.js').then((parm) => {
    parm.forEach((item) => {
        console.log(item)
    })
})











