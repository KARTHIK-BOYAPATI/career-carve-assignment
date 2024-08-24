import React from "react";

const MentorSelector = ({ mentors, onSelectMentor, selectedArea }) => {
  const filteredMentors = selectedArea
    ? mentors.filter(
        (mentor) => mentor.expertise === selectedArea && mentor.available
      )
    : mentors;

  return (
    <div>
      <h2>Select a Mentor</h2>
      <ul>
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <li
              key={mentor.id}
              onClick={() => onSelectMentor(mentor)}
              style={{
                backgroundColor: mentor.is_premium ? "#ffeeba" : "#f4f4f4", // Highlight premium mentors
                fontWeight: mentor.is_premium ? "bold" : "normal", // Bold text for premium mentors
              }}
            >
              {mentor.name} - {mentor.expertise}{" "}
              {mentor.is_premium && (
                <span style={{ color: "gold" }}>★ Premium</span>
              )}
            </li>
          ))
        ) : (
          <li>No available mentors for this area.</li>
        )}
      </ul>
    </div>
  );
};

export default MentorSelector;
