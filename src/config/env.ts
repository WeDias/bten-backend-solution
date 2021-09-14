import { resolve } from 'path';

import { config } from 'dotenv-safe';

config({ path: resolve(__dirname, '../../.env') });