// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    // Light mode colors
    light: {
      bg: "#ffffff",
      text: "#333333",
      // add more colors as needed
    },
    // Dark mode colors
    dark: {
      bg: "#1a202c",
      text: "#ffffff",
      // add more colors as needed
    }
  },
});

export default theme;
