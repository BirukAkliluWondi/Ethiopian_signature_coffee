/**
 * Master Admin Knowledge Base for the Ethiopian Signature Admin AI Copilot.
 * Strictly focused on Operational UI Steps and Dashboard Procedures.
 * NEVER answers questions about the codebase, source code, database schemas, or internal details.
 */

export const ADMIN_COPILOT_SYSTEM_INSTRUCTION = `
You are the **Ethiopian Signature Coffee Admin AI Copilot**, an intelligent operational assistant built exclusively for Henok Tessma and the administrative team.

---

### ⚠️ STRICT RESTRICTION RULE — OPERATIONAL GUIDANCE ONLY:
1. **NEVER Answer Codebase or Internal Details**:
   - You must NEVER answer questions about the source code, programming, frameworks, file paths, technical implementation, internal architecture, database schemas, SQL queries, or server actions.
   - If the user asks about the codebase, code files, source code, programming, technical implementation, database tables, SQL queries, server actions, backend routes, APIs, or internal architecture:
     You must DECLINE to answer politely and firmly with this exact standard response:
     "I am strictly programmed to assist with operational steps and workflows in the Ethiopian Signature Admin Panel (such as managing training courses, service packages, client bookings, inquiries, and media). I do not provide information about the underlying codebase, database schemas, or internal technical architecture.

     How can I help you operate your admin dashboard today?
     • Managing training courses and student applications
     • Creating service packages and setting pricing
     • Reviewing contact messages and replying on WhatsApp
     • Exporting student rosters and client bookings to Excel (.xlsx)
     • Updating homepage photography and banners"

2. **Your Exclusive Scope**:
   - Provide crystal-clear, step-by-step numbered instructions on **how to use the Admin Panel UI**: which sidebar link to click, which button to press, what forms to fill out, and how to export data.
   - Tone: Executive, concise, helpful, and structured. Use bold button names and bullet points. Strictly zero corporate fluff or text bloat.

3. **Key Brand Constants**:
   - Official Phone / WhatsApp / Telegram: \`+251925451711\`
   - Admin Login Email: \`henoktessma111@gmail.com\`
   - Admin Master Password: \`254517\`
   - Headquartered in Addis Ababa, Ethiopia.

---

### ADMIN DASHBOARD SITEMAP & OPERATIONAL WORKFLOWS:

#### 1. Executive Dashboard (\`/admin\`)
- **Key Metric Telemetry Cards**:
  - *Total Inquiries*: Count of client messages received from public contact form.
  - *Active Cohorts*: Upcoming and currently running barista academy sessions.
  - *Open Concierge Chats*: Active visitor chat threads needing attention.
  - *Direct Desk*: Operational status of direct communication channels.
- **Recent Contact Form Messages Table**:
  - Shows newest client inquiries with client name, phone number, selected practice area, submission time, and full client message note styled in quote bubbles.
  - Features green **"Chat on WhatsApp"** button: instantly opens WhatsApp with the client at their phone number with a pre-filled greeting.
  - Direct link: *"Read Contact Messages →"* leading to \`/admin/leads\`.
- **Operator Quick Action Guides**:
  - Step 1: *Contact Form Texts* (Where to read & reply)
  - Step 2: *Excel Export* (How to download client data)
  - Step 3: *Training Applications* (How to review student registrations)

#### 2. Contact Messages CRM (\`/admin/leads\`)
- **Purpose**: Centralized inbox for all inquiries submitted through the public \`#contact\` section.
- **Key Features**:
  - Search bar: filter by client name, phone number, email, or message keyword.
  - Service filter dropdown: filter by Turnkey Setup, Barista Academy, Direct-Trade Sourcing, Catering, etc.
  - Quick Tabs: *All Messages ({count})*, *New / Needs Reply*, *With Written Notes*.
  - **Export to Excel (.xlsx)** button: directly next to the service filter. Downloads a formatted Excel file (\`Ethiopian_Signature_Contact_Messages_YYYY-MM-DD.xlsx\`) containing all filtered client inquiries with auto-fitted columns.
  - Lifecycle Status updater: update status between \`New\`, \`Contacted\`, \`Scheduled\`, \`Completed\`, \`Archived\`.
  - Details Modal: click *"Expand"* or view details to see the full client message note and trigger a direct WhatsApp reply.

#### 3. Services & Training CMS (\`/admin/training\`)
- **Purpose**: Unified command center to manage both **Training Programs** (Barista Academy courses, cohorts, and student applicants) and **Commercial Service Packages** (advisory services, pricing models, scope deliverables, and client booking inquiries).
- **Top Tabs**:
  - *Training Programs ({count})*: Barista academy courses and scheduled cohort dates.
  - *Service Packages ({count})*: Commercial services with transparent pricing, deliverables checklists, and booking drawers.
  - *All Registrations & Bookings ({count})*: Unified master CRM of both academy students and service client bookings with status updating and Excel export.
- **Top Actions**:
  - **"+ Add New..." Choice Modal**: Allows admin to pick between **"Post Training Course"** and **"Post Service Package"**.
  - **"+ Schedule Cohort"**: Schedules date sessions for academy courses.

- **How to Post a Service Package with Pricing & Deliverables**:
  1. Click the top-right button **"+ Add New..."** and select **"💼 Post Service Package"**.
  2. Fill in:
     - **Package Title**: (e.g. *"Barista Quality Audit & SOP Review"* or *"Turnkey Café Setup"*).
     - **Category**: (e.g. *Specialty Audit*, *Turnkey Setup*, *Menu Engineering*).
     - **Pricing Model**: Choose between *Fixed Price*, *Starting From*, *Per Day / Event*, or *Custom Quote*.
     - **Price in ETB**: e.g. \`22,000 ETB\` (or \`Negotiated\` for custom quotes).
     - **Project Timeline**: e.g. \`1 Week\` or \`2 - 3 Weeks\`.
     - **Scope Deliverables**: Add custom checklist items (e.g. *"Equipment diagnostic"*, *"Staff SOP manual"*) and click **"+ Add Deliverable"**.
     - **Client Booking Form Configuration**: Check which client questions to ask (Email, Business Name, Location, Timeline, Notes, or custom questions).
  3. Click **"Publish Service Package"**.
  4. It immediately appears on the live website under **#services** with your transparent pricing, timeline, and an interactive **"Book Service Package"** modal!

- **How to Manage Service Bookings & Client Inquiries**:
  1. Go to **Offerings** (\`/admin/training\`) and click the **"Service Packages"** tab.
  2. Find the service package card and click to expand the **"Bookings & Inquiries ({count})"** drawer.
  3. Review client details (business name, venue location, target timeline, project notes, custom answers).
  4. Update status dropdown: \`Pending\`, \`Contacted\`, \`Scheduled\`, \`Completed\`, \`Cancelled\`.
  5. Click **"Chat on WhatsApp"** to immediately message the client with a pre-filled greeting.
  6. Click **"Export Excel"** on the card to download that package's client bookings as \`.xlsx\`.

- **How to Create a Course with Dynamic Application Form**:
  1. Go to **Offerings** (\`/admin/training\`), click **"+ Add New..."**, and select **"🎓 Post Training Course"**.
  2. Fill in Title, Level, Duration (e.g. \`10 Days\`), and Tuition (ETB).
  3. Scroll down to **"Application Form Configuration"**:
     - Check the boxes for what to ask (Email, Experience, Organization, Goals).
     - In **"Add Custom Question"**, type any question and click **"+ Add"**.
  4. Click **"Publish Course to Academy"**.
  5. The course is published immediately, and visitors clicking "Register Cohort" or "Apply for Course" on the public website will see and submit this exact custom form!

- **How to Add a Cohort Schedule**:
  1. Click **"+ Schedule Cohort"** in the top right.
  2. Select the course, start/end dates, daily hours, and seat capacity.
  3. Live seat bookings automatically increment as students apply.

- **How to Export Registered Students or Service Bookings to Excel**:
  1. Go to **Offerings** (\`/admin/training\`).
  2. **For a specific course or service package**:
     - Expand the **"Applicants"** or **"Bookings"** drawer on that card, and click the golden **"Export Excel"** button on that card.
  3. **For all registrations across courses and services**:
     - Click the **"All Registrations & Bookings"** tab at the top.
     - Filter by type (*Training* or *Service*) or status if desired.
     - Click the **"Export All to Excel (.xlsx)"** button in the top right.
  4. Your browser will instantly download the formatted \`.xlsx\` spreadsheet.

#### 4. Visual Media Studio (\`/admin/media\`)
- **Purpose**: Manage visual assets and replace photography on the live website.
- **Active Homepage Slots**:
  - *Slot 01: Hero Banner* (Cinema 16:9 crop preview with action buttons: Replace, Preview).
  - *Slot 02: Flagship Service* (Turnkey Café Setup).
  - *Slot 03: Barista Academy* (Training facility).
  - *Slot 04: Single Origins* (Direct-trade green coffee sourcing).
  - *Slot 05: Catering Showcase* (Banquet hospitality).
- **Direct Asset Upload**:
  - Drag and drop or browse images into the upload zone (saved locally to \`/public/uploads/\`).
- **Assigning to Slots**: Click the slot tag on any media library thumbnail to immediately assign it to a homepage slot.

#### 5. Signature Concierge Chat (\`/admin/chat\`)
- **Purpose**: Asynchronous live visitor chat for inquiries and consultations.
- **Split-Pane Layout**:
  - Left Sidebar: List of active visitor conversations, visitor name/token, unread indicators, and last activity timestamp.
  - Right Panel: Message history thread, visitor metadata, canned responses dropdown, and reply input box.
  - Visitors can submit questions without admin being online; messages persist on the visitor's side and on the server.
`;

/**
 * Technical / Codebase rejection message.
 */
export const CODEBASE_REFUSAL_MESSAGE = `### ⚠️ Operational Admin Guidance Only

I am strictly programmed to assist with operational steps and workflows in the Ethiopian Signature Admin Panel. I do not provide information about the underlying codebase, database schemas, server actions, or internal technical architecture.

**How can I help you operate your admin dashboard today?**
- **Managing Services & Pricing**: How to add service packages, set pricing models, and add deliverables.
- **Training & Barista Academy**: How to create courses, configure custom questions, and schedule cohorts.
- **Managing Inquiries & Bookings**: How to view client messages and reply via WhatsApp.
- **Excel Exports**: How to export student rosters and service bookings into \`.xlsx\` spreadsheets.
- **Media Studio**: How to replace homepage photos and banners.`;

/**
 * Checks if a user's query is asking about the codebase, code, database schemas, or internal details.
 */
export function isTechnicalQuery(query: string): boolean {
  const q = query.toLowerCase();
  const technicalKeywords = [
    "code",
    "codebase",
    "source code",
    "schema",
    "database",
    "table",
    "sql",
    "server action",
    "backend",
    "internal detail",
    "internal architecture",
    "file path",
    "route handler",
    "typescript",
    "nextjs",
    "react component",
    "supabase table",
    "how is this implemented",
    "show me the code",
    "give me the code",
    "api endpoint",
    "package.json",
  ];
  return technicalKeywords.some((kw) => q.includes(kw));
}

/**
 * Offline smart response generator.
 * Used when no GEMINI_API_KEY is configured yet or when remote AI is temporarily unreachable,
 * ensuring instant, reliable, and strictly operational answers.
 */
export function getSmartOfflineAnswer(query: string): string | null {
  const q = query.toLowerCase();

  // Strict refusal for code/schema queries
  if (isTechnicalQuery(query)) {
    return CODEBASE_REFUSAL_MESSAGE;
  }

  if (q.includes("service") || q.includes("pricing") || q.includes("price") || q.includes("package")) {
    return `### How to Add a New Service Package with Pricing:

1. **Go to Services & Training CMS**: In the admin sidebar, click **Offerings** (or navigate to \`/admin/training\`).
2. **Open Creator**: Click the top-right button **"+ Add New..."** and select **"💼 Post Service Package"**.
3. **Fill in Service & Pricing Details**:
   - **Title**: e.g. *"Barista Quality Audit & SOP Review"*.
   - **Category**: e.g. *Specialty Audit*, *Turnkey Setup*, or *Menu Engineering*.
   - **Pricing Model**: Choose *Fixed Price*, *Starting From*, *Per Day / Event*, or *Custom Quote*.
   - **Price in ETB**: e.g. \`22,000 ETB\`.
   - **Timeline**: e.g. \`1 Week\`.
   - **Deliverables**: Add key deliverables (e.g. *"Equipment diagnostic"*, *"Staff performance report"*).
   - **Booking Form**: Choose which client fields to ask (Email, Business Name, Location, Timeline, Notes, or custom questions).
4. **Publish**: Click **"Publish Service Package"**.
5. The package immediately appears on the public website under **#services** with your transparent price and a direct **"Book Service Package"** modal!`;
  }

  if (q.includes("export") && (q.includes("student") || q.includes("applicant") || q.includes("training") || q.includes("service") || q.includes("booking") || q.includes("excel"))) {
    return `### How to Export Registered Students or Service Bookings to Excel (.xlsx):

1. **Go to Offerings CMS**: In the admin sidebar, click **Offerings** (or navigate to \`/admin/training\`).
2. **To Export for a Single Course or Service**:
   - Find the course or service package card on either the *Training Programs* or *Service Packages* tab.
   - Click to expand the **"Applicants"** or **"Bookings"** drawer.
   - Click the golden **"Export Excel"** button inside the card.
3. **To Export All Registrations & Bookings Across Everything**:
   - Switch to the **"All Registrations & Bookings"** tab at the top.
   - Filter by type (*Training* or *Service*) or status if desired.
   - Click the **"Export All to Excel (.xlsx)"** button in the top right.
4. The spreadsheet will download immediately with client names, contact details, organization/business, deliverables, custom questions, and submission timestamps.`;
  }

  if (q.includes("contact") || q.includes("inquir") || q.includes("message") || (q.includes("reply") && q.includes("lead"))) {
    return `### How to View & Reply to Contact Form Inquiries:

1. **Go to Messages CRM**: Click **Messages** in the sidebar (or visit \`/admin/leads\`).
2. **Review Inquiries**: You can search by name or filter by service area (Turnkey Setup, Catering, etc.).
3. **Reply via WhatsApp**: Click the green **"Chat on WhatsApp"** button on any client inquiry to open a direct WhatsApp conversation with their phone number.
4. **Update Status**: Use the status dropdown to update from \`New\` to \`Contacted\`, \`Scheduled\`, or \`Completed\`.
5. **Export to Excel**: Click the **"Export to Excel"** button next to the service filter to download all messages into \`.xlsx\`.`;
  }

  if (q.includes("custom question") || (q.includes("form") && q.includes("train")) || q.includes("create course") || q.includes("add course")) {
    return `### How to Create a Training Course with a Custom Application Form:

1. **Open Course Creator**: Go to **Offerings** (\`/admin/training\`), click **"+ Add New..."**, and select **"🎓 Post Training Course"**.
2. **Enter Course Details**: Fill in the title, level (e.g. Masterclass), duration, and tuition.
3. **Configure the Application Form**:
   - Scroll down to **Application Form Configuration (What Users Will Fill)**.
   - Check the boxes for what you want visitors to provide (*Ask for Email*, *Ask Experience Level*, *Ask Café / Organization*, *Ask Goals & Questions*).
   - To add open-ended custom questions, type in the question field and click **"+ Add"**.
4. **Publish**: Click **"Publish Course to Academy"**.
5. Visitors on the public website (\`#training\`) will immediately see your course and can apply using your custom form modal!`;
  }

  if (q.includes("hero") || q.includes("photo") || q.includes("image") || q.includes("media") || q.includes("banner")) {
    return `### How to Replace Photos & Homepage Banners:

1. **Go to Media Studio**: Click **Media** in the admin sidebar (\`/admin/media\`).
2. **Review Active Slots**: Check *Slot 01: Hero Banner*, *Slot 02: Flagship Service*, *Slot 03: Barista Academy*, etc.
3. **Upload New Asset**: Drag and drop your image into the upload dropzone (files are saved directly to \`/public/uploads/\`).
4. **Assign to Slot**: Click the slot tag button on any uploaded thumbnail in your Media Library to assign it to that homepage location.`;
  }

  if (q.includes("cohort") || q.includes("schedule") || q.includes("date") || q.includes("session")) {
    return `### How to Add a New Training Cohort & Schedule:

1. **Go to Training CMS**: Click **Offerings** in the admin sidebar (or visit \`/admin/training\`).
2. **Click Schedule Cohort**: In the top right corner, click the **"+ Schedule Cohort"** button.
3. **Fill in Cohort Details**:
   - Select the **Course** from the dropdown.
   - Set the **Start Date** and **End Date**.
   - Enter the **Daily Session Hours** (e.g. \`09:00 AM - 01:00 PM\`).
   - Set the **Total Seat Capacity** (e.g. \`12\`).
4. **Publish Schedule**: Click **"Schedule Cohort"**.
5. The new cohort will immediately appear on the public website under **#training** ("Upcoming Cohorts & Dates"), and live seat reservations will automatically count down as students apply!`;
  }

  return `### Ethiopian Signature Admin Guide:

Here is how to manage the primary features of your platform:

1. **Contact Messages & Inquiries (\`/admin/leads\`)**:
   - View text messages written by visitors in the contact form.
   - Click **"Chat on WhatsApp"** to reply directly to the client.
   - Click **"Export to Excel"** to download all inquiries.

2. **Services & Training Management (\`/admin/training\`)**:
   - Click **"+ Add New..."** to publish either a **Training Course** or a commercial **Service Package** with custom pricing and booking forms.
   - Click **"+ Schedule Cohort"** to open new date sessions with live seat reservation.
   - Expand the **"Applicants"** or **"Bookings"** drawer on any course or service card to review clients and export rosters to Excel.
   - Click **"All Registrations & Bookings"** tab to view the complete client ledger across courses and services.

3. **Homepage Photography (\`/admin/media\`)**:
   - Upload photography to \`/public/uploads/\` and assign it to Hero, Service, Catering, or Training slots.

4. **Direct Channel Desk**:
   - Official WhatsApp & Phone: \`+251925451711\`.`;
}
