import { ThemeProvider as Provider } from "@/hooks/use-theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <Provider defaultTheme="dark" storageKey="firstwave-theme">
      {children}
    </Provider>
  );
}
