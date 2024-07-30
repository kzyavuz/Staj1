import { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Button,
	Card,
	CardHeader,
	TableRow,
	TableCell,
	Tooltip,
	IconButton,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	Paper,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Box,
} from '@mui/material';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeInfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function EmployeeIndex() {
	const [employees, setEmployees] = useState([]);
	const [listType, setListType] = useState('active');
	const [columns, setColumns] = useState([]);
	const navigate = useNavigate();

	const updateColumns = (type) => {
		const cols = [
			{ id: 'employeeID', label: '#' },
			{ id: 'employeeName', label: 'Ad' },
			{ id: 'employeeSurName', label: 'Soy Ad' },
			{ id: 'userName', label: 'Kullanıcı Adı' },
			{ id: 'email', label: 'Mail Adresi' },
		];
		if (type === 'all') {
			cols.push({ id: 'createDateTime', label: 'Katılım Tarihi' });
		}
		if (type === 'updated') {
			cols.push({ id: 'updateDateTime', label: 'Güncellenme Tarihi' });
		}
		if (type === 'active') {
			cols.push({ id: 'activeDateTime', label: 'Aktif Edilme Tarihi' });
		}
		if (type === 'passive') {
			cols.push({ id: 'passiveDateTime', label: 'Pasif Edilme Tarihi' });
		}
		cols.push({ id: 'actions', label: 'Eylemler' });
		setColumns(cols);
	};
	const fetchEmployees = async (type) => {
		try {
			let endpoint = '';
			if (type === 'all') {
				endpoint = 'https://localhost:44352/api/employee/EmployeeList';
			} else if (type === 'active') {
				endpoint = 'https://localhost:44352/api/employee/EmployeeActiveList';
			} else if (type === 'passive') {
				endpoint = 'https://localhost:44352/api/employee/EmployeePassiveList';
			} else if (type === 'updated') {
				endpoint = 'https://localhost:44352/api/employee/EmployeeUpdateList';
			} else {
				endpoint = 'https://localhost:44352/api/employee/EmployeeList';
			}
			const response = await axios.get(endpoint);
			console.log('API Response:', response.data);
			setEmployees(response.data);
			updateColumns(type);
		} catch (error) {
			console.error('Error fetching work:', error);
		}
	};

	useEffect(() => {
		fetchEmployees(listType);
	}, [listType]);

	const handleListTypeChange = (event) => {
		setListType(event.target.value);
	};

	const deleteEmployee = async (employeeID) => {
		try {
			await axios.post('https://localhost:44352/api/Employee/DeleteEmployee', {
				employeeID,
			});
			fetchEmployees(listType);
		} catch (error) {
			console.error('Error deleting employee:', error);
		}
	};

	const employeeUpdate = (employeeID) => {
		navigate(`/employee/UpdateEmployee/${employeeID}`);
	};

	return (
		<Card component="section" className="mt-5">
			<CardHeader title="Personel Listesi" subheader="Personel Listesi" />
			<Box display="flex" justifyContent="space-between" alignItems="center" className="mb-3">
				<Button
					onClick={() => navigate('/employee/AddEmployee')}
					variant="contained"
					disableElevation
					endIcon={<AddIcon />}
				>
					Personel Ekle
				</Button>
				<FormControl variant="outlined">
					<InputLabel id="list-type-label">Tablo Seçin</InputLabel>
					<Select
						labelId="list-type-label"
						id="list-type"
						value={listType}
						onChange={handleListTypeChange}
						label="Tablo Seçin"
					>
						<MenuItem value="all">Tüm Personel Listesi</MenuItem>
						<MenuItem value="updated">Güncellenmiş Personel Listesi</MenuItem>
						<MenuItem value="active">Aktif Personel</MenuItem>
						<MenuItem value="passive">Devre Dışı Personel</MenuItem>
					</Select>
				</FormControl>
			</Box>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell key={column.id}>{column.label}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{employees.length > 0 ? (
							employees.map((employee) => (
								<TableRow key={employee.employeeID} hover tabIndex={-1}>
									<TableCell>{employee.employeeID}</TableCell>
									<TableCell>{employee.employeeName || '...'}</TableCell>
									<TableCell>{employee.employeeSurName || '...'}</TableCell>
									<TableCell>{employee.userName || '...'}</TableCell>
									<TableCell>{employee.email || '...'}</TableCell>
									{listType === 'all' && <TableCell>{employee.createDateTime || '...'}</TableCell>}
									{listType === 'updated' && (
										<TableCell>{employee.updateDateTime || '...'}</TableCell>
									)}
									{listType === 'active' && <TableCell>{employee.activeDateTime || '...'}</TableCell>}
									{listType === 'passive' && (
										<TableCell>{employee.passiveDateTime || '...'}</TableCell>
									)}
									<TableCell>
										<Tooltip title="Personel Detay " arrow>
											<IconButton
												aria-label="update"
												color="warning"
												size="small"
												onClick={() => employeeUpdate(employee.employeeID)}
											>
												<ModeInfoOutlinedIcon fontSize="medium" />
											</IconButton>
										</Tooltip>
										<Tooltip title="Personel Sil" arrow>
											<IconButton
												aria-label="delete"
												color="error"
												size="small"
												onClick={() => deleteEmployee(employee.employeeID)}
											>
												<DeleteIcon fontSize="medium" />
											</IconButton>
										</Tooltip>
										<Tooltip title="Devre Dışı Bırak" arrow>
											<IconButton aria-label="disable" color="default" size="small">
												<PersonOffOutlinedIcon fontSize="medium" />
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} align="center">
									Veri bulunamadı
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Card>
	);
}

export default EmployeeIndex;
