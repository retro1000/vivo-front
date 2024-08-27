import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import useSettings from "app/hooks/useSettings";
import { darken } from '@mui/system';

import '@fontsource/poppins';

const MatxTheme = ({ children }) => {
  const { settings } = useSettings();
  let activeTheme = { ...settings.themes[settings.activeTheme] };

  const customTheme = createTheme({
    ...activeTheme,
    typography: {
      // fontSize: '14px',
      fontFamily: 'Poppins, Arial, sans-serif', // Add Poppins to the font family
    },
    components: {
      ...activeTheme.components,
      MuiTextField: {
        defaultProps: {
          size: 'small',
          // color: 'secondary'
        },
        styleOverrides: {
          root: {
            fontSize: '14px',
            fontFamily: 'Poppins, Arial, sans-serif',
            '& .MuiInputBase-root': {
              fontSize: '14px',
              fontFamily: 'Poppins, Arial, sans-serif',
            },
            '& .MuiInputLabel-root': {
              fontSize: '14px',
              fontFamily: 'Poppins, Arial, sans-serif',
            },
            '& .MuiFormHelperText-root': {
              fontSize: '12px',
              fontFamily: 'Poppins, Arial, sans-serif',
            },
            '& .MuiInputBase-input::placeholder': {
              fontSize: '14px',
              fontFamily: 'Poppins, Arial, sans-serif',
            },
          },
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: '14px',
            fontFamily: 'Poppins, Arial, sans-serif', // Apply Poppins to MenuItem text
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          root: {
            fontSize: '14px',
            fontFamily: 'Poppins, Arial, sans-serif', // Apply Poppins to MenuItem text
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            fontSize: '15px',
            fontFamily: 'Poppins, Arial, sans-serif', // Apply Poppins to MenuItem text
          },
        },
      },
      // MuiTypography: {
      //   styleOverrides: {
      //     body2: {
      //       color: '#9c9c9c'
      //     },
      //   },
      // },
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: '14px',
            fontFamily: 'Poppins, Arial, sans-serif', // Apply Poppins to Button text
            textTransform: 'none',
            '&:hover': {
              backgroundColor: (theme) => darken(theme.palette.backgroundColor || theme.palette.primary.main, 0.1),
              // transform: 'scale(1.05)',
            },
            transition: 'transform 0.1s ease-in-out',
          },
        },
      },
    }
  })

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MatxTheme;
