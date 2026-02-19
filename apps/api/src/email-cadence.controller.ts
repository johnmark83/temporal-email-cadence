import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { EmailCadenceService } from './email-cadence.service';
import type { Cadence, EnrollmentState, Step } from './common';

@Controller()
export class EmailCadenceController {
	constructor(private readonly emailCadenceService: EmailCadenceService) {}

	//Cadences
	@Get('cadences/:id')
	getCadences(@Param() param?: { id: string }): Cadence[] {
		return this.emailCadenceService.getCadences(param?.id);
	}

	@Post('cadences')
	createCadence(@Body() input: Cadence): Cadence {
		return this.emailCadenceService.createCadence(input);
	}

	@Put('cadences/:id')
	updateCadence(@Body() input: Partial<Cadence>, @Param() param: { id: string }): Cadence {
		return this.emailCadenceService.updateCadence(param.id, input);
	}

	//Enrollments
	@Get('enrollments/:id')
	async getEnrollments(@Param() param: { id: string }): Promise<EnrollmentState> {
		return this.emailCadenceService.getEnrollments(param.id);
	}

	@Post('enrollments/:id/update-cadence')
	async updateEnrollmentCadence(@Body() input: Step[], @Param() param: { id: string }) {
		await this.emailCadenceService.updateEnrollmentCadence(input, param.id);
		return { message: 'Cadence update signal sent successfully' };
	}

	@Post('enrollments')
	async startEnrollment(@Body() input: { cadenceId: string; contactEmail: string }) {
		return this.emailCadenceService.startEnrollment(input);
	}
}
