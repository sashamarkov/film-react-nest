import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FilmDocument = Film & Document;

@Schema()
class Session {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  hall: string;

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

  @Prop({ required: true })
  poster: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ type: [String], required: true })
  genre: string[];

  @Prop({ required: true })
  releaseYear: number;

  @Prop({ required: true })
  rating: number;

  @Prop({ type: [Session], default: [] })
  schedule: Session[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
