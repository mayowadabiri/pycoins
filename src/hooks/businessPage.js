import { useState } from "react";

const useBusinessPage = () => {
  const [show_1, setShow_1] = useState(false);
  const [show_2, setShow_2] = useState(false);
  const [page, setPage] = useState("");
  return [show_1, setShow_1, show_2, setShow_2, page, setPage];
};

export default useBusinessPage;
