import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Card, Stack, CircularProgress, Typography } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';

function SignIn() {
	return (
		<Card
			elevation={20}
			sx={{
				display: 'block',
				width: {
					xs: '95%',
					sm: '55%',
					md: '35%',
					lg: '25%',
				},
				margin: 'auto',
				mt: 8,
				p: 4,
			}}
		>
			<Stack direction="column" spacing={5}>
				<div>
					<Typography variant="h1">GİRİŞ SAYFASI</Typography>
					<Typography variant="body2" color="textSecondary">
						Hesap bilgilerinizi kullanarak giriş yapın.
					</Typography>
				</div>
				<LoginForm />
			</Stack>
		</Card>
	);
}

function LoginForm() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await axios.post('https://localhost:44352/api/employee/Login', {
				email,
				password,
			});
			console.log('Giriş başarılı:', response.data);
			setIsLoading(false);
			navigate('/'); // Giriş başarılı ise yönlendirme
		} catch (error) {
			console.error('Giriş başarısız:', error);
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				autoFocus
				color="primary"
				name="email"
				label="E-posta"
				margin="normal"
				variant="outlined"
				fullWidth
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<TextField
				color="primary"
				name="password"
				type="password"
				margin="normal"
				label="Şifre"
				variant="outlined"
				fullWidth
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<Button
				sx={{
					mt: 2,
					textTransform: 'uppercase',
					color: 'primary.contrastText',
					'&:not(:disabled)': {
						background: (theme) =>
							`linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.tertiary.main} 100%)`,
					},
					'&:hover': {
						background: (theme) =>
							`linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.tertiary.dark} 100%)`,
					},
				}}
				type="submit"
				variant="contained"
				disabled={isLoading}
				endIcon={
					isLoading ? (
						<CircularProgress
							color="secondary"
							size={25}
							sx={{
								my: 'auto',
							}}
						/>
					) : (
						<LoginIcon />
					)
				}
				fullWidth
				color="primary"
			>
				Giriş Yap
			</Button>
		</form>
	);
}

export default SignIn;
