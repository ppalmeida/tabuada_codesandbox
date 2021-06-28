import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

export default function Providers({ children }) {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      {children}
      <CssBaseline />
    </ThemeProvider>
  );
}
