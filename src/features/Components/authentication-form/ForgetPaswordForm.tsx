import React, { useState } from "react";
import "../IndexComponents.css";
import Buttons from '../ButtonCompo';
import { BASE_URL } from "../../../api/config";



type FormData = {
    email: string
}
type FormErrors = Partial<Record<keyof FormData, string>>;

type ForgetPasswordFormProps = {
  onClose: () => void;
  openSendCode: (email: string) => void
};

type SendCodeApiResponse = {
    success: boolean;
    message?: string;
    expiresIn?: number;
};


const ForgetPasswordForm = ({ onClose , openSendCode }: ForgetPasswordFormProps) => {

    const [formData, setFormData] = useState<FormData>({
        email: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [submitError, setSubmitError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validate(name as keyof FormData, value);
        setSubmitError("");
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


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(validateAllFields())return

        setIsSubmitting(true);
        setSubmitError("");

        try {
            const email = formData.email.trim();
            const response = await fetch(`${BASE_URL}/send-code`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const result: SendCodeApiResponse = await response.json();

            if (!response.ok || !result.success) {
                setSubmitError(result.message || "Unable to send verification code.");
                return;
            }

            onClose()
            openSendCode(email)
        } catch (error) {
            console.error("Send code error:", error);
            setSubmitError("Something went wrong while sending the code.");
        } finally {
            setIsSubmitting(false);
        }

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
                    {submitError && <p className="error">{submitError}</p>}
                    <br />

                    <Buttons
                        text={isSubmitting ? "SENDING..." : "SEND CODE"}
                        variant="primary"
                        size='full'
                        type="submit"
                        disabled={isSubmitting}
                    />
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
