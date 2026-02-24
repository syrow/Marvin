import MailService from '#services/mail_service'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import edge from 'edge.js'
import mjml2html from 'mjml'
import mjml from 'mjml'

export default class TestsController {
  public async sendEmail({ }: HttpContext) {
      // const request_data = {
      //       "email": "ganguchimmad@gmail.com",
      //       "url": "http://localhost:3335/test"
      // }

      // // edge.renderRawSync(, { username: 'virk' })

      // const html_data = mjml(textView('email/verify_email_html', request_data)).html
      // const body = {
      //       config: {
      //       host: 'syrow.com',
      //       port: 465,
      //       secure: true,
      //       auth: {
      //       user: 'gangappa.c@syrow.in',
      //       pass: 'Sy4Jb2$8kcM',
      //       },
      //       },

      //       mailDetails: {
      //       from: 'gangappa.c@syrow.in',
      //       to: 'ganguchimmad@gmail.com',
      //       subject: 'Hello',
      //       text: 'Hello world? my text',
      //       html: html_data
      //       },
      // }
      // const config = body.config

      // const mailDetails = body.mailDetails

      // const mailService = new MailService(config)
      // console.log('mailService ', mailService)

      // try {
      //       const res = await mailService.sendMail(mailDetails)
      //       return res
      //       return response.status(200).json({ message: 'Email sent successfully' })
      // } catch (error) {
      //       return response.status(500).json({ error: 'Failed to send email', details: error.message })
      // }
  }

  public async test({ request }: HttpContext) {
    // const template_params = request.body()

    const template = await db.from("mail_templates").where("id", 22).first()
    const message_body = `<mjml>
     <mj-head>
       <mj-title>{{project_name}} - Daily Summary</mj-title>
       <mj-font name="Inter" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
       <mj-attributes>
         <mj-text color="#1F2937" font-size="16px" font-family="'Inter', Arial, sans-serif" font-weight="400" line-height="1.6" padding="8px 0" />
         <mj-section padding="0" />
         <mj-column padding="0" />
         <mj-button background-color="#4F46E5" color="#FFFFFF" font-size="16px" font-weight="600" border-radius="8px" padding="12px 24px" />
       </mj-attributes>
       <mj-style inline="inline">
         .header-gradient {
           background: linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%);
         }
         .metric-card {
           background: #FFFFFF;
           border: 1px solid #E5E7EB;
           border-radius: 12px;
           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
           transition: box-shadow 0.2s ease-in-out;
         }
         .metric-card:hover {
           box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
         }
         .chart-container {
           background: #F9FAFB;
           border-radius: 10px;
           padding: 16px;
           margin: 12px 0;
         }
         .footer-gradient {
           background: linear-gradient(to right, #F3F4F6, #E5E7EB);
         }
       </mj-style>
     </mj-head>
   
     <mj-body background-color="#F9FAFB" width="750px">
       <mj-wrapper padding="0">
         <!-- Header Section -->
         <mj-section css-class="header-gradient" padding="40px 24px">
           <mj-column>
             <mj-image href="{{dashboard_url}}" src="{{project_logo}}" alt="{{project_name}} Logo" align="center" width="140px" padding="0 0 16px 0" />
             <mj-text align="center" color="#FFFFFF" font-size="24px" font-weight="600" padding="0 0 8px 0">
               Daily Analytics Summary
             </mj-text>
             <mj-text align="center" color="#E0E7FF" font-size="16px" font-weight="400">
               {{report_date}}
             </mj-text>
           </mj-column>
         </mj-section>
   
         <!-- Welcome Section -->
         <mj-section background-color="#FFFFFF" padding="32px 24px">
           <mj-column>
             <mj-text font-size="18px" font-weight="600" color="#1F2937" padding="0 0 12px 0">
               Hello {{client_name}},
             </mj-text>
             <mj-text color="#6B7280" line-height="1.6">
               Your daily performance insights from <strong style="color: #4F46E5;">{{project_name}}</strong> are ready. Review the key metrics and trends below to understand your communication system's performance for today.
             </mj-text>
           </mj-column>
         </mj-section>
   
         <!-- Key Metrics Section -->
         <mj-section background-color="#FFFFFF" padding="0 24px 32px 24px">
           <mj-column>
             <mj-text font-size="20px" font-weight="600" color="#1F2937" padding="0 0 20px 0" align="center">
               Key Performance Metrics
             </mj-text>
           </mj-column>
         </mj-section>
   
         <!-- Metric Cards - Row 1 -->
        <mj-section background-color="#FFFFFF" padding="0 16px 16px 16px">
          <mj-group>
            <mj-column width="25%" padding="8px">
              <mj-text align="center" css-class="metric-card" padding="20px 16px">
                <span style="font-size: 14px; color: #6B7280; font-weight: 500; text-transform: uppercase;">Total Calls</span><br />
                <strong style="font-size: 26px; color: #1F2937;">{{total_calls}}</strong><br />
                <span style="font-size: 12px; color: #9CA3AF;">Today</span>
              </mj-text>
            </mj-column>
  
            <mj-column width="25%" padding="8px">
              <mj-text align="center" css-class="metric-card" padding="20px 16px">
                <span style="font-size: 14px; color: #6B7280; font-weight: 500; text-transform: uppercase;">Incoming</span><br />
                <strong style="font-size: 26px; color: #059669;">{{incoming_count}}</strong><br />
                <span style="font-size: 12px; color: #9CA3AF;">Today</span>
              </mj-text>
            </mj-column>
  
            <mj-column width="25%" padding="8px">
              <mj-text align="center" css-class="metric-card" padding="20px 16px">
                <span style="font-size: 14px; color: #6B7280; font-weight: 500; text-transform: uppercase;">Outgoing</span><br />
                <strong style="font-size: 26px; color: #2563EB;">{{outgoing_count}}</strong><br />
                <span style="font-size: 12px; color: #9CA3AF;">Today</span>
              </mj-text>
            </mj-column>
  
            <mj-column width="25%" padding="8px">
              <mj-text align="center" css-class="metric-card" padding="20px 16px">
                <span style="font-size: 14px; color: #6B7280; font-weight: 500; text-transform: uppercase;">Missed</span><br />
                <strong style="font-size: 26px; color: #DC2626;">{{missed_count}}</strong><br />
                <span style="font-size: 12px; color: #9CA3AF;">Today</span>
              </mj-text>
            </mj-column>
          </mj-group>
        </mj-section>
  
  
        <!-- Metric Cards - Row 2 -->
        <mj-section background-color="#FFFFFF" padding="0 16px 32px 16px">
          <mj-group>
  
            <mj-column width="25%" padding="8px">
              <mj-text align="center" css-class="metric-card" padding="20px 16px">
                <span style="font-size: 14px; color: #6B7280; font-weight: 500; text-transform: uppercase;">Total Duration</span><br />
                <strong style="font-size: 26px; color: #7C3AED;">{{total_duration}}</strong><br />
                <span style="font-size: 12px; color: #9CA3AF;">Minutes</span>
              </mj-text>
            </mj-column>
  
            <mj-column width="25%" padding="8px">
              <mj-text align="center" css-class="metric-card" padding="20px 16px">
                <span style="font-size: 14px; color: #6B7280; font-weight: 500; text-transform: uppercase;">Avg Handle Time</span><br />
                <strong style="font-size: 26px; color: #EA580C;">{{average_handling_time}}</strong><br />
                <span style="font-size: 12px; color: #9CA3AF;">Minutes</span>
              </mj-text>
            </mj-column>
  
            <!-- NEW: Credits Used -->
            <mj-column width="25%" padding="8px">
              <mj-text align="center" css-class="metric-card" padding="20px 16px">
                <span style="font-size: 14px; color: #6B7280; font-weight: 500; text-transform: uppercase;">Credits Used</span><br />
                <strong style="font-size: 26px; color: #DC2626;">{{credits_used}}</strong><br />
                <span style="font-size: 12px; color: #9CA3AF;">Today</span>
              </mj-text>
            </mj-column>
  
            <!-- NEW: Credit Balance -->
            <mj-column width="25%" padding="8px">
              <mj-text align="center" css-class="metric-card" padding="20px 16px">
                <span style="font-size: 14px; color: #6B7280; font-weight: 500; text-transform: uppercase;">Credit Balance</span><br />
                <strong style="font-size: 26px; color: #059669;">{{credit_balance}}</strong><br />
                <span style="font-size: 12px; color: #9CA3AF;">Available</span>
              </mj-text>
            </mj-column>
  
          </mj-group>
        </mj-section>
  
   
         <!-- CTA Section -->
         <mj-section background-color="#FFFFFF" padding="0 24px 40px 24px">
           <mj-column>
             <mj-text align="center" font-size="18px" font-weight="600" color="#1F2937" padding="0 0 12px 0">
               Explore Detailed Insights
             </mj-text>
             <mj-text align="center" color="#6B7280" padding="0 0 20px 0">
               Access comprehensive analytics and trends in your dashboard.
             </mj-text>
             <mj-button href="{{dashboard_url}}">
               View Analytics Dashboard
             </mj-button>
           </mj-column>
         </mj-section>
   
         <!-- Visual Analytics Section -->
         <mj-section background-color="#FFFFFF" padding="0 24px 32px 24px">
           <mj-column>
             <mj-text font-size="20px" font-weight="600" color="#1F2937" padding="0 0 20px 0" align="center">
               Performance Trends
             </mj-text>
             
             <mj-text css-class="chart-container">
               <div style="border-left: 3px solid #4F46E5; padding-left: 12px;">
                 <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1F2937;">Total Call Duration</h3>
                 <p style="margin: 4px 0 0 0; font-size: 14px; color: #6B7280;">Daily communication volume</p>
               </div>
             </mj-text>
             <mj-image src="{{chart_url_minutes}}" alt="Total Call Duration" title="Total Call Duration" padding="8px 0 16px 0" border-radius="8px" />
   
             <mj-text css-class="chart-container">
               <div style="border-left: 3px solid #059669; padding-left: 12px;">
                 <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1F2937;">Total Call Volume</h3>
                 <p style="margin: 4px 0 0 0; font-size: 14px; color: #6B7280;">Overall call activity</p>
               </div>
             </mj-text>
             <mj-image src="{{chart_url_volume}}" alt="Total Call Volume" title="Total Call Volume" padding="8px 0 16px 0" border-radius="8px" />
   
             <mj-text css-class="chart-container">
               <div style="border-left: 3px solid #2563EB; padding-left: 12px;">
                 <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1F2937;">Inbound Call Volume</h3>
                 <p style="margin: 4px 0 0 0; font-size: 14px; color: #6B7280;">Incoming call trends</p>
               </div>
             </mj-text>
             <mj-image src="{{chart_url_inbound}}" alt="Inbound Call Volume" title="Inbound Call Volume" padding="8px 0 16px 0" border-radius="8px" />
   
             <mj-text css-class="chart-container">
               <div style="border-left: 3px solid #7C3AED; padding-left: 12px;">
                 <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1F2937;">Outbound Call Volume</h3>
                 <p style="margin: 4px 0 0 0; font-size: 14px; color: #6B7280;">Outgoing call activity</p>
               </div>
             </mj-text>
             <mj-image src="{{chart_url_outbound}}" alt="Outbound Call Volume" title="Outbound Call Volume" padding="8px 0 16px 0" border-radius="8px" />
           </mj-column>
         </mj-section>
         
         
         <!-- DID Wise Call Count Table -->
        <mj-section background-color="#FFFFFF" padding="0 0px 32px 0px">
          <mj-column border-radius="8px">
  
            @if(did_number_wise_count && did_number_wise_count.length)
  
              <mj-text font-size="18px" font-weight="bold" padding="10px 0" color="#1F2937" align="center">
                DID Number Wise Call Summary
              </mj-text>
  
              <mj-table width="100%" cellpadding="0" cellspacing="0" font-size="14px" line-height="1.6">
  
               <!-- Table Header -->
              <tr style="background-color:#F3F3F3;">
                <th align="left" style="padding:12px; border:1px solid #E5E7EB; font-weight:600;">
                  DID Number
                </th>
                <th align="center" style="padding:12px; border:1px solid #E5E7EB; font-weight:600;">
                  Call Count
                </th>
              </tr>
  
                <!-- Dynamic Rows -->
                @each(item in did_number_wise_count)
                  <tr>
                    <td style="padding:10px 12px; border:1px solid #E5E7EB; color:#374151;">
                      {{ item.did_number }}
                    </td>
                    <td align="center" style="padding:10px 12px; border:1px solid #E5E7EB; font-weight:600; color:#374151;">
                      {{ item.call_count }}
                    </td>
                  </tr>
                @end
  
              </mj-table>
  
            @end
  
          </mj-column>
        </mj-section>
      
   		<mj-section background-color="#FFFFFF" padding="20px 20px 32px 20px">
           <mj-column>
         
             @if(Array.isArray(ivr_counts) && ivr_counts.length > 0)
  						<mj-text font-size="18px" font-weight="bold" padding="10px 0" color="#1F2937" align="center">
                IVR Summary
              </mj-text>
             @each((ivr, index) in ivr_counts)
                 <!-- IVR TABLE WITH HEADER -->
                 @if(ivr && ivr.ivr_name)
                   <mj-table width="100%" padding="0 0 20px 0">
                     <!-- Header Row with Full Colspan -->
                     <tr style="background-color:#F3F3F3;">
                       <th 
                         colspan="{{ ivr.max_cols || 1 }}"
                         align="left" 
                         style="padding:12px; border:1px solid #E5E7EB; font-weight:600; font-size:16px;"
                       >
                         {{ ivr.ivr_name }} ({{ ivr.total_calls || 0 }})
                       </th>
                     </tr>
 
                     @if(ivr.has_data)
                       <!-- Data Rows -->
                       @each(row in ivr.rows)
                         <tr>
                           @each(cell in row)
                             <td
                               rowspan="{{ cell.rowspan || 1 }}"
                               style="padding:8px 12px; border:1px solid #ccc; font-size:13px; vertical-align:top;"
                             >
                               {{ (cell && cell.name) || '-' }} ({{ (cell && cell.calls) || 0 }})
                             </td>
                           @end
                         </tr>
                       @end
                     @else
                       <!-- No Data Row with Full Colspan -->
                       <tr>
                         <td 
                           colspan="{{ ivr.max_cols || 1 }}"
                           style="padding:12px; border:1px solid #ccc; font-size:13px; text-align:center; color:#6B7280;"
                         >
                           No data available
                         </td>
                       </tr>
                     @end
                   </mj-table>
                 @end
         
               @end
             @end
         
           </mj-column>
         </mj-section>
  
         <!-- Support Section -->
         <mj-section background-color="#F9FAFB" padding="32px 24px">
           <mj-column>
             <mj-text align="center" font-size="18px" font-weight="600" color="#1F2937" padding="0 0 12px 0">
               Need Assistance?
             </mj-text>
             <mj-text align="center" color="#6B7280" line-height="1.6">
               Our support team is available to help you optimize your {{project_name}} experience. Contact us for any questions or assistance with your analytics.
             </mj-text>
             <mj-text align="center" padding="16px 0 0 0">
               <a href="{{appointment_url}}" style="color: #4F46E5; font-weight: 600; text-decoration: none; border-bottom: 1px solid #E0E7FF;">Schedule a Consultation</a>
             </mj-text>
           </mj-column>
         </mj-section>
   
         <!-- Closing Section -->
         <mj-section background-color="#FFFFFF" padding="32px 24px">
           <mj-column>
             <mj-text align="center" font-size="18px" font-weight="600" color="#1F2937" padding="0 0 12px 0">
               Thank You for Choosing {{project_name}}
             </mj-text>
             <mj-text align="center" color="#6B7280" line-height="1.6">
               We are committed to enhancing your business communication.
             </mj-text>
             <mj-text align="center" font-weight="600" color="#1F2937" padding="16px 0 0 0">
               Best regards,<br />
               <span style="color: #4F46E5;">The {{project_name}} Team</span>
             </mj-text>
           </mj-column>
         </mj-section>
   
         <!-- Footer Section -->
         <mj-section css-class="footer-gradient" padding="24px">
           <mj-column>
             <mj-text align="center" font-size="16px" font-weight="600" color="#1F2937" padding="0 0 8px 0">
               Powered by {{project_name}}
             </mj-text>
             <mj-text align="center" font-size="14px" color="#6B7280">
               Streamlined Communication Solutions
             </mj-text>
           </mj-column>
         </mj-section>
   
         <!-- Legal Notice -->
         <mj-section background-color="#F9FAFB" padding="24px">
           <mj-column>
             <mj-text font-size="12px" color="#6B7280" align="center" line-height="1.6" padding="0 16px">
               This email was sent to {{user_email}} as part of your {{project_name}} account services. 
               It contains important performance data and account information. 
               <a href="{{dashboard_url}}" style="color: #4F46E5; text-decoration: none;">Manage your account settings</a>.
             </mj-text>
           </mj-column>
         </mj-section>
       </mj-wrapper>
     </mj-body>
   </mjml>`

    const mail_payload = await db.from("message_histories").where("id", 21851).first()

    const template_body = await edge.renderRaw(message_body, mail_payload.template_params)
    let body = mjml2html(template_body).html

    return body
}
}
