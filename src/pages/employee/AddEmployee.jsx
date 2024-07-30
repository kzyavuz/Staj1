import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

function AddEmployee() {
	const [employeeName, setEmployeeName] = useState('');
	const [employeeSurName, setEmployeeSurName] = useState('');
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [profilePicture, setProfilePicture] = useState(null);
	const [password, setUserPassword] = useState('');
	const [profileImage, setProfileImage] = useState(null); // Base64 string'i saklamak için state
	const navigate = useNavigate();

	const handleFileChange = (e) => {
		setProfilePicture(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('employeeName', employeeName);
		formData.append('employeeSurName', employeeSurName);
		formData.append('userName', userName);
		formData.append('email', email);
		formData.append('profilePicture', profilePicture);
		formData.append('password', password);

		try {
			const response = await axios.post('https://localhost:44352/api/employee/Register', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			console.log('Personel eklendi:', response.data);
			setProfileImage(response.data.imageBase64); // Yanıt içindeki base64 string'i sakla
			navigate('/employee/EmployeeIndex');
		} catch (error) {
			console.error('Hata personel eklenmedi:', error);
		}
	};

	return (
		<Card component="form" onSubmit={handleSubmit} className="mt-5">
			<CardContent>
				<Typography variant="h5" component="div" gutterBottom>
					Yeni Personel Ekleme Ekranı
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
					required
				/>
				<input type="file" onChange={handleFileChange} />
				{profileImage && (
					<div>
						<h3>Yüklenen Resim:</h3>
						<img src={`data:image/jpeg;base64,${profileImage}`} alt="Profile" />
					</div>
				)}

				<Button type="submit" variant="contained" color="primary">
					Ekle
				</Button>
			</CardContent>
		</Card>
	);
}

export default AddEmployee;
