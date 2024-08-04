import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

// 传入UTC则将时间转换为UTC时间
export const conversionUtcDate = (date: Date | string) => dayjs(date).utc().toDate();
