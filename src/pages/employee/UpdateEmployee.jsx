import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

function EmployeeUpdate() {
	const { id } = useParams();
	const employeeID = id;
	const [employeeName, setEmployeeName] = useState('');
	const [employeeSurName, setEmployeeSurName] = useState('');
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setUserPassword] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchEmployeeDetails = async () => {
			try {
				const response = await axios.post(`https://localhost:44352/api/employee/EmployeeDetailsList/${id}`, {
					id,
				});
				const employee = response.data;
				setEmployeeName(employee.employeeName);
				setEmployeeSurName(employee.employeeSurName);
				setUserName(employee.userName);
				setEmail(employee.email);
				setUserPassword(employee.password);
			} catch (err) {
				setError('Çalışan bilgileri alınamadı');
				console.error('Error fetching employee details:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchEmployeeDetails();
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('https://localhost:44352/api/employee/UpdateEmployee', {
				employeeID,
				employeeName,
				employeeSurName,
				userName,
				email,
				password,
			});
			console.log('Personel güncellendi:', response.data);
			navigate('/employee/EmployeeIndex');
		} catch (error) {
			console.error('Hata personel güncellenmedi (hand):', error);
		}
	};

	if (loading) {
		return <div>Yükleniyor...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<Card component="form" onSubmit={handleSubmit} className="mt-5">
			<CardContent>
				<Typography variant="h5" component="div" gutterBottom>
					Personel Güncelleme Ekranı
				</Typography>
				<TextField
					label="Personel Adı"
					value={employeeName}
					onChange={(e) => setEmployeeName(e.target.value)}
					fullWidth
					margin="normal"
					required
				/>
				<TextField
					label="Personel Soyadı"
					value={employeeSurName}
					onChange={(e) => setEmployeeSurName(e.target.value)}
					fullWidth
					margin="normal"
					required
				/>
				<TextField
					label="Kullanıcı Adı"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					fullWidth
					margin="normal"
					required
				/>
				<TextField
					label="E Posta Adresi"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					fullWidth
					margin="normal"
					required
				/>
				<TextField
					label="Şifre"
					value={password}
					onChange={(e) => setUserPassword(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<Button type="submit" variant="contained" color="primary">
					Güncelle
				</Button>
			</CardContent>
		</Card>
	);
}

export default EmployeeUpdate;
