import React, { useCallback, useState, useEffect } from 'react';
import { FaBolt } from 'react-icons/fa';
import Select from 'react-select';
import ReactSwitch from 'react-switch';

export type ListingDetails = {
    carpetArea: string;
    operationalDays: { start: string; end: string };
    operationalHours: { start: string; end: string };
    minimumBookingHours: string;
    maximumPax: string;
    instantBook: boolean;
    selectedTypes: string[];
};

type Props = {
    onDetailsChange: (details: ListingDetails) => void;
};

const OtherListingDetails: React.FC<Props> = ({ onDetailsChange }) => {
    const [details, setDetails] = useState<ListingDetails>({
        carpetArea: '',
        operationalDays: { start: '', end: '' },
        operationalHours: { start: '', end: '' },
        minimumBookingHours: '',
        maximumPax: '',
        instantBook: false,
        selectedTypes: [],
    });

    useEffect(() => {
        onDetailsChange(details);
    }, [details, onDetailsChange]);

    const handleInputChange = useCallback((field: keyof ListingDetails, value: any) => {
        setDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    }, []);

    const handleTypeSelect = (type: string) => {
        setDetails((prevDetails) => {
            const newSelectedTypes = prevDetails.selectedTypes.includes(type)
                ? prevDetails.selectedTypes.filter((t) => t !== type)
                : [...prevDetails.selectedTypes, type];
            return { ...prevDetails, selectedTypes: newSelectedTypes };
        });
    };

    const types = [
        "Fashion shoot", "Product shoot", "Podcast", "Recording Studio",
        "Film Shoot", "Outdoor Event", "Content shoot", "Pre-Wedding",
        "Meetings", "Workshops", "Photo Shoot"
    ];

    const dayOptions = [
        { value: 'Mon', label: 'Monday' },
        { value: 'Tue', label: 'Tuesday' },
        { value: 'Wed', label: 'Wednesday' },
        { value: 'Thu', label: 'Thursday' },
        { value: 'Fri', label: 'Friday' },
        { value: 'Sat', label: 'Saturday' },
        { value: 'Sun', label: 'Sunday' },
    ];

    return (
        <div className="space-y-4">
            {/* Property Specifications */}
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium w-[40vw]">
                    <strong>PROPERTY SPECIFICATIONS</strong>
                    <br />
                    Carpet Area
                </label>
                <input
                    type="text"
                    placeholder="290 sqft"
                    className="border py-2 rounded-full w-1/3 text-center"
                    value={details.carpetArea}
                    onChange={(e) => handleInputChange('carpetArea', e.target.value)}
                />
            </div>

            <hr />

            {/* Timings */}
            <div className="space-y-4">
                <div className="flex items-center">
                    <label className="font-medium text-sm w-[40vw]">
                        <strong>TIMINGS</strong>
                        <br />
                        Operational Days
                    </label>
                    <div className="flex items-center space-x-2 justify-end w-full">
                        <Select
                            options={dayOptions}
                            value={dayOptions.find((day) => day.value === details.operationalDays.start)}
                            onChange={(selected) =>
                                handleInputChange('operationalDays', { ...details.operationalDays, start: selected?.value || '' })
                            }
                            placeholder="Start Day"
                            classNames={{
                                input: () => "text-lg cursor-pointer",
                                option: () => "text-lg cursor-pointer",
                            }}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 10,
                                colors: {
                                    ...theme.colors,
                                    primary: "black",
                                    primary25: "#F3F4F6",
                                    primary50: "#E5E7EB",
                                },
                            })}
                        />
                        <span>-</span>
                        <Select
                            options={dayOptions}
                            value={dayOptions.find((day) => day.value === details.operationalDays.end)}
                            onChange={(selected) =>
                                handleInputChange('operationalDays', { ...details.operationalDays, end: selected?.value || '' })
                            }
                            placeholder="End Day"
                            classNames={{
                                input: () => "text-lg cursor-pointer",
                                option: () => "text-lg cursor-pointer",
                            }}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 10,
                                colors: {
                                    ...theme.colors,
                                    primary: "black",
                                    primary25: "#F3F4F6",
                                    primary50: "#E5E7EB",
                                },
                            })}
                        />
                    </div>
                </div>

                <div className="flex items-center">
                    <label className="font-medium text-sm w-[40vw]">Opening Hours</label>
                    <div className="flex items-center space-x-2 justify-end">
                        <input
                            type="text"
                            placeholder="AM"
                            className="border rounded-full w-30 py-2 text-center"
                            value={details.operationalHours.start}
                            onChange={(e) =>
                                handleInputChange('operationalHours', { ...details.operationalHours, start: e.target.value })
                            }
                        />
                        <span>-</span>
                        <input
                            type="text"
                            placeholder="PM"
                            className="border rounded-full w-30 py-2 text-center"
                            value={details.operationalHours.end}
                            onChange={(e) =>
                                handleInputChange('operationalHours', { ...details.operationalHours, end: e.target.value })
                            }
                        />
                    </div>
                </div>

                <div className="flex items-center">
                    <label className="font-medium text-sm w-[40vw]">Minimum Booking Hours</label>
                    <input
                        type="text"
                        placeholder="2 hrs"
                        className="border rounded-full w-1/3 py-2 pr-3 text-center"
                        value={details.minimumBookingHours}
                        onChange={(e) => handleInputChange('minimumBookingHours', e.target.value)}
                    />
                </div>
            </div>

            <hr />

            {/* Accommodation */}
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium w-[40vw]">
                    <strong>ACCOMMODATION</strong>
                    <br />
                    Maximum Pax
                </label>
                <input
                    type="text"
                    placeholder="6 people"
                    className="border rounded-full w-1/3 py-2 pr-3 text-center"
                    value={details.maximumPax}
                    onChange={(e) => handleInputChange('maximumPax', e.target.value)}
                />
            </div>

            <hr />

            {/* Booking */}
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium mb-1 w-[40vw]">
                    <strong>BOOKING</strong>
                    <br />
                    Instant Book
                </label>
                <ReactSwitch
                    checked={details.instantBook}
                    onChange={(checked) => handleInputChange('instantBook', checked)}
                    offColor="#d1d5db"
                    onColor="#000"
                    uncheckedIcon={false}
                    offHandleColor="#000"
                    activeBoxShadow="0 0 2px 3px #000"
                    checkedIcon={false}
                    height={30}
                    handleDiameter={20}
                    checkedHandleIcon={<FaBolt color='#FFD700' className='w-full h-full py-[2px]' />}
                />
            </div>

            <hr />

            {/* Type */}
            <div className="justify-between items-center">
                <label className="text-sm font-medium mb-1 w-[40vw]">
                    <strong>TYPE</strong>
                </label>
                <div className="flex flex-wrap gap-2 w-100 mt-2">
                    {types.map((type) => (
                        <button
                            key={type}
                            onClick={() => handleTypeSelect(type)}
                            className={`${details.selectedTypes.includes(type)
                                ? 'bg-black text-white'
                                : 'bg-gray-200 text-gray-800'
                                } text-sm py-1 px-3 rounded-full`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OtherListingDetails;