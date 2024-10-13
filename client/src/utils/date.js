const dates = {

    formatTime: (timeString) => {
      if (!timeString) return '';
      const date = new Date(timeString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },

    formatRemainingTime: (eventDateTime) => {
      if (!eventDateTime) return '';
      const eventDate = new Date(eventDateTime);
      const now = new Date();
      const diff = eventDate - now; 
  
      if (diff <= 0) {
        return 'Event has already occurred.';
      }
  
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
  
      let remainingTime = '';
      if (days > 0) remainingTime += `${days} day(s) `;
      if (hours > 0) remainingTime += `${hours} hour(s) `;
      if (minutes > 0) remainingTime += `${minutes} minute(s)`;
  
      return remainingTime || 'Less than a minute remaining';
    },

    formatNegativeTimeRemaining: (remaining, eventId) => {
      if (remaining === 'Event has already occurred.') {
        const element = document.getElementById(`remaining-${eventId}`);
        if (element) {
          element.style.color = 'red';
        }
      }
    },
  };
  
  export default dates;
  