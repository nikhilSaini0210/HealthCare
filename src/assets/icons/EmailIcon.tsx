import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../styles/colors';
import { IconProps } from '../../types/interfaces';

const EmailIcon: FC<IconProps> = ({
  color = colors.primaryText,
  size = 20,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M2.5 6.875C2.15625 6.875 1.875 7.15625 1.875 7.5V8.36328L8.61328 13.8945C9.42188 14.5586 10.582 14.5586 11.3906 13.8945L18.125 8.36328V7.5C18.125 7.15625 17.8438 6.875 17.5 6.875H2.5ZM1.875 10.7891V17.5C1.875 17.8438 2.15625 18.125 2.5 18.125H17.5C17.8438 18.125 18.125 17.8438 18.125 17.5V10.7891L12.5781 15.3438C11.0781 16.5742 8.91797 16.5742 7.42188 15.3438L1.875 10.7891ZM0 7.5C0 6.12109 1.12109 5 2.5 5H17.5C18.8789 5 20 6.12109 20 7.5V17.5C20 18.8789 18.8789 20 17.5 20H2.5C1.12109 20 0 18.8789 0 17.5V7.5Z"
        fill={color}
      />
    </Svg>
  );
};

export default EmailIcon;
