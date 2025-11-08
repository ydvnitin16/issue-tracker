export const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Not provided';
    return new Intl.DateTimeFormat('en-us', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(date);
};
