import { AppModule } from './app.module'
import * as session from 'express-session'
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

    app.use(
        session({
            secret: 'nest-syte',
            resave: false,
            saveUninitialized: false,
        }),
    );
    app.use(function (req, res, next) {
        res.locals.session = req.session;
        const flashErrors: string[] = req.session.flashErrors;
        if (flashErrors) {
          res.locals.flashErrors = flashErrors;
          req.session.flashErrors = null;
        }
        next();
    });
    app.use('/admin*', function (req, res, next) {
        if (req.session.user && req.session.user.role == 'admin') {
          next();
        } else {
          res.redirect('/');
        }
      });
      
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();