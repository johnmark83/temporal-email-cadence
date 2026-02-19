import { NestFactory } from '@nestjs/core';
import { EmailCadenceModule } from './email-cadence.module';

async function bootstrap() {
	const app = await NestFactory.create(EmailCadenceModule);
	app.enableCors({
		origin: [`http://localhost:${process.env.WEB_PORT || 3000}`],
		credentials: true,
	});
	await app.listen(process.env.API_PORT || 3001);
}
bootstrap();
