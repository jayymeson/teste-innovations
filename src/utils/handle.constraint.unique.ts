import {
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';

export function handleErrorConstraintUnique(error: Error): never {
  const splitedMessage = error.message.split('`');

  const errorMessage = `Input '${
    splitedMessage[splitedMessage.length - 2]
  }' is not respecting the UNIQUE constraint  `;

  throw new UnprocessableEntityException(errorMessage);
}

export function handleErrorStatus(error: Error): never {
  const splitedMessage = error.message.split('`');

  const errorMessage = `Input is not respecting the Order Status: must be Active or Inactive`;

  throw new BadRequestException(errorMessage);
}
