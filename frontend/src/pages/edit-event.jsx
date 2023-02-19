import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import dayjs from "dayjs";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import countries from "../country-list";
import Select from 'react-select';

const url = `http://localhost:3000/v1/events`;
const EditEvent = () => {
    const {id} = useParams();
    const nav = useNavigate();
    // const [event, setEvent] = useState();
    const [name, setName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [selected, setSelected] = useState(null);
    const getEvent = useCallback(async () => {
        try {
            const event = await axios.get(`${url}/${id}`);
            setName(event.data.data.name);
            setSelected({
                value: event.data.data.location,
                label: countries.find(c => c.value === event.data.data.location).label
            });
            setEventDate(dayjs(event.data.data.date).format('YYYY-MM-DD'));

        } catch (error) {
            throw error;
        }
    }, [id])

    useEffect(() => {
        getEvent();
    }, [getEvent]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newEvent = {
                name,
                location: selected.value,
                date: eventDate
            };

            await axios.put(`${url}/${id}`, newEvent);
            toast.success('Event update successfully.');
            nav('/');
        } catch (error) {
            toast.error('Event update failed.', error)
        }
    }
    const handleChange = (selectedOption) => {
        setSelected(selectedOption);
    };
    return (
        <div className="bg-green-50 p-8 h-screen">
            <div className="w-[700px] mx-auto">
                <div className="bg-white rounded shadow">
                    <div className="p-4 border-b">
                        <h2 className="text-black text-xl font-bold">Events</h2>
                        <div className="flex">
                            <p className="text-gray-400 mr-2">Edit and event!</p>
                            <div className="text-blue-600 cursor-pointer" onClick={() => nav(-1)}>Back</div>
                        </div>
                    </div>
                    <div className="border-b p-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name">Name</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Enter event name"
                                        className="w-full shadow border py-1 px-2 rounded"
                                        defaultValue={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-8">
                                <div className="mr-4 w-full">
                                    <label htmlFor="name">Country</label>
                                    <div className="relative lg:max-w-sm mr-2">
                                        <Select
                                            value={selected}
                                            onChange={handleChange}
                                            options={countries}
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="date">Date</label>
                                    <div className="mt-2">
                                        <input
                                            type="date"
                                            name="date"
                                            id="date"
                                            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                                            className="w-full shadow border py-1 px-2 rounded"
                                            defaultValue={eventDate}
                                            onChange={(e) => setEventDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="border-0 bg-blue-500 text-white py-1 px-4 rounded"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditEvent;
