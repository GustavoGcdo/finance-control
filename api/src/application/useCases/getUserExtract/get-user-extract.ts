import { Result } from '../../../@shared/result';
import { GetUserExtractDto } from './get-user-extract.dto';
import { UserExtractDto } from './user-extract.dto';

export interface GetUserExtract {
    handle(getUserExtractDto: GetUserExtractDto): Promise<Result<UserExtractDto>>;
}
