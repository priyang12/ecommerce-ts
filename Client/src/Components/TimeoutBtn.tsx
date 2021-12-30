import { useToggle } from "../Utils/CustomHooks";

type prop = {
  classname: string;
  FormValue: string;
  Time: number;
};

const TimeoutBtn = ({ classname, FormValue, Time }: prop) => {
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
    <button className={classname} disabled={Dis} onClick={DisableBtn}>
      {FormValue}
    </button>
  );
};

export default TimeoutBtn;
