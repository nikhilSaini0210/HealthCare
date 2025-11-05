import Svg, { Path } from 'react-native-svg';
import { colors } from '../../styles/colors';
import { IconProps } from '../../types/interfaces';
import React, { FC } from 'react';

const CalendarIcon: FC<IconProps> = ({
  color = colors.primaryText,
  size = 26,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <Path
        d="M5.57143 1.625V3.25H2.78571C1.24777 3.25 0 4.3418 0 5.6875V8.125H26V5.6875C26 4.3418 24.7522 3.25 23.2143 3.25H20.4286V1.625C20.4286 0.726172 19.5987 0 18.5714 0C17.5442 0 16.7143 0.726172 16.7143 1.625V3.25H9.28571V1.625C9.28571 0.726172 8.4558 0 7.42857 0C6.40134 0 5.57143 0.726172 5.57143 1.625ZM26 9.75H0V23.5625C0 24.9082 1.24777 26 2.78571 26H23.2143C24.7522 26 26 24.9082 26 23.5625V9.75Z"
        fill={color}
      />
    </Svg>
  );
};

export default CalendarIcon;
