export const COLORS = {
  primary: '#6C5CE7',
  primaryDark: '#5A4BD1',
  primaryLight: '#A29BFE',
  secondary: '#00CEC9',
  accent: '#FD79A8',
  warning: '#FDCB6E',
  success: '#00B894',
  error: '#FF7675',

  white: '#FFFFFF',
  black: '#2D3436',
  gray100: '#F8F9FA',
  gray200: '#E9ECEF',
  gray300: '#DEE2E6',
  gray400: '#CED4DA',
  gray500: '#ADB5BD',
  gray600: '#868E96',
  gray700: '#495057',
  gray800: '#343A40',

  background: '#F8F9FA',
  card: '#FFFFFF',
  text: '#2D3436',
  textSecondary: '#636E72',
  textLight: '#B2BEC3',
  border: '#E9ECEF',
};

export const FONTS = {
  h1: { fontSize: 28, fontWeight: '800', color: COLORS.text },
  h2: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  h3: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  h4: { fontSize: 16, fontWeight: '600', color: COLORS.text },
  body: { fontSize: 14, fontWeight: '400', color: COLORS.text },
  bodyBold: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  caption: { fontSize: 12, fontWeight: '400', color: COLORS.textSecondary },
  small: { fontSize: 10, fontWeight: '400', color: COLORS.textLight },
};

export const SIZES = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  radius: 12,
  radiusSm: 8,
  radiusLg: 20,
  radiusFull: 999,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
};
