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
	Select,
	Box,
	FormControl,
	MenuItem,
	InputLabel,
	Paper,
} from '@mui/material';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeInfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function WorkIndex() {
	const [work, setWork] = useState([]);
	const [listType, setListType] = useState('all');
	const [column, setColumn] = useState([]);
	const navigate = useNavigate();

	const updateColumns = (type) => {
		const col = [
			{ id: 'workID', label: '#' },
			{ id: 'workName', label: 'Iş Adı' },
			{ id: 'district', label: 'İl' },
			{ id: 'city', label: 'İlçe' },
			{ id: 'employeeID', label: 'Personel ID si' },
		];

		if (type === 'all') {
			col.push({ id: 'createDateTime', label: 'Katılım Tarihi' });
		}
		if (type === 'updated') {
			col.push({ id: 'updateDateTime', label: 'Güncellenme Tarihi' });
		}
		if (type === 'active') {
			col.push({ id: 'activeDateTime', label: 'Aktif Edilme Tarihi' });
		}
		if (type === 'passive') {
			col.push({ id: 'passiveDateTime', label: 'Pasif Edilme Tarihi' });
		}
		col.push({ id: 'actions', label: 'Eylemler' });
		setColumn(col);
	};
	const fetchWork = async (type) => {
		try {
			let endpoint = '';
			if (type === 'all') {
				endpoint = 'https://localhost:44352/api/work/ListWork';
			} else if (type === 'passive') {
				endpoint = 'https://localhost:44352/api/work/ListWorkPassive';
			} else if (type === 'active') {
				endpoint = 'https://localhost:44352/api/work/ListWorkActive';
			} else {
				endpoint = 'https://localhost:44352/api/work/ListWork';
			}
			const response = await axios.get(endpoint);
			console.log('API Response:', response.data);
			setWork(response.data);
			updateColumns(type);
		} catch (error) {
			console.error('Error fetching work:', error);
		}
	};

	useEffect(() => {
		fetchWork(listType);
	}, [listType]);

	const handleListTypeChange = (event) => {
		setListType(event.target.value);
	};

	const deleteWork = async (workID) => {
		try {
			await axios.post('https://localhost:44352/api/work/DeleteWork', {
				workID,
			});
			fetchWork(listType);
		} catch (error) {
			console.error('Error deleting work:', error);
		}
	};

	const workDetails = (workID) => {
		navigate(`/work/UpdateWork/${workID}`);
	};

	return (
		<Card component="section" className="mt-5">
			<CardHeader title="İş Listesi" subheader="İş Listesi" />
			<Box display="flex" justifyContent="space-between" alignItems="center" className="mb-3">
				<Button
					className="mb-3"
					onClick={() => navigate('/work/AddWork')}
					variant="contained"
					disableElevation
					endIcon={<AddIcon />}
				>
					İş Ekle
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
						<MenuItem value="all">Tüm İş Listesi</MenuItem>
						<MenuItem value="active">Aktif İş Listesi</MenuItem>
						<MenuItem value="passive">Pasif İş Listesi</MenuItem>
					</Select>
				</FormControl>
			</Box>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							{column.map((col) => (
								<TableCell key={col.id}>{col.label}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{work.length > 0 ? (
							work.map((work) => (
								<TableRow key={work.workID} hover tabIndex={-1}>
									<TableCell>{work.workID}</TableCell>
									<TableCell>{work.workName || 'veri bulunamadı'}</TableCell>
									<TableCell>{work.city || 'veri bulunamadı'}</TableCell>
									<TableCell>{work.district || 'veri bulunamadı'}</TableCell>
									<TableCell>{work.employeeID || 'veri bulunamadı'}</TableCell>
									{listType === 'all' && <TableCell>{work.createDateTime || '...'}</TableCell>}
									{listType === 'active' && <TableCell>{work.activeDateTime || '...'}</TableCell>}
									{listType === 'passive' && <TableCell>{work.passiveDateTime || '...'}</TableCell>}
									<TableCell>
										<Tooltip title="İş Detayı" arrow>
											<IconButton
												aria-label="info"
												color="warning"
												size="small"
												onClick={() => workDetails(work.workID)}
											>
												<ModeInfoOutlinedIcon fontSize="medium" />
											</IconButton>
										</Tooltip>
										<Tooltip title="Sil" arrow>
											<IconButton
												aria-label="delete"
												color="error"
												size="small"
												onClick={() => deleteWork(work.workID)}
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
								<TableCell colSpan={6} align="center">
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

export default WorkIndex;
