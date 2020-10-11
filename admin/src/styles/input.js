/* global css */
import styled, { css } from 'styled-components';

export const Input = styled.input`
  border-radius: 4px;
  padding: 4px;
  width: 60vw;
  max-width: 300px;
  font-size: 20px;
  background-color: rgb(29 65 99);
  border-style: solid;
  border-color: transparent;
  border-bottom: 2px solid white;
  color: white;

  ${(props) =>
    props.list &&
    css`
      max-width: unset;
      width: 100%;
      // list-style: none;
      // color: white;
      // font-size: 20px;
      // border-bottom: 1px solid #cecfd0;
      // margin-bottom: 8px;
      // width: 80%;
      // text-align: start;
      // padding-bottom: 2px;
    `}
`;

export const Label = styled.label`
  color: white;
`;
