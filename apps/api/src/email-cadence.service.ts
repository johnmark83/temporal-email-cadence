/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { Cadence, EnrollmentState, Step } from './common';
import cadenceDb from './mock-database/cadences.json';
import { getTemporalClient } from './tempora';

@Injectable()
export class EmailCadenceService {
	getCadences(id?: string): Cadence[] {
		let cadences = cadenceDb as any[];
		if (id) {
			cadences = cadences.filter(c => c.id === id) || [];
		}

		return cadences as Cadence[];
	}

	createCadence(input: Cadence): Cadence {
		try {
			cadenceDb.push(input);
			return input;
		} catch (error) {
			console.error('Error creating cadence:', error);
			throw error;
		}
	}

	updateCadence(id: string, input: Partial<Cadence>): Cadence {
		try {
			const index = cadenceDb.findIndex(c => c.id === id);
			if (index === -1) {
				throw new Error(`Cadence with ID ${id} not found`);
			}
			const updatedCadence = { ...cadenceDb[index], ...input };
			cadenceDb[index] = updatedCadence;
			return updatedCadence as Cadence;
		} catch (error) {
			console.error('Error updating cadence:', error);
			throw error;
		}
	}

	async getEnrollments(id: string): Promise<EnrollmentState> {
		const client = await getTemporalClient();
		const handle = client.workflow.getHandle(id);

		const status = (await handle.query('getState')) as EnrollmentState;
		return status;
	}

	async updateEnrollmentCadence(input: Step[], id: string) {
		const client = await getTemporalClient();
		const handle = client.workflow.getHandle(id);
		const status = await handle.query('getState') as EnrollmentState;
		await handle.signal('updateCadence', input);

		this.updateCadence(status.cadenceId, { steps: input });
	}

	async startEnrollment(input: { cadenceId: string; contactEmail: string }) {
		try {
			const cadence = cadenceDb.find(c => c.id === input.cadenceId);

			if (!cadence) {
				throw new Error(`Cadence with ID ${input.cadenceId} not found`);
			}
			const workflowId = `enrollment-${Math.random().toString(36).substring(2, 15)}`;
			const client = await getTemporalClient();
			const handle = await client.workflow.start('enrollmentWorkflow', {
				args: [cadence, input.contactEmail],
				taskQueue: process.env.TEMPORAL_TASK_QUEUE || 'my-task-queue',
				workflowId,
			});

			return {
				message: 'Enrollment started successfully',
				enrollmentId: handle.workflowId,
			};
		} catch (error) {
			console.error('Error starting enrollment:', error);
			throw error;
		}
	}
}
