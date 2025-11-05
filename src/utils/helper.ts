import { SectionsProps } from '../types/interfaces';

export const sections: SectionsProps[] = [
  { id: 0, label: 'Questions' },
  { id: 1, label: 'Reminders' },
  { id: 2, label: 'Messages' },
  { id: 3, label: 'Calendar' },
];

export const pharmacies = [
  {
    name: 'Path lab pharmacy',
    distance: '5km Away',
    rating: '4.5',
    reviews: '120',
    image: require('../assets/images/imageA.png'),
  },
  {
    name: '24 pharmacy',
    distance: '5km Away',
    rating: '4.5',
    reviews: '120',
    image: require('../assets/images/imageB.png'),
  },
];
