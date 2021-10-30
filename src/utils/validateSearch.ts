export const validateQueryString = (queryString: string, minPrice: number, maxPrice: number): string => {
    const queryFilters = new URLSearchParams(queryString);
    const priceQuery = queryFilters.get('price');
    if (!priceQuery) return queryString
    let newQuery = queryString
    let values = priceQuery.slice(1, -1).split(' ');
    if (values.length === 2) {
        let min = Number(values[0]);
        let max = Number(values[1]);
        if(min < minPrice || min > maxPrice || min > max){
            min = minPrice
        }
        if(max > maxPrice || max < minPrice){
            max = maxPrice
        }
        const newPrice = `[${min}+${max}]`
        newQuery = newQuery.replace(/price=(\[\d\+\d\])/i, newPrice)
    }
    return newQuery
}
