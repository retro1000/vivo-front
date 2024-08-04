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
      fontFamily: 'Poppins, Arial, sans-serif', // Add Poppins to the font family
    },
    components: {
      ...activeTheme.components,
      MuiTextField: {
        defaultProps: {
          size: 'small'
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontFamily: 'Poppins, Arial, sans-serif', // Apply Poppins to MenuItem text
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          root: {
            fontFamily: 'Poppins, Arial, sans-serif', // Apply Poppins to MenuItem text
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
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
