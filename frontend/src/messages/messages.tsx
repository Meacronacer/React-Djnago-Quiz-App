import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export const successLogin = () => {
    toast.success("Success Login !", {
    position: toast.POSITION.TOP_RIGHT,
    })
}


export const successSavedResult = () => {
    toast.success("Result was success saved !", {
    position: toast.POSITION.TOP_RIGHT,
    })
}
