import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

const Timeleft = ({
  timerLabel,
  handleStartStopClick,
  startStopButtonLabel,
  timeleft,
  handleResetButtonClick,
}) => {
  const formattedTimeleft = moment
    .duration(timeleft, 's')
    .format('mm:ss', { trim: false });

  return (
    <div className='timeleft'>
      <p className='timeleft__label'>{timerLabel}</p>
      <p className='timeleft__length'>{formattedTimeleft}</p>
      <div className='timeleft__btns'>
        <button
          className='timeleft__btn--startstop'
          onClick={handleStartStopClick}
        >
          {startStopButtonLabel}
        </button>
        <button
          className='timeleft__btn--reset'
          id='reset'
          onClick={handleResetButtonClick}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timeleft;
