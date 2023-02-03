import { IOperationRepository } from '../../repositories/operation-repository.interface';
import { Result } from '../../../@shared/result';

export class DeleteOperation {
  constructor(private readonly operationRepository: IOperationRepository) {}
  
  async handle(id: string) {
    await this.operationRepository.remove(id);
    return new Result(null, 'operation removed successfully', true, []);
  }
}
