const formatDate = (dateInput: Date): string => {
  const date = new Date(dateInput);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};

export default formatDate;
