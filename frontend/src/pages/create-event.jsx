import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import countries from "../country-list";
import Select from 'react-select';

const url = process.env.REACT_APP_API_ENDPOINT;

const CreateEvent = () => {
    const nav = useNavigate();
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [selected, setSelected] = useState({value: countries[0].value, label: countries[0].label});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newEvent = {
                name,
                location: selected.value,
                date
            };
            await axios.post(url, newEvent)
            toast.success('Event create successfully.');
            nav('/');
        } catch (error) {
            toast.error('event creation failed.', error)
        }
    };

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
                            <p className="text-gray-400 mr-2">Create and event!</p>
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
                                        onChange={(e) => setName(e.target.value)}
                                        required
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
                                            className="w-full shadow border py-1 px-2 rounded"
                                            onChange={(e) => setDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit"
                                        className="border-0 bg-blue-500 text-white py-1 px-4 rounded">Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
