import { useState } from "react";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

const CustomCalendar = ({ open, setOpen}: Props) => {
   const today = new Date();
   today.setHours(0, 0, 0, 0);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get number of days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // First day of month (0 = Sunday)
  const firstDay = new Date(year, month, 1).getDay();

  // Generate calendar days
const totalCells = 42;

// Previous month info
const prevMonthDays = new Date(year, month, 0).getDate();

// Days from previous month (leading)
const prevDays = Array.from({ length: firstDay }, (_, i) => ({
  day: prevMonthDays - firstDay + i + 1,
  type: "prev",
}));

// Current month days
const currentDays = Array.from({ length: daysInMonth }, (_, i) => ({
  day: i + 1,
  type: "current",
}));

// Current month 
const isCurrentMonth =
  year === today.getFullYear() && month === today.getMonth();

// Next month days (trailing)
const nextDaysCount = totalCells - (prevDays.length + currentDays.length);

const nextDays = Array.from({ length: nextDaysCount }, (_, i) => ({
  day: i + 1,
  type: "next",
}));

// Final 42 cells
const daysArray = [...prevDays, ...currentDays, ...nextDays];

// Add trailing empty cells to make total 42
const handleRangeSelect = (day: number, type: string) => {
  let newDate;

  if (type === "prev") {
    newDate = new Date(year, month - 1, day);
  } else if (type === "next") {
    newDate = new Date(year, month + 1, day);
  } else {
    newDate = new Date(year, month, day);
  }

  if (!fromDate || (fromDate && toDate)) {
    setFromDate(newDate);
    setToDate(null);
  } else if (newDate >= fromDate) {
    setToDate(newDate);
  } else {
    setFromDate(newDate);
    setToDate(null);
  }

  setCurrentDate(newDate);
};

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  const formatDate = (date: Date) => {
    return `${date.getDate().toString().padStart(2, "0")}/${
      (date.getMonth() + 1).toString().padStart(2, "0")
    }/${date.getFullYear()}`;
  };

  return (
    <>
      {open && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            {/* Header */}
            <div style={styles.header}>
              <button onClick={() => changeMonth(-1)}>◀</button>
              <span>
                {currentDate.toLocaleString("default", {
                  month: "long",
                })}{" "}
                {year}
              </span>
              <button
                onClick={() => changeMonth(1)}
                disabled={isCurrentMonth}
                style={{
                    opacity: isCurrentMonth ? 0.5 : 1,
                }}
                >
                ▶
             </button>
            </div>

            {/* Week Days */}
            <div style={styles.grid}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} style={styles.weekDay}>
                  {d}
                </div>
              ))}

              {/* Dates */}
                {daysArray.map((item, i) => {
                const cellDate =
                    item.type === "prev"
                    ? new Date(year, month - 1, item.day)
                    : item.type === "next"
                    ? new Date(year, month + 1, item.day)
                    : new Date(year, month, item.day);
             const isToday =
             cellDate.toDateString() === today.toDateString();

                const isStart =
                    fromDate &&
                    cellDate.toDateString() === fromDate.toDateString();

                const isEnd =
                    toDate &&
                    cellDate.toDateString() === toDate.toDateString();

                const isInRange =
                    fromDate &&
                    toDate &&
                    cellDate > fromDate &&
                    cellDate < toDate;

                return (
                    <div
                    key={i}
                    style={{
                    ...styles.day,
                    background:
                        isStart || isEnd
                        ? "#4CAF50"
                        : isInRange
                        ? "#A5D6A7"
                        : isToday
                        ? "#2196F3"   
                        : "#eee",

                    color:
                        isStart || isEnd
                        ? "#fff"
                        : item.type === "prev" || item.type === "next"
                        ? "#aaa"
                        : "#000",
                    }}
                    onClick={() => handleRangeSelect(item.day, item.type)}
                    >
                    {item.day}
                    </div>
                );
                })}
            </div>

            {/* Selected */}
                {fromDate && (
                <p>From: {formatDate(fromDate)}</p>
                )}
                {toDate && (
                <p>To: {formatDate(toDate)}</p>
                )}
            

            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomCalendar;

// Styles
const styles = {
  overlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "320px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "5px",
  },
  weekDay: {
    fontWeight: "bold",
    textAlign: "center" as const,
  },
  day: {
    padding: "10px",
    textAlign: "center" as const,
    cursor: "pointer",
    borderRadius: "5px",
  },
};