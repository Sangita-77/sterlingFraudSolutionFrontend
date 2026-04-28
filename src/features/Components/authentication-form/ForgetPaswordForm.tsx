import { useState } from "react";
import "../IndexComponents.css";
import Buttons from '../ButtonCompo';



type FormData = {
    email: string
}
type FormErrors = Partial<Record<keyof FormData, string>>;

type ForgetPasswordFormProps = {
  onClose: () => void;
  openSendCode: () => void
};


const ForgetPasswordForm = ({ onClose , openSendCode }: ForgetPasswordFormProps) => {

    const [formData, setFormData] = useState<FormData>({
        email: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validate(name as keyof FormData, value);
    };

    const validate = (name: keyof FormData, value: string) => {
        let error = "";

        if (!value.trim()) {
            error = "This field is required";
        } else {
            switch (name) {
                case "email":
                    if (!/\S+@\S+\.\S+/.test(value)) {
                        error = "Invalid email format";
                    }
                    break;
            }
        }

        setErrors((prev) => ({ ...prev, [name]: error }));
    };
    
    const validateAllFields = () => {
        const newErrors: FormErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = "This field is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length > 0;
    };


    const handleSubmit = (e: any) => {
        e.preventDefault();
        // validateAllFields
        if(validateAllFields())return
        console.log("Form Data:", formData);
        onClose()
        openSendCode()
        

    };

    return (
        <>
            <span className='disclamer-forget'>
                Don't worry ,we will send you the reset information
            </span>
            <div className="formContainer forget-password-form">
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="full-width">
                        <label>Email*</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                        />
                        {errors.email && <p className="error">{errors.email}</p>}

                    </div>
                    <br />

                    <Buttons text="SEND CODE" variant="primary" size='full' />
                </form>
                <div className="needHelp">
                    <a href="mailto:info@sterlingfraudsolution.com" className='link-login'>Need Help ?</a>
                    <samp className='link-forget'>Forget Password?</samp>
                </div>
            </div>

           

        </>
    )
}

export default ForgetPasswordForm;