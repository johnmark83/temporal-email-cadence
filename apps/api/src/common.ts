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

export type Cadence = {
	id: string;
	name: string;
	steps: Step[];
};

export type EnrollmentState = {
	currentStepIndex: number;
	status: string;
	stepsVersion: number;
	cadenceId: string;
};
