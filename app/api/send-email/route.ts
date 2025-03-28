import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: `New message from ${name}`,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c;">New Contact Form Submission</h2>
          <p><strong style="color: #ea580c;">Name:</strong> ${name}</p>
          <p><strong style="color: #ea580c;">Email:</strong> ${email}</p>
          ${
            phone
              ? `<p><strong style="color: #ea580c;">Phone:</strong> ${phone}</p>`
              : ""
          }
          <p><strong style="color: #ea580c;">Message:</strong></p>
          <p style="background: #fff7ed; padding: 15px; border-radius: 8px;">${message}</p>
          <p style="margin-top: 20px; color: #64748b; font-size: 0.9em;">
            Sent from Leaflet Digital Solutions contact form
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ message: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
