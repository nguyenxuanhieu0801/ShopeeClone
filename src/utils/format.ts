import userImage from '~/assets/images/user.svg';
import { config } from '~/constants';

export const formatCurrency = (currency: number): string => {
  return new Intl.NumberFormat('de-DE').format(currency);
};

export const formatNumberToSocialStyle = (value: number): string => {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase();
};

export const rateSale = (originalPrice: number, salePrice: number): string =>
  Math.round(((originalPrice - salePrice) / originalPrice) * 100) + '%';

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '');

export const generateNameId = ({ name, id }: { name: string; id: string }) =>
  removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`;

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-');
  return arr[arr.length - 1];
};

export const getAvatarUrl = (avatarName?: string) => (avatarName ? `${config.baseUrl}images/${avatarName}` : userImage);
