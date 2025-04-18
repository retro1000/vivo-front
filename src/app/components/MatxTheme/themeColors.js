// Centralized system colors with meaningful names
const systemColors = {
  // Whites and Grays
  white: '#ffffff',
  lightGrayBackground: '#fafafa',
  paperGray: '#222A45',
  darkSlate: '#1a2038',
  mutedGray: '#6b7280',
  darkGray: '#4b5563',
  titleGray: '#1f2937',
  black: '#000000',

  // Reds
  trendingRed: '#ef4444',
  errorRed: '#FF3D57',
  redDark: '#dd3333',
  coralRed: '#FF4F30',

  // Blues
  primaryBlue: '#2563eb',
  lightBlue: 'rgb(216, 229, 247)',
  blueMedium: '#1976d2',

  // Purples
  purpleLight: '#7467ef',
  purpleMedium: '#6a75c9',

  // Yellows and Oranges
  amberYellow: '#eab308',
  secondaryLightOrange: '#f9a352',
  secondaryMainOrange: '#ff9e43',
  secondaryDarkOrange: '#ff932e',
  yellowOrange: '#FFAF38',

  // Greens
  shippingGreen: '#16a34a',

  // Text Colors (Light Theme)
  textPrimaryLight: 'rgba(52, 49, 76, 1)',
  textSecondaryLight: 'rgba(52, 49, 76, 0.54)',
  textDisabledLight: 'rgba(52, 49, 76, 0.38)',
  textHintLight: 'rgba(52, 49, 76, 0.38)',

  // Text Colors (Dark Theme)
  textPrimaryDark: '#fff',
  textSecondaryDark: 'rgba(255, 255, 255, 0.7)',
  textDisabledDark: 'rgba(255, 255, 255, 0.64)',
  textHintDark: 'rgba(255, 255, 255, 0.64)',
};

// Define tag colors using systemColors
const tagColors = {
  New: {
    backgroundColor: systemColors.yellowOrange,
    color: systemColors.white,
  },
  Sale: {
    backgroundColor: systemColors.trendingRed,
    color: systemColors.white,
  },
  Trending: {
    backgroundColor: systemColors.primaryBlue,
    color: systemColors.white,
  },
  'Limited Stock': {
    backgroundColor: systemColors.amberYellow,
    color: systemColors.white,
  },
  'Best Seller': {
    backgroundColor: systemColors.purpleLight,
    color: systemColors.white,
  },
  'Out of Stock': {
    backgroundColor: systemColors.mutedGray,
    color: systemColors.white,
  },
  Exclusive: {
    backgroundColor: systemColors.shippingGreen,
    color: systemColors.white,
  },
  'Pre-Order': {
    backgroundColor: systemColors.purpleMedium,
    color: systemColors.white,
  },
  Clearance: {
    backgroundColor: systemColors.coralRed,
    color: systemColors.white,
  },
  'Hot Deal': {
    backgroundColor: systemColors.secondaryMainOrange,
    color: systemColors.white,
  },
};

// Text configurations using system colors
const textLight = {
  primary: systemColors.textPrimaryLight,
  secondary: systemColors.textSecondaryLight,
  disabled: systemColors.textDisabledLight,
  hint: systemColors.textHintLight,
};

const textDark = {
  primary: systemColors.textPrimaryDark,
  secondary: systemColors.textSecondaryDark,
  disabled: systemColors.textDisabledDark,
  hint: systemColors.textHintDark,
};

// Secondary and error color configurations using system colors
const secondaryColor = {
  light: systemColors.secondaryLightOrange,
  main: systemColors.secondaryMainOrange,
  dark: systemColors.secondaryDarkOrange,
  contrastText: systemColors.textPrimaryLight,
};

const errorColor = {
  main: systemColors.errorRed,
};

export const themeColors = {
  whitePurple: {
    palette: {
      type: 'light',
      primary: {
        main: systemColors.white,
        contrastText: systemColors.textPrimaryLight,
      },
      secondary: {
        main: systemColors.purpleLight,
        contrastText: systemColors.white,
      },
      background: {
        paper: systemColors.white,
        default: systemColors.lightGrayBackground,
      },
      error: errorColor,
      text: textLight,
      custom: systemColors, // Make system colors accessible in theme
      tagColors: tagColors, // Make tag colors accessible in theme
    },
  },
  whiteBlue: {
    palette: {
      type: 'light',
      primary: {
        main: systemColors.white,
        contrastText: systemColors.textPrimaryLight,
      },
      secondary: {
        main: systemColors.blueMedium,
        contrastText: systemColors.white,
      },
      background: {
        paper: systemColors.white,
        default: systemColors.lightGrayBackground,
      },
      text: textLight,
      custom: systemColors,
      tagColors: tagColors,
    },
  },
  slateDark1: {
    palette: {
      type: 'dark',
      primary: {
        main: systemColors.paperGray,
        contrastText: systemColors.white,
      },
      secondary: {
        main: systemColors.secondaryMainOrange,
        contrastText: systemColors.textPrimaryLight,
      },
      error: errorColor,
      background: {
        paper: systemColors.paperGray,
        default: systemColors.darkSlate,
      },
      text: textDark,
      custom: systemColors,
      tagColors: tagColors,
    },
  },
  slateDark2: {
    palette: {
      type: 'dark',
      primary: {
        main: systemColors.darkSlate,
        contrastText: systemColors.white,
      },
      secondary: {
        main: systemColors.secondaryMainOrange,
        contrastText: systemColors.textPrimaryLight,
      },
      error: errorColor,
      background: {
        paper: systemColors.paperGray,
        default: systemColors.darkSlate,
      },
      text: textDark,
      custom: systemColors,
      tagColors: tagColors,
    },
  },
  purple1: {
    palette: {
      type: 'light',
      primary: {
        main: systemColors.purpleLight,
        contrastText: systemColors.white,
      },
      secondary: secondaryColor,
      error: errorColor,
      background: {
        paper: systemColors.white,
        default: systemColors.lightGrayBackground,
      },
      text: textLight,
      custom: systemColors,
      tagColors: tagColors,
    },
  },
  purple2: {
    palette: {
      type: 'light',
      primary: {
        main: systemColors.purpleMedium,
        contrastText: systemColors.white,
      },
      secondary: {
        main: systemColors.secondaryMainOrange,
        contrastText: systemColors.textPrimaryLight,
      },
      error: errorColor,
      background: {
        paper: systemColors.white,
        default: systemColors.lightGrayBackground,
      },
      text: textLight,
      custom: systemColors,
      tagColors: tagColors,
    },
  },
  purpleDark1: {
    palette: {
      type: 'dark',
      primary: {
        main: systemColors.purpleLight,
        contrastText: systemColors.white,
      },
      secondary: {
        main: systemColors.secondaryMainOrange,
        contrastText: systemColors.textPrimaryLight,
      },
      error: errorColor,
      background: {
        paper: systemColors.paperGray,
        default: systemColors.darkSlate,
      },
      text: textDark,
      custom: systemColors,
      tagColors: tagColors,
    },
  },
  purpleDark2: {
    palette: {
      type: 'dark',
      primary: {
        main: systemColors.purpleMedium,
        contrastText: systemColors.white,
      },
      secondary: {
        main: systemColors.secondaryMainOrange,
        contrastText: systemColors.textPrimaryLight,
      },
      error: errorColor,
      background: {
        paper: systemColors.paperGray,
        default: systemColors.darkSlate,
      },
      text: textDark,
      custom: systemColors,
      tagColors: tagColors,
    },
  },
  blue: {
    palette: {
      type: 'light',
      primary: {
        main: systemColors.blueMedium,
        contrastText: systemColors.white,
      },
      secondary: {
        main: systemColors.yellowOrange,
        contrastText: systemColors.textPrimaryLight,
      },
      error: errorColor,
      background: {
        paper: systemColors.white,
        default: systemColors.lightGrayBackground,
      },
      text: textLight,
      custom: systemColors,
      tagColors: tagColors,
    },
  },
  blueDark: {
    palette: {
      type: 'dark',
      primary: {
        main: systemColors.blueMedium,
        contrastText: systemColors.white,
      },
      secondary: {
        main: systemColors.coralRed,
        contrastText: systemColors.textPrimaryLight,
      },
      error: errorColor,
      background: {
        paper: systemColors.paperGray,
        default: systemColors.darkSlate,
      },
      text: textDark,
      custom: systemColors,
      tagColors: tagColors,
    },
  },
  red: {
    palette: {
      type: 'dark',
      primary: {
        main: systemColors.redDark,
        contrastText: systemColors.white,
      },
      secondary: {
        main: systemColors.black,
        contrastText: systemColors.textPrimaryLight,
      },
      error: errorColor,
      text: textLight,
      custom: systemColors,
      tagColors: tagColors,
    },
  },
};

export const themeShadows = [
  'none',
  '0px 2px 1px -1px rgba(0, 0, 0, 0.06),0px 1px 1px 0px rgba(0, 0, 0, 0.042),0px 1px 3px 0px rgba(0, 0, 0, 0.036)',
  '0px 3px 1px -2px rgba(0, 0, 0, 0.06),0px 2px 2px 0px rgba(0, 0, 0, 0.042),0px 1px 5px 0px rgba(0, 0, 0, 0.036)',
  '0px 3px 3px -2px rgba(0, 0, 0, 0.06),0px 3px 4px 0px rgba(0, 0, 0, 0.042),0px 1px 8px 0px rgba(0, 0, 0, 0.036)',
  '0px 2px 4px -1px rgba(0, 0, 0, 0.06),0px 4px 5px 0px rgba(0, 0, 0, 0.042),0px 1px 10px 0px rgba(0, 0, 0, 0.036)',
  '0px 3px 5px -1px rgba(0, 0, 0, 0.06),0px 5px 8px 0px rgba(0, 0, 0, 0.042),0px 1px 14px 0px rgba(0, 0, 0, 0.036)',
  '0px 3px 5px -1px rgba(0, 0, 0, 0.06),0px 6px 10px 0px rgba(0, 0, 0, 0.042),0px 1px 18px 0px rgba(0, 0, 0, 0.036)',
  '0px 4px 5px -2px rgba(0, 0, 0, 0.06),0px 7px 10px 1px rgba(0, 0, 0, 0.042),0px 2px 16px 1px rgba(0, 0, 0, 0.036)',
  '0px 5px 5px -3px rgba(0, 0, 0, 0.06),0px 8px 10px 1px rgba(0, 0, 0, 0.042),0px 3px 14px 2px rgba(0, 0, 0, 0.036)',
  '0px 5px 6px -3px rgba(0, 0, 0, 0.06),0px 9px 12px 1px rgba(0, 0, 0, 0.042),0px 3px 16px 2px rgba(0, 0, 0, 0.036)',
  '0px 6px 6px -3px rgba(0, 0, 0, 0.06),0px 10px 14px 1px rgba(0, 0, 0, 0.042),0px 4px 18px 3px rgba(0, 0, 0, 0.036)',
  '0px 6px 7px -4px rgba(0, 0, 0, 0.06),0px 11px 15px 1px rgba(0, 0, 0, 0.042),0px 4px 20px 3px rgba(0, 0, 0, 0.036)',
  '0px 7px 8px -4px rgba(0, 0, 0, 0.06),0px 12px 17px 2px rgba(0, 0, 0, 0.042),0px 5px 22px 4px rgba(0, 0, 0, 0.036)',
  '0px 7px 8px -4px rgba(0, 0, 0, 0.06),0px 13px 19px 2px rgba(0, 0, 0, 0.042),0px 5px 24px 4px rgba(0, 0, 0, 0.036)',
  '0px 7px 9px -4px rgba(0, 0, 0, 0.06),0px 14px 21px 2px rgba(0, 0, 0, 0.042),0px 5px 26px 4px rgba(0, 0, 0, 0.036)',
  '0px 8px 9px -5px rgba(0, 0, 0, 0.06),0px 15px 22px 2px rgba(0, 0, 0, 0.042),0px 6px 28px 5px rgba(0, 0, 0, 0.036)',
  '0px 8px 10px -5px rgba(0, 0, 0, 0.06),0px 16px 24px 2px rgba(0, 0, 0, 0.042),0px 6px 30px 5px rgba(0, 0, 0, 0.036)',
  '0px 8px 11px -5px rgba(0, 0, 0, 0.06),0px 17px 26px 2px rgba(0, 0, 0, 0.042),0px 6px 32px 5px rgba(0, 0, 0, 0.036)',
  '0px 9px 11px -5px rgba(0, 0, 0, 0.06),0px 18px 28px 2px rgba(0, 0, 0, 0.042),0px 7px 34px 6px rgba(0, 0, 0, 0.036)',
  '0px 9px 12px -6px rgba(0, 0, 0, 0.06),0px 19px 29px 2px rgba(0, 0, 0, 0.042),0px 7px 36px 6px rgba(0, 0, 0, 0.036)',
  '0px 10px 13px -6px rgba(0, 0, 0, 0.06),0px 20px 31px 3px rgba(0, 0, 0, 0.042),0px 8px 38px 7px rgba(0, 0, 0, 0.036)',
  '0px 10px 13px -6px rgba(0, 0, 0, 0.06),0px 20px 31px 3px rgba(0, 0, 0, 0.042),0px 8px 38px 7px rgba(0, 0, 0, 0.036)',
  '0px 10px 13px -6px rgba(0, 0, 0, 0.06),0px 20px 31px 3px rgba(0, 0, 0, 0.042),0px 8px 38px 7px rgba(0, 0, 0, 0.036)',
  '0px 10px 13px -6px rgba(0, 0, 0, 0.06),0px 20px 31px 3px rgba(0, 0, 0, 0.042),0px 8px 38px 7px rgba(0, 0, 0, 0.036)',
  '0px 10px 13px -6px rgba(0, 0, 0, 0.06),0px 20px 31px 3px rgba(0, 0, 0, 0.042),0px 8px 38px 7px rgba(0, 0, 0, 0.036)',
];