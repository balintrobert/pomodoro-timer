import moment from 'moment';

const Break = ({
  breakLength,
  incrementBreakLengthByOneMinute,
  decrementBreakLengthByOneMinute,
}) => {
  const breakLengthInMinutes = moment.duration(breakLength, 's').asMinutes();

  return (
    <div className='break'>
      <p className='break__label'>Break</p>
      <p className='break__length'>{breakLengthInMinutes}</p>
      <div className='break__btns'>
        <button
          className='break__btn--decrement'
          onClick={decrementBreakLengthByOneMinute}
        >
          -
        </button>
        <button
          className='break__btn--increment'
          onClick={incrementBreakLengthByOneMinute}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Break;
