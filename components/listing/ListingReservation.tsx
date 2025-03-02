"use client";

import React, { useState } from "react";
import "@/styles/globals.css";
import { formatISO } from "date-fns";
import Calendar from "../inputs/Calendar";
import Button from "../Button";
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';
import TimeSlotPicker from "../inputs/TimeSlotPicker";

type Props = {
  price: number;
  totalPrice: number;
  addons: number;
  platformFee: number;
  time: number;
  setSelectDate: (value: Date) => void;
  selectedDate: Date;
  setSelectTimeSlots: (value: any) => void;
  selectedTime: [string, string];
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
  disabledStartTimes: any[];
  disabledEndTimes: any[];
  operationalTimings: any;
  instantBooking: number;
};

function ListingReservation({
  price,
  totalPrice,
  addons,
  platformFee,
  time,
  setSelectDate,
  selectedDate,
  selectedTime,
  onSubmit,
  disabled,
  disabledDates,
  setSelectTimeSlots,
  disabledStartTimes,
  disabledEndTimes,
  operationalTimings,
  instantBooking,
}: Props) {
  const [selectedTimes, setSelectedTimes] = useState({ start: null, end: null });

  const setSelectTime = (selectedTime: any, field: 'start' | 'end') => {
    if (field === 'start') {
      setSelectedTimes({ start: selectedTime, end: null });
    } else if (field === 'end') {
      setSelectedTimes({ ...selectedTimes, end: selectedTime });
      selectedTime = [selectedTimes.start, selectedTime];
      setSelectTimeSlots(selectedTime);
    }
  };

  const calculateTotalPrice = () => {

    const bookingFee = price * (isNaN(time) ? 0 : time);
    return bookingFee + addons + platformFee;
  };

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <p className="flex gap-1 text-2xl font-semibold">
          ₹ {price} <p className="text-neutral-600 font-normal">/ hour</p>
        </p>
      </div>
      <hr />
      <div className="p-4 pb-0 flex flex-row items-center justify-between font-semibold text-lg">
        <h1>Select Date for Booking</h1>
      </div>

      <Calendar
        value={selectedDate}
        allowedDays={[operationalTimings.operationalDays?.start ?? "", operationalTimings.operationalDays?.end ?? ""]}
        onChange={(value) => setSelectDate(value)}
      />
      <hr />
      <div className="p-4 pb-0 flex flex-row items-center justify-between font-semibold text-lg">
        <h1>Pick your Time Slot</h1>
      </div>
      <TimeSlotPicker
        onTimeSelect={setSelectTime}
        selectedStart={selectedTimes.start}
        selectedEnd={selectedTimes.end}
        disabledStartTimes={disabledStartTimes}
        disabledEndTimes={disabledEndTimes}
        selectedDate={selectedDate}
        operationalTimings={operationalTimings}
      />
      <hr />
      <div className="p-4">
        <button disabled={disabled} className="button rounded-xl w-full bg-black text-white hover:opacity-90" onClick={onSubmit}>Reserve</button>
      </div>
      <hr />
      <div className="p-4 flex flex-col text-neutral-500 gap-1">
        <div className="flex justify-between">
          <p>Base booking fee {price} x {isNaN(time) ? 0 : time} hrs</p>
          <p className=""> ₹{price * (isNaN(time) ? 0 : time)}</p>
        </div>
        <div className="flex justify-between">
          <p>Addons</p>
          <p className=""> ₹{addons}</p>
        </div>
        <div className="flex justify-between pb-3">
          <p>Platform fee</p>
          <p className=""> <s>₹100</s> {platformFee}</p>
        </div>
        <hr />
        <div className="flex justify-between pt-4 text-black">
          <p><strong>Total</strong></p>
          <p> <strong>₹{calculateTotalPrice()}</strong></p>
        </div>
      </div>
    </div>
  );
}

export default ListingReservation;
