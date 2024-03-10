const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Partial<Intl.DateTimeFormatOptions> = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    };

    return date.toLocaleDateString("de-DE", options);
};

export { formatDateTime };