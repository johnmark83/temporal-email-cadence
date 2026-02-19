import { proxyActivities, defineQuery, defineSignal, setHandler } from '@temporalio/workflow';
import type * as activities from './activities';

export type Step =
	| {
			id: string;
			type: 'SEND_EMAIL';
			subject: string;
			body: string;
	  }
	| {
			id: string;
			type: 'WAIT';
			seconds: number;
	  };

type Cadence = {
	id: string;
	name: string;
	steps: Step[];
};

type EnrollmentState = {
	currentStepIndex: number;
	status: string;
	stepsVersion: number;
};

const { sendEmail, wait } = proxyActivities<typeof activities>({
	startToCloseTimeout: '30 minute',
});

//Create worker to run enrollment workflow
export const updateCadenceSignal = defineSignal<[{steps: Step[]}]>('updateCadence');
export const getState = defineQuery<EnrollmentState>('getState');

export async function enrollmentWorkflow(cadence: Cadence, contactEmail: string): Promise<void> {
	let currentStepIndex = 0;
	let stepsVersion = 1;
	let steps = [...cadence.steps];
	let status = 'ACTIVE';

	setHandler(updateCadenceSignal, (input: {steps: Step[]}) => {
		const updatedSteps = input.steps;
		if (updatedSteps.length - 1 <= currentStepIndex) {
			status = 'COMPLETED';
		}

		steps = [...updatedSteps];
		stepsVersion++;
	});

	setHandler(getState, () => {
		return {
			currentStepIndex,
			status,
			stepsVersion,
			cadenceId: cadence.id,
		};
	});

	while (currentStepIndex <= steps.length - 1) {
		const step = steps[currentStepIndex];

		if (step.type === 'SEND_EMAIL') {
			await sendEmail(step.subject, step.body, contactEmail);
		} else if (step.type === 'WAIT') {
			await wait(step.seconds);
		}

		if (currentStepIndex < steps.length - 1) {
			currentStepIndex++;
		} else {
			break;
		}
	}

	status = 'COMPLETED';
}
