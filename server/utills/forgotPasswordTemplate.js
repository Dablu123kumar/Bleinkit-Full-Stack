const forgotPasswordTemplate = ({ name, otp })=>{
    return `
    <div>
    <p>Dear, ${name}</p>
    <p>you're requested a password reset . Please use following OTP code to reset your password.</p>
    <div style= " background:yellow;font-size:20px; padding : 20px;text-align:center;font-weight:800;">
        ${otp}
    </div>
    <p>This otp is valid for 1hr only . Enter this otp in blinkit website to proceed with reseting your password.</p>
    <br><br>
    <p>Thanks</p>
    <p>Blinkit</p>
</div>
    `
}


export default forgotPasswordTemplate