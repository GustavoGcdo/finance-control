import { Dto } from './dto';

export interface Contract {
    validate(dto: Dto): boolean;
}
