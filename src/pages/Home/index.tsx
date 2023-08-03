import { useState, useEffect } from 'react';
import './styles.css';

import { Card, CardProps } from '../../components/Card';

type ProfileResponse = {
  name: string;
  avatar_url: string;
}

type User = {
  name: string;
  avatar: string;
}

export const Home = () => {

  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User);

  function handleAddStudent() {

    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(prevState => [...prevState, newStudent]);
  }


  useEffect(() => {

    async function fetchData() {
      const { name, avatar_url } = await (await fetch('https://api.github.com/users/tavaresevaristo')).json() as ProfileResponse;

      setUser({
        name: name,
        avatar: avatar_url,
      });
    }

    fetchData();

  }, []);


  return (

    <div className="container">
      <header>
        <h1>Lista de Presença</h1>

        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="tavares evaristo" />
        </div>

      </header>

      <input
        type="text"
        placeholder="Digite o seu nome"
        onChange={e => setStudentName(e.target.value)}
      />

      <button
        type="button"
        onClick={handleAddStudent}
        disabled={!studentName}
      >
        Adicionar
      </button>

      {
        students.map(student => (

          <Card
            key={student.time}
            name={student.name}
            time={student.time}
          />
        ))
      }
    </div>
  )
}
