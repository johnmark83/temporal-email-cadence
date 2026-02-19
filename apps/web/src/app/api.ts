const apiUrl = process.env.API_URL || `http://localhost:${process.env.API_PORT || 3001}`;

export const getCadences = async (id?: string, signal?: AbortSignal) => {
	const response = await fetch(`${apiUrl}/cadences${id ? `/${id}` : ''}`, { signal });
	if (!response.ok) {
		throw new Error(`Failed to fetch cadences: ${response.statusText}`);
	}
	return response.json();
};

export const createCadence = async (cadenceData: any) => {
	const response = await fetch(`${apiUrl}/cadences`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(cadenceData),
	});
	if (!response.ok) {
		throw new Error(`Failed to create cadence: ${response.statusText}`);
	}
	return response.json();
};

export const updateCadence = async (id: string, cadenceData: any) => {
	const response = await fetch(`${apiUrl}/cadences/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(cadenceData),
	});
	if (!response.ok) {
		throw new Error(`Failed to update cadence: ${response.statusText}`);
	}
	return response.json();
};

export const getEnrollments = async (id: string, signal?: AbortSignal) => {
	const response = await fetch(`${apiUrl}/enrollments/${id}`, { signal });
	if (!response.ok) {
		throw new Error(`Failed to fetch enrollments: ${response.statusText}`);
	}
	return response.json();
};

export const updateEnrollmentCadence = async (id: string, steps: any) => {
	const response = await fetch(`${apiUrl}/enrollments/${id}/update-cadence`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(steps),
	});
	if (!response.ok) {
		throw new Error(`Failed to update enrollment cadence: ${response.statusText}`);
	}
	return response.json();
};

export const startEnrollment = async (cadenceId: string, contactEmail: string) => {
	const response = await fetch(`${apiUrl}/enrollments`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ cadenceId, contactEmail }),
	});
	if (!response.ok) {
		throw new Error(`Failed to start enrollment: ${response.statusText}`);
	}
	return response.json();
};
