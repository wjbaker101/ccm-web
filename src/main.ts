import { createApp } from 'vue';
import dayjs from 'dayjs';

import useRelativeTime from 'dayjs/plugin/relativeTime';
import useUtc from 'dayjs/plugin/utc';

import App from '@/App.vue';

dayjs.extend(useRelativeTime);
dayjs.extend(useUtc);

createApp(App)
    .mount('#app');
