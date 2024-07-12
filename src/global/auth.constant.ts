import { SetMetadata } from '@nestjs/common';

export const PUBLIC_KEY = 'PUBLIC_KEY';

export const skipAuth = () => SetMetadata(PUBLIC_KEY, true);
