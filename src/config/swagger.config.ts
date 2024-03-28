import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


export default function SwaggerConfig(app:INestApplication){

    const config=new DocumentBuilder()
    .setTitle(' *******************  Backend virgool *************')
    .setContact('alireza', null, 'alirezazamanidev80@gmail.com')
    .setDescription('The Backend virgool document')
    .setVersion('v1.0.0')
    .build();
    const document=SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('/swagger',app,document);
}