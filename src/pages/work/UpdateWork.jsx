import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
	TextField,
	Button,
	Card,
	CardContent,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';

function UpdateWork() {
	const { id } = useParams();
	const workID = id;
	const [workName, setWorkName] = useState('');
	const [workDescription, setWorkDescription] = useState('');
	const [workPrice, setWorkPrice] = useState('');
	const [workLocal, setWorkLocal] = useState('');
	const [workEmployeeCount, setWorkEmployeeCount] = useState('');
	const [employeeID, setEmployeeID] = useState('');
	const [employees, setEmployees] = useState([]);
	const [district, setDistrict] = useState('');
	const [city, setCity] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchWorkDetails = async () => {
			try {
				const response = await axios.post(`https://localhost:44352/api/work/WorkDetails/${workID}`, {
					workID,
				});
				const work = response.data;
				setWorkName(work.workName);
				setWorkDescription(work.workDescription);
				setWorkPrice(work.workPrice);
				setWorkLocal(work.workLocal);
				setWorkEmployeeCount(work.workEmployeeCount);
				setEmployeeID(work.employeeID);
				setDistrict(work.district);
				setCity(work.city);
			} catch (err) {
				setError('Detaylar alınırken bir hata oluştu.');
				console.error('Error fetching work details:', err);
			} finally {
				setLoading(false);
			}
		};
		const fetchEmployees = async () => {
			try {
				const response = await axios.get('https://localhost:44352/api/employee/EmployeeList');
				setEmployees(response.data);
			} catch (err) {
				setError('Çalışan listesi alınamadı');
				console.error('Error fetching employees:', err);
			}
		};
		fetchWorkDetails();
		fetchEmployees();
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('https://localhost:44352/api/work/UpdateWork', {
				workID,
				workName,
				workDescription,
				workPrice,
				workLocal,
				workEmployeeCount,
				employeeID,
				district,
				city,
			});
			console.log('İş güncellendi:', response.data);
			navigate('/work/WorkIndex');
		} catch (error) {
			console.error('İş güncelleme hatası:', error);
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
				<Typography variant="h5" component="div">
					İş Güncelleme Sayfası
				</Typography>
				<TextField
					label="İş Adı"
					value={workName}
					onChange={(e) => setWorkName(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<TextField
					label="İş Açıklaması"
					value={workDescription}
					onChange={(e) => setWorkDescription(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<TextField
					label="Açık Adres"
					value={workLocal}
					onChange={(e) => setWorkLocal(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<TextField
					label="İş Fiyatı"
					value={workPrice}
					onChange={(e) => setWorkPrice(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<TextField
					label="İl"
					value={city}
					onChange={(e) => setCity(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<TextField
					label="İlçe"
					value={district}
					onChange={(e) => setDistrict(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<TextField
					label="Personel Sayısı"
					value={workEmployeeCount}
					onChange={(e) => setWorkEmployeeCount(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<FormControl fullWidth margin="normal">
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
				<Button variant="contained" color="primary" type="submit">
					Güncelle
				</Button>
			</CardContent>
		</Card>
	);
}

export default UpdateWork;
