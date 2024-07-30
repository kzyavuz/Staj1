import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ScrollToTopOnRouteChange from '@hocs/withScrollTopOnRouteChange';
import withLazyLoadably from '@hocs/withLazyLoadably';

// import MinimalLayout from '@/components/layouts/minimalLayout';
import MainLayout from '@/components/layouts/mainLayout';
import MinimalLayout from '@/components/layouts/minimalLayout';

const SamplePage = withLazyLoadably(lazy(() => import('@/pages/sample')));
const EmployeeIndex = withLazyLoadably(lazy(() => import('@/pages/employee/EmployeeIndex')));
const EmplyeeAdd = withLazyLoadably(lazy(() => import('@/pages/employee/AddEmployee')));
const EmployeeUpdate = withLazyLoadably(lazy(() => import('@/pages/employee/UpdateEmployee')));
const WorkIndex = withLazyLoadably(lazy(() => import('@/pages/work/WorkIndex')));
const AddWork = withLazyLoadably(lazy(() => import('@/pages/work/AddWork')));
const UpdateWork = withLazyLoadably(lazy(() => import('@/pages/work/UpdateWork')));
const Login = withLazyLoadably(lazy(() => import('@/pages/login/SignIn')));

function Router() {
	return (
		<BrowserRouter>
			<ScrollToTopOnRouteChange>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route index element={<SamplePage />} />
						<Route path="samplePage" element={<SamplePage />} />
						<Route path="employee/">
							<Route path="EmployeeIndex" element={<EmployeeIndex />} />
							<Route path="AddEmployee" element={<EmplyeeAdd />} />
							<Route path="UpdateEmployee/:id" element={<EmployeeUpdate />} />
						</Route>
						<Route path="work/">
							<Route path="WorkIndex" element={<WorkIndex />} />
							<Route path="AddWork" element={<AddWork />} />
							<Route path="UpdateWork/:id" element={<UpdateWork />} />
						</Route>
					</Route>
					<Route path="/" element={<MinimalLayout />}>
						<Route path="login/">
							<Route path="SignIn" element={<Login />} />
						</Route>
					</Route>
				</Routes>
			</ScrollToTopOnRouteChange>
		</BrowserRouter>
	);
}

export default Router;
