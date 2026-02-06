// Netlify Function: Sends confirmation email when order form is submitted
// This function is automatically triggered by Netlify when a form submission occurs

const SITE_NAME = "Cold Front Calls";
const OWNER_NAME = "Randy";

export default async (request, context) => {
    // Parse the form submission data from Netlify
    const body = await request.json();
    const { payload } = body;

    // Extract customer data from form submission
    const customerEmail = payload.data.email;
    const customerName = payload.data.name;
    const orderDetails = payload.data.order_details;
    const phone = payload.data.phone;
    const address = payload.data.address;

    // Generate order confirmation email HTML
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - ${SITE_NAME}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #141414; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding: 40px 40px 30px;">
              <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #e4e4e7, #a1a1aa); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
                <span style="color: #0a0a0a; font-weight: bold; font-size: 24px;">C</span>
              </div>
              <h1 style="color: #ffffff; font-size: 28px; margin: 20px 0 0; font-weight: 600;">Order Received!</h1>
            </td>
          </tr>
          
          <!-- Greeting -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0;">
                Hey ${customerName.split(' ')[0]},
              </p>
              <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 16px 0 0;">
                Thank you for your order! We've received your request and are excited to get your new calls in your hands.
              </p>
              <p style="color: #e4e4e7; font-size: 16px; line-height: 1.6; margin: 16px 0 0; padding: 20px; background-color: rgba(255,255,255,0.05); border-radius: 12px; border-left: 3px solid #e4e4e7;">
                <strong>${OWNER_NAME}</strong> will reach out to you shortly to finalize details and collect payment.
              </p>
            </td>
          </tr>
          
          <!-- Order Summary -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="color: #ffffff; font-size: 18px; margin: 0 0 16px; font-weight: 600;">Your Order</h2>
              <div style="background-color: #0a0a0a; border-radius: 12px; padding: 20px; border: 1px solid rgba(255,255,255,0.05);">
                <pre style="color: #e4e4e7; font-family: 'Monaco', 'Consolas', monospace; font-size: 14px; margin: 0; white-space: pre-wrap; line-height: 1.8;">${orderDetails}</pre>
              </div>
            </td>
          </tr>
          
          <!-- Shipping Info -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="color: #ffffff; font-size: 18px; margin: 0 0 16px; font-weight: 600;">Shipping To</h2>
              <div style="background-color: #0a0a0a; border-radius: 12px; padding: 20px; border: 1px solid rgba(255,255,255,0.05);">
                <p style="color: #a1a1aa; font-size: 14px; margin: 0; line-height: 1.6;">
                  ${customerName}<br>
                  ${address.replace(/\\n/g, '<br>')}<br>
                  ${phone}
                </p>
              </div>
            </td>
          </tr>
          
          <!-- What's Next -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <h2 style="color: #ffffff; font-size: 18px; margin: 0 0 16px; font-weight: 600;">What's Next?</h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 32px; height: 32px; background-color: #e4e4e7; border-radius: 50%; text-align: center; vertical-align: middle;">
                          <span style="color: #0a0a0a; font-weight: bold; font-size: 14px;">1</span>
                        </td>
                        <td style="padding-left: 16px; color: #a1a1aa; font-size: 14px;">We'll confirm availability of your items</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 32px; height: 32px; background-color: #e4e4e7; border-radius: 50%; text-align: center; vertical-align: middle;">
                          <span style="color: #0a0a0a; font-weight: bold; font-size: 14px;">2</span>
                        </td>
                        <td style="padding-left: 16px; color: #a1a1aa; font-size: 14px;">${OWNER_NAME} will contact you to collect payment</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 32px; height: 32px; background-color: #e4e4e7; border-radius: 50%; text-align: center; vertical-align: middle;">
                          <span style="color: #0a0a0a; font-weight: bold; font-size: 14px;">3</span>
                        </td>
                        <td style="padding-left: 16px; color: #a1a1aa; font-size: 14px;">Your calls ship within 2-3 business days</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; border-top: 1px solid rgba(255,255,255,0.05);">
              <p style="color: #71717a; font-size: 12px; margin: 0; text-align: center;">
                Questions? Just reply to this email.<br><br>
                © ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

    // Plain text version
    const emailText = `
Order Received - ${SITE_NAME}

Hey ${customerName.split(' ')[0]},

Thank you for your order! We've received your request and are excited to get your new calls in your hands.

${OWNER_NAME} will reach out to you shortly to finalize details and collect payment.

YOUR ORDER:
${orderDetails}

SHIPPING TO:
${customerName}
${address}
${phone}

WHAT'S NEXT?
1. We'll confirm availability of your items
2. ${OWNER_NAME} will contact you to collect payment
3. Your calls ship within 2-3 business days

Questions? Just reply to this email.

© ${new Date().getFullYear()} ${SITE_NAME}
  `.trim();

    try {
        // Use Netlify's email integration or a third-party service
        // Option 1: Use Resend (recommended - free tier available)
        const RESEND_API_KEY = Netlify.env.get("RESEND_API_KEY");
        const FROM_EMAIL = Netlify.env.get("FROM_EMAIL") || "orders@coldfrontcalls.com";

        if (RESEND_API_KEY) {
            const response = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${RESEND_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: `${SITE_NAME} <${FROM_EMAIL}>`,
                    to: [customerEmail],
                    subject: `Order Received - ${SITE_NAME}`,
                    html: emailHtml,
                    text: emailText,
                }),
            });

            if (!response.ok) {
                const error = await response.text();
                console.error("Failed to send email:", error);
                return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
            }

            console.log(`Confirmation email sent to ${customerEmail}`);
        } else {
            console.warn("RESEND_API_KEY not configured - email not sent");
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("Error sending confirmation email:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
