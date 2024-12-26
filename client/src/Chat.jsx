import io from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import icon from './assets/emoji.svg'
import Messages from './Messages';

const socket = io.connect('http://localhost:5000');

const Chat = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [params, setParams] = useState({ name: '', room: ''});
  const [state, setState] = useState([]);
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit('join', searchParams);

    return () => {
      socket.off();
    }
  }, [search]);

  useEffect(() => {
    socket.on('message', ({ data }) => {
      setState((_state) => ([ ..._state, data ]));
    });

    socket.on('room', ({ data: { users } }) => {
      setUsersCount(users.length);
    });
  }, []);

  const leftRoom = () => {
    socket.emit('leftRoom', { params });
    navigate('/');
  }

  const handleChange = ({ target: { value } }) => {
    setMessage(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) return;

    socket.emit('sendMessage', { message, params });

    setMessage('');
  };

  return (
    <div>
      <div>
        <div>{`Room ${params.room}`}</div>
        <div>{usersCount} users in this room</div>
        <button onClick={leftRoom}>
          Left the room
        </button>
      </div>
      <div>
        <Messages messages={state} name={params.name} />
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="message"
            placeholder="What do you want to say?"
            value={message}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div>
          <img width='50px' src={icon} alt="emojies" onClick={() => setIsOpen(!isOpen)} />

          {isOpen && (
            <div>
              <EmojiPicker onEmojiClick={({emoji}) => setMessage(`${message}${emoji}`)} />
            </div>
          )}
        </div>

        <div>
          <input type="submit" value="Send a message" />
        </div>
      </form>
    </div>
  )
};

export default Chat;
