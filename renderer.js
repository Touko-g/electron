const information = document.getElementById('info');
information.innerText =
    `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`
;

versions.updateMessage((event, value) => {
    console.log(value)
    document.getElementById('message').innerText = value
})
// 在渲染器进程使用导出的 API
window.myAPI.doAThing()