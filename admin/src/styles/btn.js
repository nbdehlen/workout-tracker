/* global css */
import styled, { css } from 'styled-components';

export const Btn = styled.button`
  color: white;
  border: 2px solid white;
  border-radius: 5px;
  height: 35px;
  min-width: 35px;
  font-size: 24px;
  font-weight: bold;
  background: transparent;
  margin: 4px;
  cursor: pointer;
`;

export const BtnTiny = styled.button`
  color: white;
  border: 2px solid white;
  // border: none;
  border-radius: 5px;
  // height: 32px;
  // min-width: 24px;
  max-width: 200px;
  font-size: 18px;
  // font-weight: bold;
  background: transparent;
  margin: 0;
  cursor: pointer;
  // padding-top: 4px;

  ${(props) =>
    props.del &&
    css`
      background: transparent;
      color: #d44141;
      border-color: #d44141;
      margin-right: 8px;
    `}

  ${(props) =>
    props.edit &&
    css`
      background: transparent;
      border: none;
      color: white;
      margin: 0;
      text-shadow: 1px 1px black;
      position: absolute;
      margin-top: 15px;
      right: 5%;
    `}

    ${(props) =>
    props.done &&
    css`
      background: transparent;
      border-color: #66d666;
      color: #66d666;
      margin-right: 8px;
    `}

    ${(props) =>
    props.cancel &&
    css`
      margin-left: 8px;
      margin-right: 8px;
    `}
`;

export const BtnContainer = styled.div`
  align-self: flex-end;
  margin: 8px 9% 8px 0;
`;
