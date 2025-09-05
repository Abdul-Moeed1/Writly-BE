import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User {
  @ApiProperty()
  @Prop({ required: true, type: String })
  name: string;

  @ApiProperty()
  @Prop({ required: true, unique: true, type: String })
  email: string;

  @ApiProperty()
  @Prop({ required: true, type: String })
  password: string;

  @ApiProperty()
  @Prop({ required: true, type: Boolean, default: false })
  isWritter: boolean;

  @ApiProperty()
  @Prop({ required: false, type: String })
  profilePic?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
