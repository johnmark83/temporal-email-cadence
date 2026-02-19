import { log, sleep } from '@temporalio/activity';

export async function sendEmail(to: string, subject: string, body: string): Promise<{ success: boolean; messageId: string; timestamp: number }> {
	log.info(`Sending email to ${to} with subject "${subject}" and body "${body}"`);
	const messageId = `msg-${Math.random().toString(36).substr(2, 9)}`;
	return {
		success: true,
		messageId,
		timestamp: Date.now(),
	};
}

export async function wait(seconds: number): Promise<void> {
	log.info(`Waiting for ${seconds} seconds`);
	await sleep(seconds * 1000);
}
