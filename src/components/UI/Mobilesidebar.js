import Sidebar from "./Sidebar";
const MobileSidebar = ({ close }) => {
  return (
    <div className="modal" onClick={close}>
      <Sidebar close={close} />
    </div>
  );
};

export default MobileSidebar;
