export const LIST_VIEW = 'list'
export const CHART_VIEW = 'chart'

export const padLeft = (n: number) => {
    return n < 10 ? '0' + n : n
}

export const range = (size: number, startAt: number = 0) => {
    const arr = []
    for (let i = 0; i < size; i++) {
        arr[i] = startAt + i
    }
    return arr
}