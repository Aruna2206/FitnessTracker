import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  // Mock data - in a real app, this would come from an API or context
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    streak: 12,
    points: 840,
    level: 4,
    nextLevelPoints: 1000,
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
  });

  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      type: "Strength",
      date: "2023-09-15",
      duration: 45,
      calories: 320,
      exercises: ["Bench Press", "Squats", "Deadlifts", "Pull-ups"],
      notes: "Increased weight on bench press by 5 lbs",
    },
    {
      id: 2,
      type: "Cardio",
      date: "2023-09-13",
      duration: 30,
      calories: 280,
      exercises: ["Running"],
      notes: "5k run at moderate pace",
    },
    {
      id: 3,
      type: "Flexibility",
      date: "2023-09-11",
      duration: 25,
      calories: 150,
      exercises: ["Yoga Flow"],
      notes: "Morning yoga session",
    },
  ]);

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Lose 10 pounds",
      deadline: "2023-12-31",
      progress: 40,
    },
    {
      id: 2,
      title: "Run a half marathon",
      deadline: "2023-10-15",
      progress: 65,
    },
    {
      id: 3,
      title: "Bench press 200 lbs",
      deadline: "2023-11-30",
      progress: 80,
    },
  ]);

  const [stats, setStats] = useState({
    workoutsThisWeek: 3,
    workoutsThisMonth: 12,
    totalWorkouts: 67,
    averageDuration: 38,
    caloriesBurned: {
      today: 320,
      week: 1250,
      month: 4800,
    },
  });

  const [activityData, setActivityData] = useState([
    { day: "Mon", workouts: 1 },
    { day: "Tue", workouts: 0 },
    { day: "Wed", workouts: 1 },
    { day: "Thu", workouts: 0 },
    { day: "Fri", workouts: 1 },
    { day: "Sat", workouts: 0 },
    { day: "Sun", workouts: 0 },
  ]);

  // Calculate progress percentage for level
  const levelProgress = (userData.points / userData.nextLevelPoints) * 100;

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get workout type icon
  const getWorkoutIcon = (type) => {
    switch (type.toLowerCase()) {
      case "strength":
        return "💪";
      case "cardio":
        return "🏃";
      case "flexibility":
        return "🧘";
      case "hiit":
        return "⚡";
      case "sports":
        return "🏀";
      default:
        return "🏋️";
    }
  };

  // Get progress color based on percentage
  const getProgressColor = (progress) => {
    if (progress < 30) return "#ff6b6b";
    if (progress < 70) return "#ffd166";
    return "#06d6a0";
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="dashboard-welcome">
        <div className="user-info">
          <div className="user-avatar">
            <img src={userData.profileImage} alt={userData.name} />
          </div>
          <div className="user-details">
            <h1>Welcome back, {userData.name}!</h1>
            <div className="user-stats">
              <div className="stat">
                <span className="stat-icon">🔥</span>
                <span className="stat-value">{userData.streak} day streak</span>
              </div>
              <div className="stat">
                <span className="stat-icon">⭐</span>
                <span className="stat-value">{userData.points} points</span>
              </div>
              <div className="stat">
                <span className="stat-icon">🏆</span>
                <span className="stat-value">Level {userData.level}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="level-progress">
          <div className="progress-label">
            <span>Level {userData.level}</span>
            <span>
              {userData.points}/{userData.nextLevelPoints} points
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${levelProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/logworkout" className="action-card">
          <div className="action-icon">🏋️</div>
          <span>Log Workout</span>
        </Link>
        <Link to="/goals" className="action-card">
          <div className="action-icon">🎯</div>
          <span>Set Goals</span>
        </Link>
        <Link to="/nutrition" className="action-card">
          <div className="action-icon">🥗</div>
          <span>Track Nutrition</span>
        </Link>
        <Link to="/progress" className="action-card">
          <div className="action-icon">📊</div>
          <span>View Progress</span>
        </Link>
      </div>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Workout Stats */}
        <div className="dashboard-card workout-stats">
          <div className="card-header">
            <h2>Workout Stats</h2>
            <Link to="/workouts" className="view-all">
              View All
            </Link>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{stats.workoutsThisWeek}</div>
              <div className="stat-label">This Week</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.workoutsThisMonth}</div>
              <div className="stat-label">This Month</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.totalWorkouts}</div>
              <div className="stat-label">Total</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.averageDuration} min</div>
              <div className="stat-label">Avg Duration</div>
            </div>
          </div>
        </div>

        {/* Calories Burned */}
        <div className="dashboard-card calories-card">
          <div className="card-header">
            <h2>Calories Burned</h2>
          </div>
          <div className="calories-stats">
            <div className="calorie-item">
              <div className="calorie-circle">
                <span className="calorie-value">
                  {stats.caloriesBurned.today}
                </span>
              </div>
              <span className="calorie-label">Today</span>
            </div>
            <div className="calorie-item">
              <div className="calorie-circle">
                <span className="calorie-value">
                  {stats.caloriesBurned.week}
                </span>
              </div>
              <span className="calorie-label">This Week</span>
            </div>
            <div className="calorie-item">
              <div className="calorie-circle">
                <span className="calorie-value">
                  {stats.caloriesBurned.month}
                </span>
              </div>
              <span className="calorie-label">This Month</span>
            </div>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="dashboard-card activity-card">
          <div className="card-header">
            <h2>Weekly Activity</h2>
          </div>
          <div className="activity-chart">
            {activityData.map((day, index) => (
              <div key={index} className="activity-day">
                <div className="activity-bar-container">
                  <div
                    className={`activity-bar ${
                      day.workouts > 0 ? "has-workout" : ""
                    }`}
                    style={{ height: `${day.workouts > 0 ? 100 : 0}%` }}
                  ></div>
                </div>
                <div className="day-label">{day.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Workouts */}
        <div className="dashboard-card recent-workouts">
          <div className="card-header">
            <h2>Recent Workouts</h2>
            <Link to="/workouts" className="view-all">
              View All
            </Link>
          </div>
          <div className="workouts-list">
            {workouts.length === 0 ? (
              <div className="no-data">
                <p>
                  No workouts logged yet. Start tracking your fitness journey!
                </p>
                <Link to="/logworkout" className="action-button">
                  Log Your First Workout
                </Link>
              </div>
            ) : (
              workouts.map((workout) => (
                <div key={workout.id} className="workout-item">
                  <div className="workout-icon">
                    {getWorkoutIcon(workout.type)}
                  </div>
                  <div className="workout-details">
                    <h3>{workout.type} Workout</h3>
                    <div className="workout-meta">
                      <span>{formatDate(workout.date)}</span>
                      <span>{workout.duration} min</span>
                      <span>{workout.calories} cal</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Goal Progress */}
        <div className="dashboard-card goals-progress">
          <div className="card-header">
            <h2>Goal Progress</h2>
            <Link to="/goals" className="view-all">
              View All
            </Link>
          </div>
          <div className="goals-list">
            {goals.length === 0 ? (
              <div className="no-data">
                <p>No goals set yet. Define what you want to achieve!</p>
                <Link to="/goals" className="action-button">
                  Set Your First Goal
                </Link>
              </div>
            ) : (
              goals.map((goal) => (
                <div key={goal.id} className="goal-item">
                  <div className="goal-info">
                    <h3>{goal.title}</h3>
                    <span className="goal-deadline">
                      Due {formatDate(goal.deadline)}
                    </span>
                  </div>
                  <div className="goal-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${goal.progress}%`,
                          backgroundColor: getProgressColor(goal.progress),
                        }}
                      ></div>
                    </div>
                    <span className="progress-percent">{goal.progress}%</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Workouts */}
        <div className="dashboard-card upcoming-workouts">
          <div className="card-header">
            <h2>Workout Plan</h2>
            <Link to="/plan" className="view-all">
              View Plan
            </Link>
          </div>
          <div className="upcoming-list">
            <div className="upcoming-item">
              <div className="upcoming-day">Today</div>
              <div className="upcoming-workout">
                <div className="workout-icon">💪</div>
                <div className="workout-info">
                  <h3>Upper Body Strength</h3>
                  <p>45 min • Chest, Shoulders, Triceps</p>
                </div>
              </div>
            </div>
            <div className="upcoming-item">
              <div className="upcoming-day">Tomorrow</div>
              <div className="upcoming-workout">
                <div className="workout-icon">🏃</div>
                <div className="workout-info">
                  <h3>HIIT Cardio</h3>
                  <p>30 min • Interval Training</p>
                </div>
              </div>
            </div>
            <div className="upcoming-item">
              <div className="upcoming-day">Wed</div>
              <div className="upcoming-workout">
                <div className="workout-icon">🦵</div>
                <div className="workout-info">
                  <h3>Lower Body Strength</h3>
                  <p>50 min • Legs, Glutes, Core</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
