import { v4 as uuid } from 'uuid';

import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
/**
 * @example
 * {
 *	id: number,
 *	type: "group" | "item",
 *	title: string,
 *	Icon: NodeElement
 *	menuChildren?: {title: string, href: string}[]
 *  menuMinWidth?: number
 * }
 */

const NAV_LINKS_CONFIG = [
	{
		id: uuid(),
		type: 'group',
		title: 'Personel Listeleri',
		Icon: BarChartOutlinedIcon,
		menuChildren: [
			{
				title: 'Tüm Persponel Listesi',
				href: '/employee/EmployeeIndex',
			},
			{
				title: 'Persponel Ekle',
				href: '/employee/AddEmployee',
			},
		],
	},
	{
		id: uuid(),
		type: 'group',
		title: 'İş İşlemleri',
		Icon: BarChartOutlinedIcon,
		menuChildren: [
			{
				title: 'İş Listesi',
				href: '/work/WorkIndex',
			},
		],
	},
];

export default NAV_LINKS_CONFIG;
