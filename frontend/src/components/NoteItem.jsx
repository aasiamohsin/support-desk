import { useSelector } from 'react-redux';

export const NoteItem = ({ note }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className='note'
      style={{
        backgroundColor: note.isStaff ? '#222' : '#fff',
        color: note.isStaff ? '#fff' : '#000',
      }}
    >
      <h4>
        Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}
      </h4>
      <p>{note.text}</p>
      <div className='note-date'>
        {new Date(note.createdAt).toLocaleString('en-US')}
      </div>
    </div>
  );
};
