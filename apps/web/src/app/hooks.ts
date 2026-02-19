import { useState } from 'react';
import { createCadence, getCadences, updateCadence, getEnrollments, updateEnrollmentCadence, startEnrollment } from './api';

export function useCadences() {
	const [cadences, setCadences] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function fetchData(id: string = '') {
		try {
			setLoading(true);
			setError(null);

			const result = await getCadences(id);
			setCadences(result);
		} catch (err: any) {
			if (err.name !== 'AbortError') {
				setError(err.message || 'An error occurred while fetching cadences');
			}
		} finally {
			setLoading(false);
		}
	}

	return { cadences, loading, error, fetchData, setError };
}

export function useCreateCadence() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const execute = async (payload: any) => {
		try {
			setLoading(true);
			setError(null);
			setSuccess(false);

			const result = await createCadence(payload);
			setSuccess(true);
			return result;
		} catch (err: any) {
			setError(err.message || 'An error occurred while creating cadence');
		} finally {
			setLoading(false);
		}
	};

	return { execute, loading, error, success, setError };
}

export function useUpdateCadence() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const execute = async (id: string, payload: any) => {
		try {
			setLoading(true);
			setError(null);
			setSuccess(false);

			const result = await updateCadence(id, payload);
			setSuccess(true);
			return result;
		} catch (err: any) {
			setError(err.message || 'An error occurred while updating cadence');
		} finally {
			setLoading(false);
		}
	};

	return { execute, loading, error, success, setError };
}

export function useEnrollments() {
	const [enrollmentState, setEnrollmentState] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function fetchData(id: string) {
		if (id.trim() === '') {
			setError('Enrollment ID cannot be empty');
			setLoading(false);
			setEnrollmentState(null);
			return;
		}

		try {
			setLoading(true);
			setError(null);

			const result = await getEnrollments(id);
			setEnrollmentState(result);
		} catch (err: any) {
			if (err.name !== 'AbortError') {
				setError(err.message || 'An error occurred while fetching enrollments');
			}
		} finally {
			setLoading(false);
		}
	}

	return { enrollmentState, loading, error, fetchData, setError };
}

export function useUpdateEnrollmentCadence() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const execute = async (id: string, steps: any) => {
		try {
			setLoading(true);
			setError(null);
			setSuccess(false);

			const result = await updateEnrollmentCadence(id, steps);
			setSuccess(true);
			return result;
		} catch (err: any) {
			setError(err.message || 'An error occurred');
		} finally {
			setLoading(false);
		}
	};

	return { execute, loading, error, success, setError };
}

export function useStartEnrollment() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [resultMessage, setResultMessage] = useState<string | null>(null);

	const execute = async (cadenceId: string, contactEmail: string) => {
		try {
			setLoading(true);
			setError(null);
			setSuccess(false);

			const res = await startEnrollment(cadenceId, contactEmail);
			setSuccess(true);
			setResultMessage(JSON.stringify(res));
			return res.message;
		} catch (err: any) {
			setError(err.message || 'An error occurred while starting enrollment');
		} finally {
			setLoading(false);
		}
	};

	return { execute, loading, error, success, setError, resultMessage };
}
