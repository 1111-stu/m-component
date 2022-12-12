// 把驼峰转换成横杠连接
export const toLine = (value: string) => {
    return value.replace(/(A-Z)g/, '-$1').toLocaleLowerCase()
}
// 使用for...in方法之前要对key进行类型判断
export function isValidKey(
    key: string | number | symbol,
    object: object
): key is keyof typeof object {
    return key in object;
}