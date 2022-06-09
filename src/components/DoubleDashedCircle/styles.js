import styled from "styled-components/native";

export const TopCircle = styled.View`
  position: absolute;
  left: -150px;
  top: -150px;
  z-index: 1;
  width: 300px;
  height: 300px;
  border-radius: 999px;
  border: 2px dashed white;
`;

export const BottomCircle = styled.View`
  position: absolute;
  right: -150px;
  bottom: -150px;
  z-index: 1;
  width: 300px;
  height: 300px;
  border-radius: 999px;
  border: 2px dashed white; ;
`;
