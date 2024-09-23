import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import { FxList } from './components/FxList';
import { FXInput } from './components/FXInput';
import styled from 'styled-components';

const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr 200px;
  padding: 15px;
  gap: 15px;
`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Container>
      <FXInput />
      <FxList />
    </Container>
  </React.StrictMode>
);
