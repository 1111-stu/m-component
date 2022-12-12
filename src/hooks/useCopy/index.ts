import { ElMessage } from 'element-plus'
export const useCopy = (text:string)=>{
    // 创建输入框
    const input = document.createElement('input')
    //将input的值设置为需要复制的内容
    input.value = text
    // 把input追加到body里面
    document.body.appendChild(input)
    //选中输入框的内容
    input.select()
    // 执行复制操作
    document.execCommand('Copy')
    //移除输入框
    document.body.removeChild(input)
     // 提示复制成功信息
     ElMessage.success('复制成功')
}