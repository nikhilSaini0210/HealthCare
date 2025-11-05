import Svg, { Path } from 'react-native-svg';
import { colors } from '../../styles/colors';
import { IconProps } from '../../types/interfaces';
import React, { FC } from 'react';

const BurgerIcon: FC<IconProps> = ({
  color = colors.primaryText,
  size = 33,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 33 33" fill="none">
      <Path
        d="M0 6.1875C0 5.04668 1.05335 4.125 2.35714 4.125H30.6429C31.9467 4.125 33 5.04668 33 6.1875C33 7.32832 31.9467 8.25 30.6429 8.25H2.35714C1.05335 8.25 0 7.32832 0 6.1875ZM0 16.5C0 15.3592 1.05335 14.4375 2.35714 14.4375H30.6429C31.9467 14.4375 33 15.3592 33 16.5C33 17.6408 31.9467 18.5625 30.6429 18.5625H2.35714C1.05335 18.5625 0 17.6408 0 16.5ZM33 26.8125C33 27.9533 31.9467 28.875 30.6429 28.875H2.35714C1.05335 28.875 0 27.9533 0 26.8125C0 25.6717 1.05335 24.75 2.35714 24.75H30.6429C31.9467 24.75 33 25.6717 33 26.8125Z"
        fill={color}
      />
    </Svg>
  );
};

export default BurgerIcon;
