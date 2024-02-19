import { ExpressMiddlewareInterface } from 'routing-controllers';
import Session from 'supertokens-node/recipe/session';
import supertokens from 'supertokens-node';
import { Inject, Service } from 'typedi';
import UserMetadata from 'supertokens-node/recipe/usermetadata';
import { VetRepository } from '@organisation/repository/organisation/vet.repository.impl';
import { AppError } from '@shared/core/AppError';
import LOG from '@shared/infra/logger/logger';

@Service()
export class SetVetIdInSession implements ExpressMiddlewareInterface {
  @Inject()
  private vetRepository: VetRepository;

  async use(request: any, response: any, next?: (err?: any) => any): Promise<any> {
    const session = await Session.getSession(request, response);
    const userId = session.getUserId();
    const { metadata } = await UserMetadata.getUserMetadata(userId);
    if (!metadata.dvVetId) {
      const user = await supertokens.getUser(userId);
      const whatsAppNumber = user?.phoneNumbers[0];
      LOG.info('Vet id not in session for vet %s. Updating metadata now.', whatsAppNumber);
      if (whatsAppNumber) {
        const whatsAppNumberWithoutPlus = whatsAppNumber?.slice(1);
        const vet = await this.vetRepository.getVetByWhatsAppNumber(whatsAppNumberWithoutPlus);
        if (vet) {
          await UserMetadata.updateUserMetadata(userId, { dvVetId: vet.vetId.id.toString() });
        } else {
          LOG.error('vet not found for %s', whatsAppNumberWithoutPlus);
          throw new AppError.UnexpectedError('Invalid user');
        }
      } else {
        LOG.error('whatsapp number not set in supertokens user object %s', JSON.stringify(user));
        throw new AppError.UnexpectedError('Invalid user');
      }
    }
    if (next) {
      next();
    }
  }
}
