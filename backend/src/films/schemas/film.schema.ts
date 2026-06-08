import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FilmDocument = Film & Document;

@Schema()
class Session {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  daytime: string;

  @Prop({ required: true })
  hall: number;

  @Prop({ required: true })
  rows: number;

  @Prop({ required: true })
  seats: number;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [String], default: [] })
  taken: string[];
}

@Schema({ collection: 'films' })
export class Film {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  image: string;

  @Prop()
  cover: string;

  @Prop()
  description: string;

  @Prop()
  about: string;

  @Prop()
  rating: number;

  @Prop()
  director: string;

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: [Session], default: [] })
  schedule: Session[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
