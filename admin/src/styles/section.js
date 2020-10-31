import styled, { css } from "styled-components";

export const SectionOne = styled.section`
  display: flex;
  justify-content: center;
  text-align: center;
  justify-text: center;
  // height: 50%;
  max-height: 900px;

  ${(props) =>
    props.posts &&
    css`
      flex-direction: column;
      text-align: start;
      align-items: center;
    `}
`;
