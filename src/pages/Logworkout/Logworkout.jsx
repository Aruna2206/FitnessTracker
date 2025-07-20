import React, { useState } from "react";
import "./Logworkout.css";

function Logworkout() {
  const [workoutType, setWorkoutType] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("medium");
  const [notes, setNotes] = useState("");
  const [exercises, setExercises] = useState([
    { name: "", sets: "", reps: "", weight: "" },
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
  };

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "", weight: "" }]);
  };

  const removeExercise = (index) => {
    const updatedExercises = [...exercises];
    updatedExercises.splice(index, 1);
    setExercises(updatedExercises);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({
      workoutType,
      duration,
      intensity,
      exercises,
      notes,
      date: new Date().toISOString(),
    });
    setIsSubmitted(true);

    // Reset form after submission
    setTimeout(() => {
      setWorkoutType("");
      setDuration("");
      setIntensity("medium");
      setNotes("");
      setExercises([{ name: "", sets: "", reps: "", weight: "" }]);
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="logworkout-container">
      <div className="logworkout-header">
        <h1>Log Your Workout</h1>
        <p>Track your progress and stay consistent with your fitness goals</p>
      </div>

      {isSubmitted ? (
        <div className="success-message">
          <i className="fas fa-check-circle"></i>
          <h2>Workout Logged Successfully!</h2>
          <p>Your workout has been saved to your profile.</p>
        </div>
      ) : (
        <>
          <div className="workout-instructions">
            <h2>Workout Tips</h2>
            <div className="instruction-cards">
              <div className="instruction-card">
                <div className="instruction-icon">
                  <i className="fas fa-heartbeat"></i>
                </div>
                <h3>Warm Up Properly</h3>
                <p>
                  Always spend 5-10 minutes warming up to prevent injuries and
                  prepare your body.
                </p>
              </div>
              <div className="instruction-card">
                <div className="instruction-icon">
                  <i className="fas fa-stopwatch"></i>
                </div>
                <h3>Rest Between Sets</h3>
                <p>
                  Allow 30-90 seconds of rest between sets for optimal recovery.
                </p>
              </div>
              <div className="instruction-card">
                <div className="instruction-icon">
                  <i className="fas fa-water"></i>
                </div>
                <h3>Stay Hydrated</h3>
                <p>
                  Drink water before, during, and after your workout to maintain
                  performance.
                </p>
              </div>
            </div>
          </div>

          <form className="workout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Workout Details</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="workoutType">Workout Type</label>
                  <select
                    id="workoutType"
                    value={workoutType}
                    onChange={(e) => setWorkoutType(e.target.value)}
                    required
                  >
                    <option value="">Select a workout type</option>
                    <option value="strength">Strength Training</option>
                    <option value="cardio">Cardio</option>
                    <option value="hiit">HIIT</option>
                    <option value="yoga">Yoga</option>
                    <option value="pilates">Pilates</option>
                    <option value="crossfit">CrossFit</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="duration">Duration (minutes)</label>
                  <input
                    type="number"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    min="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="intensity">Intensity</label>
                  <select
                    id="intensity"
                    value={intensity}
                    onChange={(e) => setIntensity(e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="extreme">Extreme</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Exercises</h2>
              {exercises.map((exercise, index) => (
                <div key={index} className="exercise-entry">
                  <div className="exercise-header">
                    <h3>Exercise {index + 1}</h3>
                    {exercises.length > 1 && (
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeExercise(index)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    )}
                  </div>
                  <div className="form-row">
                    <div className="form-group exercise-name">
                      <label htmlFor={`exercise-${index}`}>Exercise Name</label>
                      <input
                        type="text"
                        id={`exercise-${index}`}
                        value={exercise.name}
                        onChange={(e) =>
                          handleExerciseChange(index, "name", e.target.value)
                        }
                        placeholder="e.g., Bench Press"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`sets-${index}`}>Sets</label>
                      <input
                        type="number"
                        id={`sets-${index}`}
                        value={exercise.sets}
                        onChange={(e) =>
                          handleExerciseChange(index, "sets", e.target.value)
                        }
                        min="1"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`reps-${index}`}>Reps</label>
                      <input
                        type="number"
                        id={`reps-${index}`}
                        value={exercise.reps}
                        onChange={(e) =>
                          handleExerciseChange(index, "reps", e.target.value)
                        }
                        min="1"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`weight-${index}`}>Weight (kg)</label>
                      <input
                        type="number"
                        id={`weight-${index}`}
                        value={exercise.weight}
                        onChange={(e) =>
                          handleExerciseChange(index, "weight", e.target.value)
                        }
                        min="0"
                        step="0.5"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="add-exercise-btn"
                onClick={addExercise}
              >
                <i className="fas fa-plus"></i> Add Another Exercise
              </button>
            </div>

            <div className="form-section">
              <h2>Additional Notes</h2>
              <div className="form-group">
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How did you feel? Any achievements or challenges?"
                  rows="4"
                ></textarea>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Log Workout
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Logworkout;
