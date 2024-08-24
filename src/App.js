// src/App.js
import React, { useState } from "react";
import { mentors, durations, areasOfInterest } from "./data";
import MentorSelector from "./components/MentorSelector";
import DurationSelector from "./components/DurationSelector";
import AreaOfInterestSelector from "./components/AreaOfInterestSelector";
import "./App.css";

const App = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedArea, setSelectedArea] = useState("");
  const [finalPayment, setFinalPayment] = useState(null);
  const [scheduledSlots, setScheduledSlots] = useState({}); // To track scheduled slots for mentors

  const handleMentorSelect = (mentor) => {
    setSelectedMentor(mentor);
  };

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration);
    calculatePayment(duration);
  };

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    const availableMentors = mentors.filter(
      (mentor) => mentor.expertise === area && mentor.available
    );
    if (availableMentors.length > 0) {
      setSelectedMentor(availableMentors[0]); // Automatically select the first available mentor
    }
  };

  const calculatePayment = (duration) => {
    if (selectedMentor) {
      const basePrice = duration.price;
      const premiumCharge = selectedMentor.is_premium ? 200 : 0; // Add premium charge if the mentor is premium
      setFinalPayment(basePrice + premiumCharge);
    }
  };

  const scheduleSession = () => {
    if (selectedMentor && selectedDuration) {
      const startTime = selectedMentor.slots[0]; // Get the first available slot
      const endTime = getEndTime(startTime, selectedDuration.label);
      const newScheduledSlots = { ...scheduledSlots };

      // Schedule the session
      if (!newScheduledSlots[selectedMentor.id]) {
        newScheduledSlots[selectedMentor.id] = [];
      }
      newScheduledSlots[selectedMentor.id].push({
        start: startTime,
        end: endTime,
      });
      setScheduledSlots(newScheduledSlots);

      // Remove the scheduled slot from mentor's available slots
      selectedMentor.slots.shift(); // Remove the first slot
      alert(
        `Session scheduled with ${selectedMentor.name} from ${startTime} to ${endTime}`
      );
    }
  };

  const getEndTime = (startTime, durationLabel) => {
    const durationMap = {
      "30 minutes": 30,
      "45 minutes": 45,
      "60 minutes": 60,
    };
    const startHour = parseInt(startTime.split(":")[0]);
    const startMinute = parseInt(startTime.split(":")[1]);
    const duration = durationMap[durationLabel];

    const endMinute = startMinute + duration;
    const endHour = startHour + Math.floor(endMinute / 60);
    const finalMinute = endMinute % 60;

    return `${endHour.toString().padStart(2, "0")}:${finalMinute
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="App">
      <h1>1x1 Mock Interview Scheduler</h1>
      <AreaOfInterestSelector
        areas={areasOfInterest}
        onSelectArea={handleAreaSelect}
      />
      <MentorSelector
        mentors={mentors}
        onSelectMentor={handleMentorSelect}
        selectedArea={selectedArea}
      />
      <DurationSelector
        durations={durations}
        onSelectDuration={handleDurationSelect}
      />

      {selectedMentor && selectedDuration && (
        <div className="summary">
          <h2>Selected Mentor:</h2>
          <p>
            {selectedMentor.name} - {selectedMentor.expertise}
          </p>
          <h2>Selected Duration:</h2>
          <p>
            {selectedDuration.label} - ₹{finalPayment}
          </p>
          <button onClick={scheduleSession}>Schedule Session</button>
        </div>
      )}
    </div>
  );
};

export default App;
