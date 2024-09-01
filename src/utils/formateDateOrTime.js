
export const formatDateOrTime = (dateString, issuanceType) => {
    const date = new Date(dateString);
    if (issuanceType === "Home") {
      // Format to show only the date
      return date.toLocaleDateString();
    } else if (issuanceType === "Library") {
      // Format to show only the time
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return dateString; // Fallback in case of unknown issuanceType
  };



  