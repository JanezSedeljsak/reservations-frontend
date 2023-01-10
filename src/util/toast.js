import { toast } from "react-toastify";

// create toast wrapper for easier transition to react native later on
export const warning = (msg) => {
    toast.warn(msg);
}

export const success = (msg) => {
    toast.success(msg);
}

export const error = (msg) => {
    toast.error(msg);
}