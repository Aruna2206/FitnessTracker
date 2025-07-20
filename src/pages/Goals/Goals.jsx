import React, { useState } from "react";
import "./Goals.css";

function Goals() {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Lose 10 pounds",
      category: "weight",
      target: "150 lbs",
      deadline: "2023-12-31",
      progress: 40,
      description: "Focus on calorie deficit and regular cardio workouts.",
    },
    {
      id: 2,
      title: "Run a half marathon",
      category: "cardio",
      target: "13.1 miles",
      deadline: "2023-10-15",
      progress: 65,
      description: "Follow 12-week training plan with increasing mileage.",
    },
    {
      id: 3,
      title: "Bench press 200 lbs",
      category: "strength",
      target: "200 lbs",
      deadline: "2023-11-30",
      progress: 80,
      description: "Progressive overload with proper form and recovery.",
    },
  ]);

  const [newGoal, setNewGoal] = useState({
    title: "",
    category: "weight",
    target: "",
    deadline: "",
    description: "",
    progress: 0,
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({
      ...newGoal,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingGoalId) {
      // Update existing goal
      setGoals(
        goals.map((goal) =>
          goal.id === editingGoalId ? { ...newGoal, id: editingGoalId } : goal
        )
      );
      setEditingGoalId(null);
    } else {
      // Add new goal
      setGoals([
        ...goals,
        {
          ...newGoal,
          id: Date.now(),
          progress: 0,
        },
      ]);
    }

    // Reset form
    setNewGoal({
      title: "",
      category: "weight",
      target: "",
      deadline: "",
      description: "",
      progress: 0,
    });
    setIsFormVisible(false);
  };

  const handleEdit = (goal) => {
    setNewGoal(goal);
    setEditingGoalId(goal.id);
    setIsFormVisible(true);
  };

  const handleDelete = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const handleProgressUpdate = (id, newProgress) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, progress: newProgress } : goal
      )
    );
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "weight":
        return "⚖️";
      case "strength":
        return "💪";
      case "cardio":
        return "🏃";
      case "flexibility":
        return "🧘";
      case "nutrition":
        return "🥗";
      default:
        return "🎯";
    }
  };

  const getProgressColor = (progress) => {
    if (progress < 30) return "#ff6b6b";
    if (progress < 70) return "#ffd166";
    return "#06d6a0";
  };

  const formatDeadline = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="goals-container">
      <div className="goals-header">
        <h1>Fitness Goals</h1>
        <p>Set, track, and achieve your personal fitness milestones</p>
      </div>

      <div className="goals-summary">
        <div className="summary-card">
          <div className="summary-icon">🎯</div>
          <div className="summary-info">
            <h3>{goals.length}</h3>
            <p>Active Goals</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">✅</div>
          <div className="summary-info">
            <h3>{goals.filter((goal) => goal.progress === 100).length}</h3>
            <p>Completed</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">⏳</div>
          <div className="summary-info">
            <h3>{goals.filter((goal) => goal.progress < 100).length}</h3>
            <p>In Progress</p>
          </div>
        </div>
      </div>

      <div className="goals-actions">
        <button
          className="add-goal-btn"
          onClick={() => {
            setIsFormVisible(!isFormVisible);
            setEditingGoalId(null);
            if (!isFormVisible) {
              setNewGoal({
                title: "",
                category: "weight",
                target: "",
                deadline: "",
                description: "",
                progress: 0,
              });
            }
          }}
        >
          {isFormVisible ? "Cancel" : "Add New Goal"}
        </button>
      </div>

      {isFormVisible && (
        <div className="goal-form-container">
          <form className="goal-form" onSubmit={handleSubmit}>
            <h2>{editingGoalId ? "Edit Goal" : "Create New Goal"}</h2>

            <div className="form-group">
              <label htmlFor="title">Goal Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newGoal.title}
                onChange={handleInputChange}
                placeholder="e.g., Lose 10 pounds"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={newGoal.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="weight">Weight Management</option>
                  <option value="strength">Strength Training</option>
                  <option value="cardio">Cardiovascular</option>
                  <option value="flexibility">Flexibility</option>
                  <option value="nutrition">Nutrition</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="target">Target</label>
                <input
                  type="text"
                  id="target"
                  name="target"
                  value={newGoal.target}
                  onChange={handleInputChange}
                  placeholder="e.g., 150 lbs, 10 miles, etc."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="deadline">Target Date</label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={newGoal.deadline}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description & Strategy</label>
              <textarea
                id="description"
                name="description"
                value={newGoal.description}
                onChange={handleInputChange}
                placeholder="Describe your goal and how you plan to achieve it"
                rows="3"
              ></textarea>
            </div>

            {editingGoalId && (
              <div className="form-group">
                <label htmlFor="progress">Progress ({newGoal.progress}%)</label>
                <input
                  type="range"
                  id="progress"
                  name="progress"
                  min="0"
                  max="100"
                  value={newGoal.progress}
                  onChange={handleInputChange}
                />
              </div>
            )}

            <button type="submit" className="submit-btn">
              {editingGoalId ? "Update Goal" : "Create Goal"}
            </button>
          </form>
        </div>
      )}

      <div className="goals-list">
        {goals.length === 0 ? (
          <div className="no-goals">
            <div className="no-goals-icon">🎯</div>
            <h3>No Goals Set Yet</h3>
            <p>
              Create your first fitness goal to start tracking your progress
            </p>
          </div>
        ) : (
          goals.map((goal) => (
            <div key={goal.id} className="goal-card">
              <div className="goal-header">
                <div className="goal-category">
                  <span className="category-icon">
                    {getCategoryIcon(goal.category)}
                  </span>
                  <span className="category-text">
                    {goal.category.charAt(0).toUpperCase() +
                      goal.category.slice(1)}
                  </span>
                </div>
                <div className="goal-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(goal)}
                    aria-label="Edit goal"
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(goal.id)}
                    aria-label="Delete goal"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <h3 className="goal-title">{goal.title}</h3>

              <div className="goal-details">
                <div className="goal-target">
                  <span className="detail-label">Target:</span>
                  <span className="detail-value">{goal.target}</span>
                </div>
                <div className="goal-deadline">
                  <span className="detail-label">Deadline:</span>
                  <span className="detail-value">
                    {formatDeadline(goal.deadline)}
                  </span>
                </div>
                <div className="goal-timeframe">
                  <span className="detail-label">Days Left:</span>
                  <span className="detail-value">
                    {calculateDaysRemaining(goal.deadline)}
                  </span>
                </div>
              </div>

              {goal.description && (
                <p className="goal-description">{goal.description}</p>
              )}

              <div className="goal-progress">
                <div className="progress-info">
                  <span>Progress: {goal.progress}%</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={goal.progress}
                    onChange={(e) =>
                      handleProgressUpdate(goal.id, parseInt(e.target.value))
                    }
                    className="progress-slider"
                  />
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${goal.progress}%`,
                      backgroundColor: getProgressColor(goal.progress),
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Goals;
