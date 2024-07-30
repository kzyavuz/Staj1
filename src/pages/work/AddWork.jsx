import { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Typography,
	TextField,
	Button,
	Card,
	CardContent,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AddWork() {
	const [workName, setWorkName] = useState('');
	const [workDescription, setWorkDescription] = useState('');
	const [workPrice, setWorkPrice] = useState('');
	const [district, setDistrict] = useState('');
	const [city, setCity] = useState('');
	const [workLocal, setWorkLocal] = useState('');
	const [workEmployeeCount, setWorkEmployeeCount] = useState('');
	const [employeeID, setEmployeeID] = useState('');
	const [employees, setEmployees] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const fetchEmployees = async () => {
			try {
				const response = await axios.get('https://localhost:44352/api/employee/EmployeeList');
				setEmployees(response.data);
			} catch (err) {
				setError('Çalışan listesi alınamadı');
				console.error('Error fetching employees:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchEmployees();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('https://localhost:44352/api/work/CreateWork', {
				workName,
				workDescription,
				workPrice,
				district,
				city,
				workLocal,
				workEmployeeCount,
				employeeID,
			});
			console.log('İş eklendi:', response.data);
			navigate('/work/WorkIndex');
		} catch (error) {
			console.error('İş ekleme hatası:', error);
		}
	};

	return (
		<Card component="form" onSubmit={handleSubmit}>
			<CardContent>
				<Typography variant="h5" component="div" gutterBottom>
					Yeni İş Ekleme Ekranı
				</Typography>
				<TextField
					label="İş Adı"
					value={workName}
					onChange={(e) => setWorkName(e.target.value)}
					fullWidth
					margin="normal"
					required
				/>
				<TextField
					label="İş Açıklaması"
					value={workDescription}
					onChange={(e) => setWorkDescription(e.target.value)}
					fullWidth
					margin="normal"
					required
				/>
				<TextField
					label="Ücret"
					value={workPrice}
					onChange={(e) => setWorkPrice(e.target.value)}
					fullWidth
					margin="normal"
					required
				/>
				<TextField
					label="il"
					value={city}
					onChange={(e) => setCity(e.target.value)}
					fullWidth
					margin="normal"
					required
				/>
				<TextField
					label="İlçe"
					value={district}
					onChange={(e) => setDistrict(e.target.value)}
					fullWidth
					margin="normal"
					required
				/>
				<TextField
					label="Açık Adres"
					value={workLocal}
					onChange={(e) => setWorkLocal(e.target.value)}
					fullWidth
					margin="normal"
					required
				/>
				<TextField
					label="Personel Sayısı"
					value={workEmployeeCount}
					onChange={(e) => setWorkEmployeeCount(e.target.value)}
					fullWidth
					margin="normal"
					required
				/>
				<FormControl fullWidth margin="normal" required>
					<InputLabel id="employee-select-label">Personel Seç</InputLabel>
					<Select
						labelId="employee-select-label"
						value={employeeID}
						onChange={(e) => setEmployeeID(e.target.value)}
					>
						{employees.map((employee) => (
							<MenuItem key={employee.employeeID} value={employee.employeeID}>
								{employee.employeeName} {employee.employeeSurName}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Button type="submit" variant="contained" color="primary">
					Ekle
				</Button>
			</CardContent>
		</Card>
	);
}

export default AddWork;
