import React from 'react';
import { Card } from 'react-bootstrap';
import { WaitingForPresale } from '../Buy';
import CountdownTimer from './CountdownTimer';

const WaitingComponent = ({ status, setStatus, time }) => {

    const saleText = status === WaitingForPresale ? "Presale" : "Sale"
      return (
      <Card className="text-center">
        <Card.Body>
          <Card.Title>Mint DoB</Card.Title>
          <Card.Text>
             {saleText} starts in{" "}
            <CountdownTimer
              status={status}
              setStatus={setStatus}
              deadline={time}
            />
          </Card.Text>
        </Card.Body>
      </Card>
    );
};
  
export default WaitingComponent;