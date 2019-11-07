getFriend.onclick = () => {
    const request = new XMLHttpRequest
    request.open('GET', '/friends.json')
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            console.log(JSON.parse(request.response));
        }
    }
    request.send()
}

let friends = document.createElement('script')
friends.src = 'http://qq-com:8888/friends.js'
document.body.appendChild(friends)
// 如果没有这个onload函数，log执行得比friends加载更快，报错
friends.onload = () => { console.log(xxx) }