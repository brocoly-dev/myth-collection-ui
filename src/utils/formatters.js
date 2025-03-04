export const formatAmount = (amount, theCurrency = "JPY") => {
    if (amount) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: theCurrency,
        }).format(amount);
    } else {
        return "Not Available";
    }
};

export const formatDate = (dateString, isConfirmed = true) => {
    const date = parseDateWithoutTimezone(dateString);

    let options;
    if (isConfirmed) {
        options = { month: "long", day: "numeric", year: "numeric" };
    } else {
        options = { month: "long", year: "numeric" };
    }
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

    if (isConfirmed) {
        const day = date.getDate();
        return formattedDate.replace(/\d+/, `${day}${getOrdinalSuffix(day)}`);
    } else {
        return formattedDate;
    }
}

function parseDateWithoutTimezone(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // Month is 0-based
}

function getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}
