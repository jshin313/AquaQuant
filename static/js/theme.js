import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#5abcd8',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        textPrimary: {
            main: '#fff',
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;
