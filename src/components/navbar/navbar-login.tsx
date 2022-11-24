import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './navbar.css';
import '@fontsource/anton/400.css';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';

export default function NavbarLogin() {
	const theme = createTheme({
		typography: {
			fontFamily: 'Anton, Arial',
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: `
        @font-face {
          font-family: 'Anton';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
        }
      `,
			},
		},
		palette: {
			primary: {
				light: '#FFE066',
				main: '#FFCC00',
				dark: '#002884',
				contrastText: '#fff',
			},
		},
	});


	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1 }}
						>
							<div className="title">NG.CASH</div>
						</Typography>
						
					</Toolbar>
				</AppBar>
			</Box>
		</ThemeProvider>
	);
}
