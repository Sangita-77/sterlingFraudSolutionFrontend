import "./BTCAddressModel.css";
import { ActivityIcon } from "lucide-animated";
import Buttons from "../Components/ButtonCompo";
import Explorer from "../../assets/images/visualization/majesticons_open.svg";
import Tabs from "./tabs/Tabs";


type ModelProps = {
    isOpen: boolean;
    onClose: () => void;
    address: string;
    title?: string;
};

const BTCAddressModel = ({ isOpen, onClose, address, title = "BTC Address" }: ModelProps) => {
    if (!isOpen) return null;
    return (
        <div className="BTCModelOverlay">
            <div className="BTCModel">
                <div className="BTCModelHeader">
                    <div>
                        <h3>{title}</h3>
                        <p>{address}</p>
                    </div>

                    <button className="BTCModelCloseBtn" onClick={onClose}>
                        <ActivityIcon />
                    </button>
                </div>

                <div className="showOrder">
                    <Buttons text="SHOW OWNER" variant="primary" size="lg" />
                </div>

                <div className="buttons2Div">
                    <Buttons text="Explorer Views" variant="black-t" size="lg" icon={<img src={Explorer} />} />
                    <Buttons text="Report Addess" variant="danger-t" size="lg" icon={<ActivityIcon />} />
                </div>

                <div className="Table">
                    <table>
                        <tbody>
                            <tr className="TableHeader">
                                <th>Info</th>
                                <th>Total</th>
                                <th className="marked">Marked</th>

                            </tr>

                            <tr>
                                <td>Transactions count</td>
                                <td>0</td>
                                <td className="marked">0</td>
                            </tr>

                            <tr>
                                <td>Received ammount</td>
                                <td className="received-amount">5415 BTC</td>
                                <td className="marked received-amount">5415 BTC</td>
                            </tr>

                            <tr>
                                <td>Sent ammount</td>
                                <td className="send-amount">6546 BTC</td>
                                <td className="marked send-amount">45 BTC</td>
                            </tr>
                            <tr>
                                <td>Balance</td>
                                <td id="balance">5645646 BTC</td>
                                <td className="marked"></td>
                            </tr>
                        </tbody>


                    </table>

                </div>

                <div>
                    <Tabs />
                </div>
                <div >
                    <div className="TableColored">
                        <table className="Table2">
                            <tbody>
                                <tr className="TableHeaderColor">
                                    <th>Date</th>
                                    <th>Transation </th>
                                    <th>Debit/Credit</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="DataNotFound">
                    No transaction were found for this address.
                    it has not been used on the network yet.
                </div>

            </div>
        </div> 
    );
};

export default BTCAddressModel;