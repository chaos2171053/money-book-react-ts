export const LIST_VIEW = 'list'
export const CHART_VIEW = 'chart'
export const TYPE_INCOME = 'income'
export const TYPE_OUTCOME = 'outcome'

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

export const parseToYearAndMonth = (str?: string) => {
    const date = str ? new Date(str) : new Date()
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
    }
}

export const isValidDate = (dateString: string) => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false;  // Invalid format
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return false; // Invalid date
    return d.toISOString().slice(0, 10) === dateString;
}