import { useState } from "react";
import { useNavigate } from "react-router";
import './App.css'

const FIELDS = {
  NAME: "name",
  ROOM: "room"
};

function App() {
  const { NAME, ROOM } = FIELDS;
  const [values, setValues] = useState({ [NAME]: '', [ROOM]: '' });
  const navigate = useNavigate();

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <div>
      <div>
        <h1>Join</h1>

        <form action={() => navigate(`/chat?name=${values[NAME]}&room=${values[ROOM]}`) } >
          <div>
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={values[NAME]}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="room"
              placeholder="Room"
              value={values[ROOM]}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <button type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
};

export default App;
