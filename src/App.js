import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [reminderDays, setReminderDays] = useState([]);
  const [reminder, setReminder] = useState('');

  useEffect(() => {
    // Notification.requestPermission();
  }, []);

  const handleAddMedication = () => {
    if (newMedication.trim() !== '' && dosage.trim() !== '' && frequency.trim() !== '' && reminderTime.trim() !== '' && reminderDays.length > 0) {
      const utcReminderTime = new Date(Date.UTC(1970, 0, 1, parseInt(reminderTime.split(':')[0]), parseInt(reminderTime.split(':')[1])));

      let medicationReminder = '';
      if (reminder.trim() !== '') {
        medicationReminder = `Reminder: ${reminder}`;
      }

      setMedications([
        ...medications,
        {
          name: newMedication,
          dosage: dosage,
          frequency: frequency,
          reminderTime: reminderTime,
          reminderDays: reminderDays,
          reminder: medicationReminder,
        },
      ]);

      setNewMedication('');
      setDosage('');
      setFrequency('');
      setReminderTime('');
      setReminderDays([]);
      setReminder('');
      // scheduleReminder(utcReminderTime, medicationReminder);
    }
  };

  const handleRemoveMedication = (index) => {
    const updatedMedications = [...medications];
    updatedMedications.splice(index, 1);
    setMedications(updatedMedications);
  };

  // const scheduleReminder = (time, reminder) => {
  //   const currentTime = new Date();
  //   const timeDifference = time.getTime() - currentTime.getTime();

  //   if (timeDifference > 0) {
  //     setTimeout(() => {
  //       handleReminder(reminder);
  //     }, timeDifference);
  //   }
  // };

  // const handleReminder = (reminder) => {
  //   if (Notification.permission === 'granted') {
  //     new Notification('Medication Reminder', {
  //       body: reminder,
  //     });
  //   }
  // };

  const handleDayToggle = (day) => {
    const updatedDays = [...reminderDays];
    if (updatedDays.includes(day)) {
      updatedDays.splice(updatedDays.indexOf(day), 1);
    } else {
      updatedDays.push(day);
    }
    setReminderDays(updatedDays);
  };

  return (
    <div className="App">
      <h1>Medication Tracker</h1>
      <div className="medication-list">
        {medications.length === 0 ? (
          <p>No medications added yet.</p>
        ) : (
          <ul>
            {medications.map((medication, index) => (
              <li key={index}>
                <strong>Name:</strong> {medication.name}<br/>
                <strong>Dosage:</strong> {medication.dosage}<br/>
                <strong>Frequency:</strong> {medication.frequency}<br/>
                <strong>Reminder Time:</strong> {medication.reminderTime}<br/>
                <strong>Reminder Days:</strong> {medication.reminderDays.join(', ')}<br/>
                {medication.reminder && (
                  <>
                    <strong>Reminder:</strong> {medication.reminder}<br/>
                    {/* <button onClick={() => handleReminder(medication.reminder)}>Set Reminder</button> */}
                  </>
                )}
                <button onClick={() => handleRemoveMedication(index)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="add-medication">
        <input
          type="text"
          placeholder="Medication Name"
          value={newMedication}
          onChange={(e) => setNewMedication(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dosage"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        />
        <input
          type="time"
          placeholder="Reminder Time"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
        />
        <div>
          <label>Reminder Days:</label><br/>
          <input type="checkbox" checked={reminderDays.includes('Sunday')} onChange={() => handleDayToggle('Sunday')} /><label>Sunday</label>
          <input type="checkbox" checked={reminderDays.includes('Monday')} onChange={() => handleDayToggle('Monday')} /><label>Monday</label>
          <input type="checkbox" checked={reminderDays.includes('Tuesday')} onChange={() => handleDayToggle('Tuesday')} /><label>Tuesday</label>
          <input type="checkbox" checked={reminderDays.includes('Wednesday')} onChange={() => handleDayToggle('Wednesday')} /><label>Wednesday</label>
          <input type="checkbox" checked={reminderDays.includes('Thursday')} onChange={() => handleDayToggle('Thursday')} /><label>Thursday</label>
          <input type="checkbox" checked={reminderDays.includes('Friday')} onChange={() => handleDayToggle('Friday')} /><label>Friday</label>
          <input type="checkbox" checked={reminderDays.includes('Saturday')} onChange={() => handleDayToggle('Saturday')} /><label>Saturday</label>
        </div>
        <input
          type="text"
          placeholder="Reminder (optional)"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
        />
        <button onClick={handleAddMedication}>Add Medication</button>
      </div>
    </div>
  );
}

export default App;
