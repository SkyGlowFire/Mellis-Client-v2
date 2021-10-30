import { Components } from "@mui/material";

const componentsOverrides: Components = {
    MuiLink: {
        styleOverrides: {
            root: {
                cursor: 'pointer'
            }
        }
    },
}

export default componentsOverrides