import React, { useRef, useState } from 'react';
import Buttons from '../ButtonCompo';
import { BASE_URL } from '../../../api/config';

type Props = {
    onClose: () => void
    email: string
    onSuccess: () => void
}

type VerifyOtpApiResponse = {
    success: boolean;
    message?: string;
    userId?: string;
}

const SendCode = ({ onClose, email, onSuccess }: Props) => {
    const inputs = useRef<(HTMLInputElement | null)[]>([])
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isResending, setIsResending] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const value = e.target.value

        // Allow only numbers
        if (!/^[0-9]?$/.test(value)) return

        setError("")

        if (value && index < 5) {
            inputs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
            inputs.current[index - 1]?.focus()
        }
    }


    const handleSubmit = async () => {
        // e.preventDefault()

        const code = inputs.current
            .map((input) => input?.value || '')
            .join('')

        if (code.length !== 6) {
            setError("Please enter the 6 digit code.")
            return
        }

        if (!email) {
            setError("Email is missing. Please request a new code.")
            return
        }

        setIsSubmitting(true)
        setError("")

        try {
            const response = await fetch(`${BASE_URL}/verify-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    code,
                }),
            })

            const result: VerifyOtpApiResponse = await response.json()

            if (!response.ok || !result.success) {
                setError(result.message || "Invalid code. Please try again.")
                return
            }

            onClose()
            onSuccess()
        } catch (error) {
            console.error("Verify OTP error:", error)
            setError("Something went wrong while verifying the code.")
        } finally {
            setIsSubmitting(false)
        }

    }

    const handleResend = async () => {
        if (!email || isResending) return

        setIsResending(true)
        setError("")

        try {
            const response = await fetch(`${BASE_URL}/send-code`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            const result: VerifyOtpApiResponse = await response.json()

            if (!response.ok || !result.success) {
                setError(result.message || "Unable to resend verification code.")
            }
        } catch (error) {
            console.error("Resend code error:", error)
            setError("Something went wrong while resending the code.")
        } finally {
            setIsResending(false)
        }
    }

    return (
        <>
            <span className="disclamer-sendCode">
                Don't worry, we will send you the reset information
            </span>

            <div className="formContainer">
                {/* <form onSubmit={handleSubmit}> */}
                <div>
                    <div className="sendCodeInputContainer">
                        {[...Array(6)].map((_, i) => (
                            <input
                                key={i}
                                type="text"
                                maxLength={1}
                                ref={(el: any) => (inputs.current[i] = el)}
                                onChange={(e) => handleChange(e, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                className="sendCodeBox"
                                disabled={isSubmitting}
                            />
                        ))}
                    </div>
                    {error && <p className="error">{error}</p>}

                    {/* <Buttons
                        text={isSubmitting ? "VERIFYING..." : "VERIFY"}
                        variant="primary"
                        size="full"
                        type="submit"
                        disabled={isSubmitting}
                    /> */}

                    <Buttons
                        text={isSubmitting ? "VERIFYING..." : "VERIFY"}
                        variant="primary"
                        size="full"
                        type="button"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                    />
                {/* </form> */}
                </div>

                <div className="needHelp">
                    <span className="link-sendCode dontReceiveCode">
                        Didn't receive the code?
                    </span>
                    <span className="link-sendCode" onClick={handleResend}>
                        {isResending ? "Resending..." : "Resend"}
                    </span>
                </div>
            </div>
        </>
    )
}

export default SendCode
