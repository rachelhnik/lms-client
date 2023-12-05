import { FC } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setRoute: (route: string) => void;
  activeItem: any;
  component: any;
  refetch?: any;
};

const CustomModal: FC<Props> = ({
  open,
  setOpen,
  setRoute,
  activeItem,
  component: Component,
  refetch,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className={` absolute top-[50%] left-[50%] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-[8px] bg-white dark:bg-slate-800 shadow p-4 outline-none`}
      >
        <Component setOpen={setOpen} setRoute={setRoute} refetch={refetch} />
      </Box>
    </Modal>
  );
};

export default CustomModal;
