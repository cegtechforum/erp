import nodemailer from "nodemailer";

export async function sendEmail(dt, superUsers,emergency) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const rows = dt.items
    .map(
      (item) => `
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">${item.itemName}</td>
      <td style="border: 1px solid #ddd; padding: 8px;">${item.count}</td>
    </tr>
  `,
    )
    .join("");

  const htmlContent = `
    <h1>${emergency ? " <span style='color:red'> Emergency Request </span>" : "Request "} for Logistics Items</h1>
    <p>Dear Logistics Team,</p>
    <p>An urgent request has been made by a user from the <strong>${dt.domain}</strong> domain for the following items to support the upcoming event, "<strong>${dt.eventName}</strong>." Please review the list below and provide the necessary approvals:</p>

    <table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Item Name</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Count</th>

        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>

    <p style="text-align: center; margin-top: 20px;">
      <a href="https://erp.cegtechforum.in/events/${dt.items[0].eventId}" target="_blank" 
         style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
        Click to View More
      </a>
    </p>
  `;

  for (const user of superUsers) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "New Items Requested",
      html: htmlContent,
    });
  }

  
}
