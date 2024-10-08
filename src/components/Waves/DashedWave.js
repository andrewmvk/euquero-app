import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('screen');

export default (props) => {
  let size = 0.25;
  const chartHeight = height * size;

  const firstCHeight = chartHeight * 0.4;
  const secondCHeight = chartHeight * 0.25;
  const thirdCHeight = chartHeight - 2;

  const pathStart = `0, 0`;

  const qPointA1 = `${width * 0.05} ${firstCHeight}`;
  const qPointB1 = `${width * 0.11} ${firstCHeight}`;

  const cPointA1 = `${width * 0.18} ${firstCHeight}`;
  const cPointB1 = `${width * 0.2} ${secondCHeight}`;
  const cPointC1 = `${width * 0.37} ${secondCHeight}`;

  const cPointA2 = `${width * 0.6} ${secondCHeight}`;
  const cPointB2 = `${width * 0.57} ${thirdCHeight}`;
  const cPointC2 = `${width * 0.78} ${thirdCHeight}`;

  const qPointA2 = `${width * 0.9} ${thirdCHeight}`;
  const qPointB2 = `${width} ${chartHeight * 0.78}`;

  const rotateStyle =
    props.bottom != null
      ? {
          transform: [{ translateX: -(width * 0.15) }, { rotate: '175deg' }],
          bottom: -chartHeight / 5,
        }
      : {
          transform: [{ translateX: width * 0.15 }, { rotate: '-5deg' }],
          top: -chartHeight / 5,
        };

  return (
    <Svg
      width={width}
      height={chartHeight}
      style={[{ position: 'absolute', zIndex: 3 }, rotateStyle]}
    >
      <Path
        d={`
          M${pathStart} 
          Q${qPointA1} ${qPointB1} 
          C${cPointA1} ${cPointB1} ${cPointC1} 
          C${cPointA2} ${cPointB2} ${cPointC2}
          Q${qPointA2} ${qPointB2} 
        `}
        strokeDasharray={`10 10 8`}
        stroke="#fff"
        strokeWidth={2}
      />
    </Svg>
  );
};
