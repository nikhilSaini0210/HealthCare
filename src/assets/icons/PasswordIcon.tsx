import React, { FC } from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import { colors } from '../../styles/colors';
import { IconProps } from '../../types/interfaces';

const PasswordIcon: FC<IconProps> = ({
  color = colors.primaryText,
  size = 20,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <G clipPath="url(#clip0_1_14)">
        <Path
          d="M6.42857 5.625V7.5H13.5714V5.625C13.5714 3.89844 11.9732 2.5 10 2.5C8.02679 2.5 6.42857 3.89844 6.42857 5.625ZM3.57143 7.5V5.625C3.57143 2.51953 6.45089 0 10 0C13.5491 0 16.4286 2.51953 16.4286 5.625V7.5H17.1429C18.7188 7.5 20 8.62109 20 10V17.5C20 18.8789 18.7188 20 17.1429 20H2.85714C1.28125 20 0 18.8789 0 17.5V10C0 8.62109 1.28125 7.5 2.85714 7.5H3.57143Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_14">
          <Rect width={20} height={20} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default PasswordIcon;
