import { CssBaseline, GlobalStyles, ThemeProvider, createTheme } from "@mui/material";
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
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            textAlign: "left",  // Change position globally (right, left, center)
            marginLeft: 1
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: "none", // Removes the shadow
          },
        },
      },
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
      MuiTabs: {
        styleOverrides: {
          root: {
            fontSize: '14px',
            fontFamily: 'Poppins, Arial, sans-serif', // Ensure Tabs use the font
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            fontSize: '14px',
            fontFamily: 'Poppins, Arial, sans-serif', // Ensure Lists use the font
          },
        },
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
            fontSize: '14px',
            fontFamily: 'Poppins, Arial, sans-serif', // Apply Poppins to MenuItem text
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          }
        }
      },
      // MuiTypography: {
      //   styleOverrides: {
      //     body2: {
      //       color: '#9c9c9c'
      //     },
      //   },
      // },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            fontSize: '14px',
            fontFamily: 'Poppins, Arial, sans-serif', // Apply Poppins to MenuItem text
          },
          listbox: {
            fontSize: '14px', // Set your desired font size here
            fontFamily: 'Poppins, Arial, sans-serif', // Apply Poppins to MenuItem text
          },
        },
      },
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

  const AnimationStyles = () => (
    <GlobalStyles
      styles={{
        '@keyframes growWidth': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
        '@keyframes revealText': {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        '@keyframes slideInRight': {
          '0%': { transform: 'translateX(50px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        '@keyframes sweep': {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        '@keyframes wiggle': {
          '0%, 100%': { transform: 'rotate(12deg)' },
          '50%': { transform: 'rotate(0deg)' },
        },
        '@keyframes float1': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-10px, -5px)' },
        },
        '@keyframes float2': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(10px, -8px)' },
        },
        '@keyframes float3': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-5px, -12px)' },
        },
        '@keyframes float4': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(8px, -6px)' },
        },
      }}
    />
  );

  return (
    <ThemeProvider theme={customTheme}>
      <AnimationStyles />
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MatxTheme;
