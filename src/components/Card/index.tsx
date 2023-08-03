import './styles.css';

export type CardProps = {
  name: string;
  time: string;
}

export const Card = ( {name, time} : CardProps ) => {
  return (
    <div className="card">
      <strong>{name}</strong>
      <small>{time}</small>
    </div>
  )
}