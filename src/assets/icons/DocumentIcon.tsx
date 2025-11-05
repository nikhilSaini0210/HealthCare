import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import { colors } from '../../styles/colors';
import { IconProps } from '../../types/interfaces';
import React, { FC } from 'react';

const DocumentIcon: FC<IconProps> = ({
  color = colors.primaryText,
  size = 26,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <G clipPath="url(#clip0_13_991)">
        <Path
          d="M0 3.25C0 1.45742 1.94323 0 4.33333 0H15.1667V6.5C15.1667 7.39883 16.1349 8.125 17.3333 8.125H26V22.75C26 24.5426 24.0568 26 21.6667 26H4.33333C1.94323 26 0 24.5426 0 22.75V3.25ZM26 6.5H17.3333V0L26 6.5Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_13_991">
          <Rect width={26} height={26} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default DocumentIcon;
