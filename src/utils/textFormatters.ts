export function capitalize(str:string | undefined = ''): string{
    return str && str.length > 0 
    ? str.split(' ').map(word => {
        return ['&', 'and'].includes(word)
            ? word
            : word[0].toUpperCase() + word.slice(1)
    }).join(' ')
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