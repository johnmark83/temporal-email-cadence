'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './page.module.css';
import { useCadences, useCreateCadence, useUpdateCadence, useEnrollments, useUpdateEnrollmentCadence, useStartEnrollment } from './hooks';

export default function Home() {
	//Refs
	const createCadenceRef = useRef<HTMLTextAreaElement>(null);
	const updateCadenceIdRef = useRef<HTMLInputElement>(null);
	const updateCadenceDataRef = useRef<HTMLTextAreaElement>(null);
	const updateEnrollmentIdRef = useRef<HTMLInputElement>(null);
	const updateEnrollmentDataRef = useRef<HTMLTextAreaElement>(null);
	const startEnrollmentCadenceIdRef = useRef<HTMLInputElement>(null);
	const startEnrollmentContactEmailRef = useRef<HTMLInputElement>(null);
	const enrollmentIdRef = useRef<HTMLInputElement>(null);
	const cadenceIdRef = useRef<HTMLInputElement>(null);

	//API Hooks
	const {
		cadences,
		loading: getCadencesLoading,
		error: getCadencesError,
		fetchData: getCadencesQuery,
		setError: setGetCadencesError,
	} = useCadences();
	const {
		execute: createCadenceExecute,
		loading: createCadenceLoading,
		error: createCadenceError,
		success: createCadenceSuccess,
		setError: setCreateCadenceError,
	} = useCreateCadence();
	const {
		execute: updateCadenceExecute,
		loading: updateCadenceLoading,
		error: updateCadenceError,
		success: updateCadenceSuccess,
		setError: setUpdateCadenceError,
	} = useUpdateCadence();
	const {
		execute: updateEnrollmentExecute,
		loading: updateEnrollmentLoading,
		error: updateEnrollmentError,
		success: updateEnrollmentSuccess,
		setError: setUpdateEnrollmentError,
	} = useUpdateEnrollmentCadence();
	const {
		enrollmentState,
		loading: enrollmentLoading,
		error: enrollmentError,
		fetchData: getEnrollmentsQuery,
		setError: setEnrollmentError,
	} = useEnrollments();
	const {
		execute: startEnrollmentExecute,
		loading: startEnrollmentLoading,
		error: startEnrollmentError,
		success: startEnrollmentSuccess,
		setError: setStartEnrollmentError,
		resultMessage: startEnrollmentResultMessage,
	} = useStartEnrollment();

	//Handlers
	async function handleCreateCadence() {
		try {
			const parsed = JSON.parse(createCadenceRef.current?.value || '{}');
			await createCadenceExecute(parsed);
		} catch (err: any) {
			console.error('Error creating cadence:', err);
			setCreateCadenceError(err?.message || 'Error creating cadence');
		}
	}

	async function handleUpdateCadence() {
		const id = updateCadenceIdRef.current?.value;
		if (!id) {
			return;
		}

		try {
			const parsed = JSON.parse(updateCadenceDataRef.current?.value || '{}');
			await updateCadenceExecute(id, parsed);
		} catch (err: any) {
			console.error('Error updating cadence:', err);
			setUpdateCadenceError(err?.message || 'Error updating cadence');
		}
	}

	async function handleUpdateEnrollment() {
		const id = updateEnrollmentIdRef.current?.value;
		if (!id) {
			setUpdateEnrollmentError('Enrollment ID is required');
			return;
		}

		try {
			const parsed = JSON.parse(updateEnrollmentDataRef.current?.value || '{}');
			await updateEnrollmentExecute(id, parsed);
		} catch (err: any) {
			console.error('Error updating enrollment:', err);
			setUpdateCadenceError(err?.message || 'Error updating enrollment');
		}
	}

	async function handleGetCadences() {
		try {
			await getCadencesQuery(cadenceIdRef.current?.value || '');
		} catch (err: any) {
			console.error('Error fetching cadences:', err);
			setGetCadencesError(err?.message || 'Error fetching cadences');
		}
	}

	async function handleGetEnrollments() {
		try {
			await getEnrollmentsQuery(enrollmentIdRef.current?.value || '');
		} catch (err: any) {
			console.error('Error fetching enrollments:', err);
			setEnrollmentError(err?.message || 'Error fetching enrollments');
		}
	}

	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<hr />
				<div className={styles.intro}>
					<h3>GET /cadences/:id </h3>
					<input type="text" style={{ width: '20%', marginBottom: '8px' }} ref={cadenceIdRef} defaultValue="cad_12345" />
					<textarea
						value={
							getCadencesLoading
								? 'Loading...'
								: getCadencesError
									? `Error fetching cadences: ${getCadencesError}`
									: cadences.length > 0
										? JSON.stringify(cadences, null, 2)
										: 'No cadences found'
						}
						readOnly
						style={{
							width: '100%',
							height: '400px',
							overflow: 'auto',
							resize: 'none',
						}}
					/>
					<button onClick={handleGetCadences} style={{ marginTop: '8px' }}>
						Get Cadences
					</button>
				</div>
				<hr />
				<div className={styles.intro}>
					<h3>POST /cadences</h3>
					{createCadenceLoading && <p>Creating...</p>}
					{createCadenceError && <p style={{ color: 'red' }}>Error creating cadence: {createCadenceError}</p>}
					{createCadenceSuccess && <p style={{ color: 'green' }}>Cadence created successfully!</p>}
					<textarea
						ref={createCadenceRef}
						style={{
							width: '100%',
							height: '400px',
							overflow: 'auto',
							resize: 'none',
						}}
						defaultValue={JSON.stringify(
							{
								id: 'cad_57545',
								name: 'Welcome Flow',
								steps: [
									{
										id: '1',
										type: 'SEND_EMAIL',
										subject: 'Welcome',
										body: 'Hello there',
									},
									{
										id: '2',
										type: 'WAIT',
										seconds: 10,
									},
									{
										id: '3',
										type: 'SEND_EMAIL',
										subject: 'Follow up',
										body: 'Checking in',
									},
								],
							},
							null,
							2,
						)}
					/>
					<button onClick={handleCreateCadence} style={{ marginTop: '8px' }} disabled={createCadenceLoading}>
						Create Cadence
					</button>
				</div>
				<hr />
				<div className={styles.intro}>
					<h3>PUT /cadences/:id</h3>
					{updateCadenceLoading && <p>Updating...</p>}
					{updateCadenceError && <p style={{ color: 'red' }}>Error updating cadence: {updateCadenceError}</p>}
					{updateCadenceSuccess && <p style={{ color: 'green' }}>Cadence updated successfully!</p>}
					<input
						type="text"
						placeholder="Cadence ID"
						style={{ width: '20%', marginBottom: '8px' }}
						ref={updateCadenceIdRef}
						defaultValue="cad_12345"
					/>
					<textarea
						ref={updateCadenceDataRef}
						defaultValue={JSON.stringify(
							{
								name: 'Welcome Flow version 2',
								steps: [
									{
										id: '1',
										type: 'SEND_EMAIL',
										subject: 'Welcome',
										body: 'Hello there',
									},
									{
										id: '2',
										type: 'WAIT',
										seconds: 10,
									},
									{
										id: '3',
										type: 'SEND_EMAIL',
										subject: 'Follow up',
										body: 'Checking in',
									},
								],
							},
							null,
							2,
						)}
						style={{
							width: '100%',
							height: '400px',
							overflow: 'auto',
							resize: 'none',
						}}
					/>
					<button onClick={handleUpdateCadence} style={{ marginTop: '8px' }} disabled={updateCadenceLoading}>
						Update Cadence
					</button>
				</div>
				<br />
				<h4>Enrollments</h4>
				<hr />
				<div className={styles.intro}>
					<h3>GET /enrollments/:id</h3>
					<input type="text" placeholder="Enrollment ID (required)" style={{ width: '20%', marginBottom: '8px' }} ref={enrollmentIdRef} />
					<textarea
						value={
							enrollmentLoading
								? 'Loading...'
								: enrollmentError
									? `Error fetching enrollments: ${enrollmentError}`
									: enrollmentState
										? JSON.stringify(enrollmentState, null, 2)
										: 'No enrollments found'
						}
						readOnly
						style={{
							width: '100%',
							height: '180px',
							overflow: 'auto',
							resize: 'none',
						}}
					/>
					<button onClick={handleGetEnrollments} style={{ marginTop: '8px' }}>
						Get Enrollment State
					</button>
				</div>
				<hr />
				<div className={styles.intro}>
					<h3>POST /enrollments/:id/update-cadence</h3>
					{updateEnrollmentLoading && <p>Updating...</p>}
					{updateEnrollmentError && <p style={{ color: 'red' }}>Error updating enrollment: {updateEnrollmentError}</p>}
					{updateEnrollmentSuccess && <p style={{ color: 'green' }}>Enrollment updated successfully!</p>}
					<input type="text" placeholder="Enrollment ID" style={{ width: '20%', marginBottom: '8px' }} ref={updateEnrollmentIdRef} />
					<textarea
						ref={updateEnrollmentDataRef}
						style={{
							width: '100%',
							height: '400px',
							overflow: 'auto',
							resize: 'none',
						}}
						defaultValue={JSON.stringify(
							{
								steps: [
									{
										id: "1",
										type: "SEND_EMAIL",
										subject: "Welcome",
										body: "Hello there"
									},
									{
										id: "2",
										type: "WAIT",
										seconds: 10
									},
									{
										id: "3",
										type: "WAIT",
										seconds: 100
									},
									{
										id: "4",
										type: "SEND_EMAIL",
										subject: "Follow up",
										body: "Checking in"
									}
								]
							}, null, 2
						)}	
					/>
					<button onClick={handleUpdateEnrollment} style={{ marginTop: '8px' }} disabled={updateEnrollmentLoading}>
						Update Enrollment
					</button>
				</div>
				<hr />
				<div className={styles.intro}>
					<h3>POST /enrollments</h3>
					{startEnrollmentLoading && <p>Starting enrollment...</p>}
					{startEnrollmentError && <p style={{ color: 'red' }}>Error starting enrollment: {startEnrollmentError}</p>}
					{startEnrollmentSuccess && <p style={{ color: 'green' }}>Enrollment started successfully!</p>}
					<input
						type="text"
						placeholder="Cadence ID"
						style={{ width: '20%', marginBottom: '8px' }}
						ref={startEnrollmentCadenceIdRef}
						defaultValue="cad_12345"
					/>
					<input
						type="text"
						placeholder="Contact Email"
						style={{ width: '20%', marginBottom: '8px' }}
						ref={startEnrollmentContactEmailRef}
						defaultValue="test@example.com"
					/>
					<textarea
						value={
							startEnrollmentLoading
								? 'Loading...'
								: startEnrollmentError
									? `Error starting enrollment: ${startEnrollmentError}`
									: startEnrollmentResultMessage || ''
						}
						readOnly
						style={{
							width: '100%',
							height: '180px',
							overflow: 'auto',
							resize: 'none',
						}}
					/>
					<button
						onClick={() => {
							const cadenceId = startEnrollmentCadenceIdRef.current?.value;
							const contactEmail = startEnrollmentContactEmailRef.current?.value;
							if (cadenceId && contactEmail) {
								startEnrollmentExecute(cadenceId, contactEmail);
							} else {
								setStartEnrollmentError('Cadence ID and Contact Email are required');
							}
						}}
						style={{ marginTop: '8px' }}
						disabled={startEnrollmentLoading}
					>
						Start Enrollment
					</button>
				</div>
			</main>
		</div>
	);
}
