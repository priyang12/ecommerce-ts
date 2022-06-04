import { useToggle } from "../Utils/CustomHooks";

type prop = {
  className: string;
  FormValue: string;
  Time: number;
};

const TimeoutBtn = ({ className, FormValue, Time }: prop) => {
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
    <button
      className={className}
      disabled={Dis}
      onClick={DisableBtn}
      type="submit"
    >
      {FormValue}
    </button>
  );
};

export default TimeoutBtn;
