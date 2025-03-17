import dayjs from 'dayjs';

export function transformToReviewDate(date: dayjs.ConfigType) {
  return dayjs(date).format('MMMM DD, YYYY');
}
