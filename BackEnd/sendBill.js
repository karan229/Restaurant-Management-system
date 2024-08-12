const nodemailer = require('nodemailer');

const sendBillEmail = async (email, tableId, selectedItems, customization) => {
  const totalAmount = selectedItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
    console.log('Customization details received in backend:', customization);

  const itemsList = selectedItems
    .map(item => `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `)
    .join('');

  const emailContent = `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
          background-color: #f9f9f9;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #4158d0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #4158d0;
          color: #fff;
        }
        tfoot td {
          font-weight: bold;
          background-color: #f2f2f2;
        }
        .customization {
          margin-top: 20px;
          padding: 10px;
          background-color: #f2f2f2;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Restaurant Bill</h1>
        <p><strong>Table ID:</strong> ${tableId}</p>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">Total Amount</td>
              <td>$${totalAmount}</td>
            </tr>
          </tfoot>
        </table>
        ${customization ? `<div class="customization"><strong>Customizations:</strong> ${customization}</div>` : ''}
        <p>Thank you for dining with us!</p>
      </div>
    </body>
    </html>
  `;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Restaurant Bill',
    html: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email sending failed');
  }
};

module.exports = sendBillEmail;