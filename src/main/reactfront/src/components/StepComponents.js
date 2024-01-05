import styled from "styled-components";

export const StepContainer = styled.div`
  padding-top: 6.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Stepbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  cursor: pointer;
`;
export const StepUl = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const StepLi = styled.li`
  color: gray;
  width: 11rem;
  text-align: center;
  padding: 3.2rem 0;
  list-style: none;
  text-transform: uppercase;
  font-size: 1.6rem;
  font-weight: 600;
`;
