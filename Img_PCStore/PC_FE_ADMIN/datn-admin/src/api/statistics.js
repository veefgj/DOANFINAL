import Instance from "../axios/Instance";

export const getStatisticsfromYear =  (year) => {

    const url = `api/admin/statis/thong-ke-theo-nam?year=${year}`
    return Instance.get(url);
}

export const getStatisticsfromMonth =  (month, year) => {

    const url = `api/admin/statis/thong-ke-theo-thang?month=${month}&year=${year}`
    return Instance.get(url);
}

export const getStatisticsfromDay =  (day, month, year) => {

    const url = `api/admin/statis/thong-ke-theo-ngay?day=${day}&month=${month}&year=${year}`
    return Instance.get(url);
}