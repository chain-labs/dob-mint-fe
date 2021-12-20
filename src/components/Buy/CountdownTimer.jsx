import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { differenceInSeconds } from 'date-fns';
import { PresaleActive, SaleActive, WaitingForPresale, WaitingForSale } from "../Buy";

const DAY_SECONDS = 86400;
const HOUR_SECONDS = 3600;
const MINUTE_SECONDS = 60;

const pluralize = (text, number) => {
    if (number > 1) {
        return text.concat("s");
    } else return text;
}

const CountdownTimer = ({
    status,
    setStatus,
    deadline,
  }) => {
    const [counter, setCounter] = useState(0);
    const [countdown, setCountdown] = useState("");
  
    useEffect(() => {
      if (deadline) {
        const now = new Date();
        const target = new Date(parseInt(deadline));
  
        const diff = differenceInSeconds(target, now);
        setCounter(diff);
      }
    }, [deadline]);
  
    useEffect(() => {
      if (counter < DAY_SECONDS) {
        const hours = Math.floor(counter / HOUR_SECONDS);
        const minutes = Math.floor(
          (counter - hours * HOUR_SECONDS) / MINUTE_SECONDS
        );
        const seconds = Math.floor(
            counter - hours * HOUR_SECONDS - minutes * MINUTE_SECONDS
          );
        const countdown = `${hours} ${pluralize("hour", hours)} ${minutes} ${pluralize("minute", minutes)} ${seconds} ${pluralize("second", seconds)}`;
        setCountdown(countdown);
      } else {
        const days = Math.floor(counter / DAY_SECONDS);
        
        const hours = Math.floor((counter - days * DAY_SECONDS) / HOUR_SECONDS);
          const minutes = Math.floor(
              (counter - days * DAY_SECONDS - hours * HOUR_SECONDS) / MINUTE_SECONDS
          );
          const countdown = `${days} ${pluralize("day", days)} ${hours} ${pluralize("hour", hours)} ${minutes} ${pluralize("minute", minutes)}`;
          setCountdown(countdown);
      }
      const interval = setInterval(() => {
        if (counter === 1) {
          if (status === WaitingForPresale) {
            setStatus(PresaleActive);
          } else if (status === WaitingForSale) {
            setStatus(SaleActive);
          }
        }
        setCounter(counter - 1);
      }, 1000);
      return () => clearInterval(interval);
    }, [counter, status, setStatus]);
  
    return (
      <Card.Text style={{color:"green",fontSize:"2.5rem" }}>{countdown}</Card.Text>
    );
};

export default CountdownTimer;