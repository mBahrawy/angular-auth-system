export const checkItemInArray = (item: any, arr: any[]) : boolean => {
    return arr.findIndex(i=>i===item) !== -1
}
