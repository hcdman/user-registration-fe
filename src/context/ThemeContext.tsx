import React, { createContext, ReactNode } from 'react';
import { createTheme, ThemeProvider, ThemeOptions, Theme } from '@mui/material/styles';

const theme: Theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: '#f0f0f0', // Custom background color
                    },
                },
            },
        },
    },
} as ThemeOptions);

export const ThemeContext = createContext<Theme>(theme);

interface ThemeContextProviderProps {
    children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
    return (
        <ThemeContext.Provider value={theme}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};
