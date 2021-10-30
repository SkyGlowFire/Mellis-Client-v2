import {createTheme, responsiveFontSizes} from '@mui/material/styles'
import {paletteOptions} from './palette'
import componentsOverrides from './components'

let MyTheme = createTheme({
    palette: paletteOptions,
    components: componentsOverrides
})

MyTheme = responsiveFontSizes(MyTheme, {factor: 3})

export {MyTheme}
