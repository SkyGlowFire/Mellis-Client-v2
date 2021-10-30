export function capitalize(str:string | undefined = ''): string{
    return str && str.length > 0 
    ? str[0].toUpperCase() + str.slice(1)
    : ''
}

export function fromUrlString(str:string | undefined = ''):string{
    return str && str.length > 0 
    ? capitalize(str.replaceAll('_', ' ')).replaceAll('and', '&')
    : ''
}

export function toUrlString(str:string | undefined = ''):string{
    return str && str.length > 0 
    ? str.toLowerCase().replaceAll(' ', '_')
    : ''
}