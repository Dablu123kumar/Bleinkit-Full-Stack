
const verificationEmailTemplate = ({name,url}) => {
    return `
    <p>Dear ${name}</p>
    <p>Thank you for registring to blinkit.</p>
    <a href=${url} style="color:white;background:blue;margin-top:10px;padding:10px;margin:10px;">verify email</a>

    `
}

export default verificationEmailTemplate
