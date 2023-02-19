import {Dialog, Transition} from "@headlessui/react";
import axios from "axios";
import {Fragment, useCallback, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import countries from "../country-list";

const url = process.env.REACT_APP_API_ENDPOINT;
const Events = () => {
    const nav = useNavigate();
    const [eventList, setEventList] = useState([]);
    const [deleteSelectedEvent, setDeleteSelectedEvent] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [pageLimit, setPageLimit] = useState(5);
    const [totalEvents, setTotalEvents] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const getEventList = useCallback(async () => {
        try {
            const eventList = await axios.get(`${url}?pageNumber=${currentPage}&pageSize=${pageLimit}`);
            setTotalEvents(eventList.data.totalEvents);

            setEventList(eventList.data.data);
        } catch (error) {
            throw error;
        }
    }, [pageLimit, currentPage]);

    useEffect(() => {
        getEventList();
    }, [getEventList]);

    const handleDeleteEvent = (id) => {
        setDeleteSelectedEvent(id);
        setIsDeleteModalOpen(true);
    };

    const deleteEvent = async () => {
        try {
            const deleteEvent = await axios.delete(`${url}/${deleteSelectedEvent}`);
            if (!deleteEvent) toast.error('can not delete this event.');
            setIsDeleteModalOpen(false);
            toast.success('Event deleted.');
            getEventList();
        } catch (error) {
            setIsDeleteModalOpen(false);
            toast.error('event creation failed.', error);
        }

    }

    const renderEventTableData = () => {
        return eventList.map((event, index) => {
            const {id, name, location, date} = event;
            return (
                <tr className="py-3" key={index}>
                    <td className="py-3">
                        {name}
                    </td>
                    <td className="py-3">{countries.find(c => c.value === location).label}</td>
                    <td className="py-3">{new Date(date).toDateString()}</td>
                    <td className="py-3">
                        <div className="flex">
                            <div className="text-blue-600 mr-3 cursor-pointer hover:underline" onClick={() => {
                                nav(`/edit-event/${id}`);
                            }}>
                                Edit
                            </div>
                            <div className="text-blue-600 cursor-pointer hover:underline"
                                 onClick={() => handleDeleteEvent(id)}>
                                Delete
                            </div>
                        </div>
                    </td>
                </tr>
            );
        });
    };

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalEvents / pageLimit); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-green-50 p-8 h-full">
            <div className="container mx-auto">
                <div className="bg-white rounded shadow">
                    <div className="p-4 border-b">
                        <h2 className="text-black text-xl font-bold">Events</h2>
                        <div className="flex">
                            <p className="text-gray-400 mr-2">List of events!</p>
                            <div className="text-blue-600"><Link to="/create-event">Create</Link></div>
                        </div>
                    </div>
                    <div className="p-4 border-b">
                        <div className="my-4">
                            <div className="flex items-center">
                                <p className="mr-2">Show</p>
                                <div className="relative lg:max-w-sm mr-2">
                                    <select
                                        className="py-1 px-3 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                                        onChange={(e) => setPageLimit(e.target.value)}
                                        defaultValue={pageLimit}
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((option, inx) => {
                                            return <option key={inx}>{option}</option>;
                                        })}
                                    </select>
                                </div>
                                <p>entries</p>
                            </div>
                        </div>
                        <div>
                            <table className="table-fixed w-full text-left">
                                <thead>
                                <tr>
                                    <th className="uppercase text-gray-300 py-3">Name</th>
                                    <th className="uppercase text-gray-300 py-3">Location</th>
                                    <th className="uppercase text-gray-300 py-3">Time</th>
                                    <th className="uppercase text-gray-300 py-3">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {renderEventTableData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-center">
                            <div>showing 1 to {pageLimit} of {eventList?.totalEvents} results</div>
                            <nav className='block'>
                                <ul className='flex pl-0 rounded list-none flex-wrap'>
                                    <li>
                                        {pageNumbers.map((number, index) => (
                                            // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                            <a key={index}
                                               onClick={() => {
                                                   paginate(number);
                                               }}
                                               href='#'
                                               className={
                                                   currentPage === number
                                                       ? "bg-blue border-red-300 text-red-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                                       : "bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                               }
                                            >
                                                {number}
                                            </a>
                                        ))}
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {isDeleteModalOpen && (
                <Transition appear show={isDeleteModalOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={() => setIsDeleteModalOpen(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25"/>
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel
                                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Are you want to delete this even?
                                        </Dialog.Title>
                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mr-2"
                                                onClick={deleteEvent}
                                            >
                                                Yes.
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={() => setIsDeleteModalOpen(false)}
                                            >
                                                No.
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )}
        </div>
    );
};


export default Events;
