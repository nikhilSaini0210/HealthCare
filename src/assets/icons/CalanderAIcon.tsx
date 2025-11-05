import React, { FC } from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';

const CalanderAIcon: FC = () => (
  <Svg width={34} height={34} viewBox="0 0 34 34" fill="none">
    <Rect width={34} height={34} fill="url(#pattern0_29_81)" />
    <Defs>
      <Pattern
        id="pattern0_29_81"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_29_81" transform="scale(0.0208333)" />
      </Pattern>
      <Image
        id="image0_29_81"
        width={48}
        height={48}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACE0lEQVR4nO1T3ytDYRg+/8SmhjojyZVcyoV2hfwD7pG4WC7kVxLlZs0dO3e4cuHnFi60Y2PsCIVCWThfYjeEbKe0jotX33Dadsj3renbqe+pp9Z72vO8z/e+ryBwcHBQIxBWWv3haDwQit6vbu21sNahBjYMhBVIM6TcsdahhmH6RdY6P6LS91Yu+rRl0aclnZIGmcw1zv1OysAfOl/eflFKVAu0zTt92vNPpuJ00mSMa7TNU+q84J6IA+CX/83YMXJpMsY12gB56CzSBDCtzTftPdmmmPZu+jWi1RElLUEc4C/juY2oYTq7roC9Zz+vAHOUOgUJgMfsGo2kzbGpa3QXSkdiea2Qi1KnIAHwoWFz/IKY+He+R+yg1ClIAJYUeADJIhOQ0TsUIwUeAPEJAF8hEvzHqtg6dwx65Ud2R2zLaISEPAAq8ATapMssVvXuG69d03dg+l50E5Bz2DB+YjTW7D0nWj1P8AEGVuLQ5DmD1skLcM/fwkYsZZ0AtYOHpltpnDiFoGqRACVdEagbOoIKt5JVn4o8WyPAsD+erq3FUuB0R416/9K9NQJkHnH92LFR75i9sV6Ahoz/t8/wAJ/gE0B8hYAfsVyEFEhh+QBBpCdZNyubqL+SB1B1P/uG37Op6gvEAUIoVS2r+gvzptEng6r+tH0FZQINNq+hXEb6ooz0BMO1SeCXp26eg4NDsAw+AMVSJ4VOjmwQAAAAAElFTkSuQmCC"
      />
    </Defs>
  </Svg>
);
export default CalanderAIcon;
