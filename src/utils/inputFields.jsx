import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { BiLock } from "react-icons/bi";

export const inputFields = [
  {
    id: "name",
    label: "Nome",
    type: "text",
    placeholder: "Nome",
    icon: <AiOutlineUser />,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
    icon: <HiOutlineMail />,
  },
  {
    id: "password",
    label: "Senha",
    type: "",
    placeholder: "Senha",
    icon: <BiLock />,
  },
];
