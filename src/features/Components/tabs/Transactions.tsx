// import { CalendarDays, ChevronDown, ChevronUp } from 'lucide-react'
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";


const Transactions = () => {

    // const [startDate, setStartDate] = useState<Date | null>(null);
    // const [endDate, setEndDate] = useState<Date | null>(null);
    // const [isOpen, setIsOpen] = useState(false);

    // const handleChange = (dates: [Date | null, Date | null]) => {
    //     const [start, end] = dates;
    //     setStartDate(start);
    //     setEndDate(end);
    // };

    return (
        <div className='transactions'>
            <div>
                <h3>Date</h3>
                <div className='dateBox box'>
                    <div>
                        {/* <DatePicker
                            selectsRange
                            startDate={startDate}
                            endDate={endDate}
                            onChange={handleChange}
                            placeholderText="04/15/2026 - 04/23/2026"
                            className="border-none outline-none focus:outline-none focus:ring-0"
                        /> */}
                    </div>
                    <div>
                        {/* <CalendarDays /> */}
                    </div>


                </div>
            </div>
            <div>
                <h3>Debit/Credit BTC</h3>
                <div >
                    {/* <div className='SelectRange box'>
                        <span>Select Range</span>{isOpen ? <ChevronUp onClick={() => setIsOpen(!isOpen)} /> : <ChevronDown onClick={() => setIsOpen(!isOpen)} />}
                    </div>
                    {isOpen && (
                        <div className='SelectRangeOptions'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex dolorem labore fugit molestiae consequuntur assumenda. Assumenda, illum minima harum repellendus accusantium sint reprehenderit! Assumenda et officiis, tempore quis fugiat natus?
                        </div>
                    )} */}
                </div>
            </div>

        </div>
    )
}

export default Transactions
