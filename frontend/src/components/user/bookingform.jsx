import { useContext,useState} from 'react';
import { createBooking } from '../../api/auth.jsx';
import  AuthContext  from '../../context/authcontext.jsx';
import  BookingContext  from '../../context/bookingcontext.jsx';

function BookingForm({ serviceId }) {
  const { user, token } = useContext(AuthContext);
  const { addBooking } = useContext(BookingContext);
  const [selectedDate, setSelectedDate] = useState('');

  const handleBooking = async () => {
    if (!token || !selectedDate) return;


    const bookingData = {
      serviceId,
      userId: user.id,
      date: selectedDate,
    };

    try {
      const response = await createBooking(bookingData, token);
      addBooking(response.data.booking);
      alert('Booking successful!');
      setSelectedDate('');
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  return (
    <div>
      <input
        type="datetime-local"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <button onClick={handleBooking}>Book This Service</button>
    </div>
  );
}

export default BookingForm;