import { useToggle } from "../Utils/CustomHooks";

type prop = {
  classValue: string;
  FormValue: string;
  Time: number;
};

const TimeoutBtn = ({ classValue, FormValue, Time }: prop) => {
  const [Dis, ToggleDis, SetDisable] = useToggle(false);
  const DisableBtn = () => {
    setTimeout(() => {
      ToggleDis();
    }, 0);
    setTimeout(() => {
      SetDisable(false);
    }, Time);
  };

  return (
    <input
      type='submit'
      className={classValue}
      disabled={Dis}
      onClick={DisableBtn}
      value={FormValue}
    />
  );
};

export default TimeoutBtn;
