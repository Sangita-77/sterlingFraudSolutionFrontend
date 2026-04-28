import React, { useRef } from 'react'
import Buttons from '../ButtonCompo'

type Props = {
    onClose: () => void
}

const SendCode = ({ onClose }: Props) => {
    const inputs = useRef<(HTMLInputElement | null)[]>([])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const value = e.target.value

        // Allow only numbers
        if (!/^[0-9]?$/.test(value)) return

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


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const code = inputs.current
            .map((input) => input?.value || '')
            .join('')
        console.log('Entered Code:', code)

        onClose()

    }

    return (
        <>
            <span className="disclamer-sendCode">
                Don't worry, we will send you the reset information
            </span>

            <div className="formContainer">
                <form onSubmit={handleSubmit}>
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
                            />
                        ))}
                    </div>

                    <Buttons text="VERIFY" variant="primary" size="full" />
                </form>

                <div className="needHelp">
                    <span className="link-sendCode dontReceiveCode">
                        Didn't receive the code?
                    </span>
                    <span className="link-sendCode">Resend</span>
                </div>
            </div>
        </>
    )
}

export default SendCode