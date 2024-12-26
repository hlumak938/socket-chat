const Messages = ({ messages, name }) => {
  return (
    <div>
      {messages.map(({ user, message }, i) => {
        const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase();
        const className = itsMe ? 'me' : 'user';

        return (
          <div key={i} className={`${className}`}>
            <span>
              {user.name}
            </span>

            <div>{message}</div>
          </div>
        );
      })}
    </div>
  )
}

export default Messages;
