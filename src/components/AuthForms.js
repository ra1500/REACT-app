import styled from 'styled-components';

const Card = styled.div`
  box-sizing: initial   ;
  max-width: 410px;
  margin: initial;
  padding: initial;
  display: initial;
  flex-direction: initial;
  align-items: left;
`;

const Form = styled.div`
  display: inline-block;
  flex-direction: column;

`;

const Input = styled.input`
  display: inline-block;
  padding: 1rem;
  border: 1px solid #999;
  margin-bottom: 1rem;
  font-size: 0.8rem;
`;

const Button = styled.button`
  background: linear-gradient(to bottom, #6371c7, #0052cc);
  border-color: #3f4eae;
  border-radius: 0px;
  padding: 1rem;
  color: white;
  font-weight: 700;

  margin-bottom: 1rem;
  font-size: 0.8rem;
`;

const Error = styled.div`
  background-color: orange;
`;

export { Form, Input, Button, Card, Error };