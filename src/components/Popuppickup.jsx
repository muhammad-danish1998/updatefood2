import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import CartInc from "./CartInc";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setPaymentValue } from "../redux/store/actions/menuAction";

let amount;

export default function Popuppickup({
  visible,
  onClose,
  currentRestaurantImg,
}) {
  if (!visible) return null;
  const [open, setOpen] = useState(true);

  const [count, setCount] = useState(1);

  const dispatch = useDispatch();

  const { menuList, totalAmount } = useSelector((state) => state?.menu);
  useEffect(() => {
    amount = totalAmount;
  }, []);

  console.log("menulist, totalAmount", menuList, amount);

  const cancelButtonRef = useRef(null);

  const decrementValue = () => {
    if (count > 1) {
      setCount((count) => count - 1);
    }
    // amount = totalAmount;
    amount = (Number(totalAmount) * count).toFixed(2);
    // dispatch(setPaymentValue(val))
  };
  const incrementValue = () => {
    setCount((count) => count + 1);
    // amount = totalAmount
    amount = (Number(totalAmount) * count).toFixed(2);
    console.log("amount", amount);
    // console.log("val", val);
    // dispatch(setPaymentValue(val))
  };


  const [state, setState] = useState({
    your_name: localStorage.getItem('your_name'),
    your_email: localStorage.getItem('your_email'),
    shipping: "delivery",
    delivery_time: "ASAP",
    PaymentType:"code",
    sessid: localStorage.getItem('uuid')
  });
  
  const handleOnClose = () => {
    dispatch(setPaymentValue(amount));
    onClose();
  };

  const handleChange = (key, value) => {
    setState((state) => ({ ...state, [key]: value }));
    localStorage.setItem(key, value);
  };

  return (
    <Transition.Root show={open} as={Fragment} onClick={handleOnClose}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div> */}
                  <div className="mt-3  sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-medium leading-6 text-gray-900"
                    >
                      Pick Up
                    </Dialog.Title>
                    <Dialog.Title
                      as="h3"
                      className=" leading-6 text-xl font-semibold text-gray-400"
                    >
                      Personal Information
                    </Dialog.Title>
                    <div className="mt-2   flex flex-col">
                      <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-1/2">
                          <div className="relative">
                            <label
                              for="name"
                              className="leading-7 text-sm text-gray-600"
                            >
                              First Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={state.your_name}
                              onChange={(e) => handleChange("your_name", e.target.value)}
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                          </div>
                        </div>
                        <div className="p-2 w-1/2">
                          <div className="relative">
                            <label
                              for="email"
                              className="leading-7 text-sm text-gray-600"
                            >
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="email"
                              name="email"
                              value={state.your_name}
                              onChange={(e) => handleChange("your_name", e.target.value)}
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                          </div>
                        </div>
                        <div className="p-2 w-full">
                          <div className="relative">
                            <label
                              for="message"
                              className="leading-7 text-sm text-gray-600"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={state.your_email}
                              onChange={(e) => handleChange("your_email", e.target.value)}
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                          </div>
                        </div>

                        <div className="p-2 w-full ">
                          <div className="relative mt-6">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-gray-300" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    // to="/checkout"
                    type="button"
                    className="mt-3 bg-red-500 text-white inline-flex w-full justify-center rounded-md border border-gray-300  px-4 py-2 text-base font-medium  shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 lg:text-lg sm:text-sm"
                    // onClick={() => setOpen(false)}
                    onClick={() => handleOnClose()}
                    ref={cancelButtonRef}
                  >
                    Submit
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
