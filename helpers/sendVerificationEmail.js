import transporter from "../config/emailConfig.js";

const logRegistrationEmailToConsole = (email, verificationToken, verificationLink) => {
    console.log("\n========== VERIFICATION EMAIL ==========");
    console.log(`To: ${email}`);
    console.log(`Subject: Email Verification`);
    console.log(`\nPlease verify your email by visiting:`);
    console.log(`Verification Link: ${verificationLink}`);
    console.log(`Verification Token: ${verificationToken}`);
    console.log("=======================================\n");
};

export const sendVerificationEmail = async (email, verificationToken) => {
    const verificationLink = `/auth/verify/${verificationToken}`;

    if (!transporter) {
        // to console instead of sending email
        logRegistrationEmailToConsole(email, verificationToken, verificationLink);
        return;
    }

    // Production mode: send email via Nodemailer
    const mailOptions = {
        from: process.env.EMAIL_SERVICE_USER,
        to: email,
        subject: "Email Verification",
        html: `
            <h1>Email Verification</h1>
            <p>Please verify your email by clicking the link below:</p>
            <a href="${process.env.BASE_API_URL}/auth/verify/${verificationToken}">
                Verify Email
            </a>
            <p>Or copy and paste this link in your browser:</p>
            <p>${process.env.BASE_API_URL}/auth/verify/${verificationToken}</p>
            <p>If you did not create this account, please ignore this email.</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        logRegistrationEmailToConsole(email, verificationToken, verificationLink);
        throw error;
    }
};
