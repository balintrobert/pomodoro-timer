import moment from 'moment';

const Session = ({
  sessionLength,
  decrementSessionLengthByOneMinute,
  incrementSessionLengthByOneMinute,
}) => {
  const sessionLengthInMinutes = moment
    .duration(sessionLength, 's')
    .asMinutes();

  return (
    <div className='session'>
      <p className='session__label'>Session</p>
      <p className='session__length'>{sessionLengthInMinutes}</p>
      <div className='session__btns'>
        <button
          className='session__btn--decrement'
          onClick={decrementSessionLengthByOneMinute}
        >
          -
        </button>
        <button
          className='session__btn--increment'
          onClick={incrementSessionLengthByOneMinute}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Session;
