import {Module} from '@nestjs/common';
import {join} from 'path';
import {AuthModule} from './auth/auth.module';
import {AppLogger} from './app.logger';
import {DatabaseModule} from './database/database.module';
import {GraphQLModule} from '@nestjs/graphql';
import {HealthCheckModule} from './healtcheck/healthcheck.module';
import {HomeModule} from './home/home.module';
import {UserModule} from './user/user.module';
import {MessageModule} from './message/message.module';
import {HomeFavoriteModule} from './home-favorite/home-favorite.module';
import {MediaModule} from './media/media.module';
import {HomeMediaModule} from './home-media/home-media.module';

@Module({
	imports: [
		HealthCheckModule,
		DatabaseModule,
		AuthModule,
		UserModule,
		MediaModule,
		HomeModule,
		HomeFavoriteModule,
		HomeMediaModule,
		MessageModule,
		GraphQLModule.forRoot({
			include: [HomeModule, UserModule, HomeFavoriteModule, HomeMediaModule],
			typePaths: ['./**/*.graphql'],
			introspection: true,
			playground: true,
			installSubscriptionHandlers: true,
			definitions: {
				path: join(process.cwd(), 'src/app/graphql.schema.ts'),
				outputAs: 'class'
			},
			context: ({req}) => ({req})
		})
	]
})
export class AppModule {
	private logger = new AppLogger(AppModule.name);

	constructor() {
		this.logger.log('Initialize constructor');
	}
}
