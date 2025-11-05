import Svg, { Path } from 'react-native-svg';
import { colors } from '../../styles/colors';
import { IconProps } from '../../types/interfaces';
import React, { FC } from 'react';

const MessageIcon: FC<IconProps> = ({
  color = colors.primaryText,
  size = 26,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <Path
        d="M3.25 0C1.45742 0 0 1.45748 0 3.25014V17.8758C0 19.6684 1.45742 21.1259 3.25 21.1259H8.125V25.1886C8.125 25.4984 8.29766 25.7777 8.57188 25.9148C8.84609 26.0519 9.17617 26.0214 9.425 25.8386L15.7066 21.1259H22.75C24.5426 21.1259 26 19.6684 26 17.8758V3.25014C26 1.45748 24.5426 0 22.75 0H3.25Z"
        fill={color}
      />
    </Svg>
  );
};

export default MessageIcon;
