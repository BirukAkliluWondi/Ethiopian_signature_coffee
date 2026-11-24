import { DashboardDataSnapshot } from "./dashboard-data";

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
- **Active Picture Slots**:
  - Covers Hero Banner Slides, Catering Showcase, Turnkey Café Setup, Barista Academy, Menu Engineering, Consulting, Operations, and Financial Modeling.
- **Direct Asset Upload**:
  - Drag and drop or browse images into the upload zone (saved locally to \`/public/uploads/\`), or select an existing image from the Media Library.
- **Undo & Revert to Original Safety Net**:
  - **Revert to Previous (Undo)**: Click **"Undo"** / **"Revert to Previous Photo"** on any modified card (or **"Restore"** inside the edit modal) to roll back the last change.
  - **Revert to Original (Single Slot)**: Click **"Revert to Original"** / **"Original"** on any card or inside the **"Change"** modal under **"Pristine Original Photo"** to restore the baseline photo that shipped with the site.
  - **Master Site-Wide Reset**: Click **"Revert All to Original"** in the **Active Website Picture Slots** header to restore every single photo across the website back to its pristine factory baseline at once.

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
 * Uses strict regex patterns to avoid falsely triggering on operational terms like "tables in admin" or "passcode".
 */
export function isTechnicalQuery(query: string): boolean {
  const q = query.toLowerCase();
  const technicalPatterns = [
    /\b(source\s+code|codebase|show\s+code|give\s+code|write\s+code|backend\s+code)\b/,
    /\b(database\s+schema|db\s+schema|database\s+table|sql\s+table|supabase\s+table|sql\s+query|postgres|database\s+columns)\b/,
    /\b(server\s+action|server\s+actions|route\s+handler|api\s+route|api\s+endpoint)\b/,
    /\b(file\s+path|file\s+paths|folder\s+structure|directory\s+structure)\b/,
    /\b(typescript|nextjs|next\.js|tailwind|react\s+component|package\.json)\b/,
    /\b(internal\s+architecture|backend\s+architecture|how\s+is\s+this\s+coded|how\s+is\s+this\s+implemented\s+in\s+code)\b/,
    /\b(schema|schemas|sql)\b/,
  ];
  return technicalPatterns.some((pattern) => pattern.test(q));
}

/**
 * Context-aware smart offline response generator.
 * Synthesizes real data from the live database snapshot when remote Gemini API
 * is unreachable or unconfigured, ensuring instant, factual, and strictly operational answers.
 */
export function getSmartOfflineAnswer(
  query: string,
  snapshot?: DashboardDataSnapshot | null
): string {
  const q = query.toLowerCase();

  // Strict refusal for code/schema queries
  if (isTechnicalQuery(query)) {
    return CODEBASE_REFUSAL_MESSAGE;
  }

  // 1. Vercel / API Key Setup Guide
  if (
    q.includes("vercel") ||
    (q.includes("api key") && (q.includes("add") || q.includes("how") || q.includes("where") || q.includes("guide") || q.includes("set")))
  ) {
    return `### How to Add Your Gemini API Key in Vercel:

1. **Get a Free API Key**:
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
   - Sign in with your Google account and click **"Create API key"**.
   - Copy your key (starts with \`AIzaSy...\` or \`AQ...\`).

2. **Open Vercel Dashboard**:
   - Visit [vercel.com](https://vercel.com) and log in.
   - Select your project: **\`ethiopian-signature-coffee\`**.

3. **Navigate to Environment Variables**:
   - Click the **Settings** tab in the top navigation.
   - Click **Environment Variables** in the left sidebar.

4. **Add the Key**:
   - **Key**: \`GEMINI_API_KEY\`
   - **Value**: Paste your Google AI Studio key (\`AIzaSy...\` or \`AQ...\`)
   - **Target Environments**: Check *Production*, *Preview*, and *Development*.
   - Click **Save**.

5. **Redeploy**:
   - Go to the **Deployments** tab.
   - Click the three dots (**\`...\`**) on your latest production deployment and click **Redeploy**.
   - Your Copilot will immediately have full conversational AI enabled!

*Tip: You can also click the ⚙️ icon in the top right of this Copilot window to paste your key locally in your browser for instant testing.*`;
  }

  // 2. Photo Revert / Media Studio / Revert to Original
  if (
    q.includes("revert") ||
    q.includes("undo") ||
    q.includes("original") ||
    ((q.includes("photo") || q.includes("image") || q.includes("media") || q.includes("banner")) &&
      (q.includes("back") || q.includes("previous") || q.includes("change") || q.includes("swap") || q.includes("reset") || q.includes("restore")))
  ) {
    return `### How to Revert or Restore Website Photos:

1. **Open Media Studio**: Click **Media** in the admin sidebar (or navigate to \`/admin/media\`).
2. **To Change Any Photo**:
   - Find the slot (Hero Banner, Services, Academy, Sourcing, or Catering).
   - Click **"Replace"** or **"Change"**.
   - Click **Browse** to upload an image from your device, then click **"Publish to Site"**.
3. **To Undo the Last Change (Revert to Previous)**:
   - If a photo was recently changed, a **"Revert to Previous Photo"** or **"Undo"** button automatically appears on that slot card!
   - Inside the **Change Photo** window, you can also see the **"Previous Photo on File"** preview box and click **"Restore"**.
4. **To Revert Back to the Pristine Original Baseline**:
   - If you ever mess up or want the clean original photos back, click the **"Revert to Original"** button on any custom photo card!
   - You can also click **"Revert All to Original"** at the top of the **Picture Slots** section to instantly reset every hero, catering, and service photo on the site back to the original baseline photos that shipped with the site.`;
  }

  // 3. Deleting Courses, Packages, or Dummy Data
  if (q.includes("delete") || q.includes("remove") || q.includes("erase") || q.includes("trash")) {
    return `### How to Delete Courses or Service Packages:

1. **Go to Offerings CMS**: Click **Offerings** in the admin sidebar (\`/admin/training\`).
2. **Locate the Item**:
   - Click either the **Training Programs** tab or the **Service Packages** tab.
   - Find the course or package card you want to delete (including sample dummy data or real items).
3. **Click the Delete Button**:
   - In the top right corner of each card, click the red trash can button (**🗑️**).
4. **Confirm Deletion**:
   - Click **"OK"** on the confirmation prompt.
   - The course or service package will be permanently deleted from the database and immediately removed from the live website!`;
  }

  // 4. Enrolled Students & Academy Applicants
  if (
    q.includes("student") ||
    q.includes("applicant") ||
    q.includes("enroll") ||
    q.includes("who registered") ||
    q.includes("who applied")
  ) {
    if (snapshot?.enrollments?.recent && snapshot.enrollments.recent.length > 0) {
      const topStudents = snapshot.enrollments.recent.slice(0, 6);
      const studentRows = topStudents
        .map(
          (s, i) =>
            `${i + 1}. **${s.studentName}** — ${s.courseLevel} | 📞 \`${s.phone}\` | Status: *${s.status}* (${s.date})`
        )
        .join("\n");

      return `### 🎓 Registered Students & Academy Applicants:

**Overview**: ${snapshot.enrollments.total} Total Applicants (${snapshot.enrollments.pendingCount} pending review, ${snapshot.enrollments.confirmedCount} confirmed)

**Recent Applicants**:
${studentRows}

**Operational Actions**:
- To manage statuses or export student rosters to Excel, go to **Offerings** (\`/admin/training\`) -> click **"All Registrations & Bookings"** tab -> click **"Export All to Excel (.xlsx)"**.`;
    }

    return `### 🎓 How to View & Manage Registered Students:

1. **Go to Offerings CMS**: In the sidebar, click **Offerings** (\`/admin/training\`).
2. **View Students for a Specific Course**:
   - Expand the **"Applicants"** drawer on any training course card to see students enrolled in that specific program.
3. **View All Students Across All Programs**:
   - Click the **"All Registrations & Bookings"** tab at the top.
   - Filter by type (*Training*) or status (*Pending / Confirmed*).
4. **Export to Excel**: Click **"Export All to Excel (.xlsx)"** in the top right to download the complete roster.`;
  }

  // 5. Client Service Bookings
  if (
    q.includes("booking") ||
    q.includes("client booking") ||
    q.includes("booked service") ||
    q.includes("consultation booking")
  ) {
    if (snapshot?.serviceBookings?.recent && snapshot.serviceBookings.recent.length > 0) {
      const topBookings = snapshot.serviceBookings.recent.slice(0, 5);
      const bookingRows = topBookings
        .map(
          (b, i) =>
            `${i + 1}. **${b.clientName}** (${b.businessName || "Private"}) — 📍 ${b.venueLocation || "Addis Ababa"} | 📞 \`${b.phone}\` | Status: *${b.status}*`
        )
        .join("\n");

      return `### 💼 Client Service Package Bookings:

**Overview**: ${snapshot.serviceBookings.total} Total Bookings (${snapshot.serviceBookings.newCount} new pending)

**Recent Bookings**:
${bookingRows}

**Operational Actions**:
- To reply on WhatsApp or update booking status, visit **Offerings** (\`/admin/training\`) -> **Service Packages** tab -> expand **"Bookings"** on that package card.
- To export all bookings to Excel, click **"All Registrations & Bookings"** -> **"Export All to Excel (.xlsx)"**.`;
    }

    return `### 💼 How to View & Manage Service Bookings:

1. **Go to Offerings CMS**: In the sidebar, click **Offerings** (\`/admin/training\`).
2. **Review Service Bookings**:
   - Click the **Service Packages** tab.
   - Click to expand the **"Bookings & Inquiries"** drawer on any service card.
3. **Reply on WhatsApp**: Click the green **"Chat on WhatsApp"** button to message the client directly.
4. **Export to Excel**: Click the golden **"Export Excel"** button on any package card.`;
  }

  // 6. Contact Form Messages & Inquiries
  if (
    q.includes("inquir") ||
    q.includes("lead") ||
    q.includes("message") ||
    q.includes("contact") ||
    q.includes("text")
  ) {
    if (snapshot?.inquiries?.recent && snapshot.inquiries.recent.length > 0) {
      const topInquiries = snapshot.inquiries.recent.slice(0, 5);
      const inqRows = topInquiries
        .map(
          (inq, i) =>
            `${i + 1}. **${inq.fullName}** — Area: *${inq.service}* | 📞 \`${inq.phone}\` | Status: *${inq.status}* (${inq.date})`
        )
        .join("\n");

      return `### ✉️ Recent Contact Form Messages & Inquiries:

**Overview**: ${snapshot.inquiries.total} Total Messages (${snapshot.inquiries.newCount} new/uncontacted)

**Recent Inquiries**:
${inqRows}

**Operational Actions**:
- Visit **Messages** (\`/admin/leads\`) to review full messages, click **"Chat on WhatsApp"** to reply instantly, or click **"Export to Excel"** to download all records.`;
    }

    return `### ✉️ How to View & Reply to Contact Messages:

1. **Go to Messages CRM**: Click **Messages** in the sidebar (or visit \`/admin/leads\`).
2. **Review Messages**: Filter by service area or status (*New*, *Contacted*, *Scheduled*).
3. **Chat on WhatsApp**: Click **"Chat on WhatsApp"** on any client message card to reply directly to their phone.
4. **Export to Excel**: Click **"Export to Excel"** in the top right to download all messages into \`.xlsx\`.`;
  }

  // 7. Training Courses & Academy Tuition
  if (
    q.includes("course") ||
    q.includes("academy") ||
    q.includes("tuition") ||
    q.includes("curriculum")
  ) {
    if (snapshot?.programs?.list && snapshot.programs.list.length > 0) {
      const progRows = snapshot.programs.list
        .map(
          (p, i) =>
            `${i + 1}. **${p.title}** (${p.level}) — Duration: \`${p.duration}\` | Tuition: **${p.tuition ? p.tuition.toLocaleString() + " ETB" : "Negotiated"}**`
        )
        .join("\n");

      return `### 🎓 Active Barista Academy Courses:

**Overview**: ${snapshot.programs.total} Published Programs

${progRows}

**Operational Actions**:
- To create a new course, click **"+ Add New..."** -> **"Post Training Course"** in \`/admin/training\`.
- To schedule a cohort session with seat capacity, click **"+ Schedule Cohort"**.`;
    }

    return `### 🎓 How to Create & Manage Training Courses:

1. **Go to Offerings CMS**: Click **Offerings** in the sidebar (\`/admin/training\`).
2. **Add a Course**: Click **"+ Add New..."** -> select **"🎓 Post Training Course"**.
3. **Enter Details**: Provide title, level, duration, and tuition.
4. **Configure Form**: Check the boxes for what you want applicants to provide (Email, Experience, Organization, Goals).
5. **Publish**: Click **"Publish Course to Academy"**.`;
  }

  // 8. Cohort Schedules & Session Dates
  if (
    q.includes("cohort") ||
    q.includes("schedule") ||
    q.includes("session") ||
    q.includes("date")
  ) {
    if (snapshot?.cohorts?.list && snapshot.cohorts.list.length > 0) {
      const cohortRows = snapshot.cohorts.list
        .map(
          (c, i) =>
            `${i + 1}. **${c.startDate} to ${c.endDate}** — Time: \`${c.sessionTime}\` | Seats: **${c.seatsBooked}/${c.seatsTotal} booked** (${c.status})`
        )
        .join("\n");

      return `### 📅 Active Barista Training Cohorts:

**Overview**: ${snapshot.cohorts.totalActive} Active Scheduled Sessions

${cohortRows}

**Operational Actions**:
- To open a new date session, click **"+ Schedule Cohort"** in \`/admin/training\`. Live seat counts update automatically as students apply!`;
    }

    return `### 📅 How to Add a New Training Cohort & Schedule:

1. **Go to Training CMS**: Click **Offerings** in the sidebar (\`/admin/training\`).
2. **Click Schedule Cohort**: In the top right, click **"+ Schedule Cohort"**.
3. **Fill in Details**:
   - Select the course from the dropdown.
   - Choose start and end dates.
   - Set daily hours (e.g. \`09:00 AM - 01:00 PM\`).
   - Set total seat capacity (e.g. \`12\`).
4. **Publish**: Click **"Schedule Cohort"**. It will appear live on the website immediately!`;
  }

  // 9. Service Packages & Pricing
  if (
    q.includes("service") ||
    q.includes("package") ||
    q.includes("pricing") ||
    q.includes("price") ||
    q.includes("rate")
  ) {
    if (snapshot?.packages?.list && snapshot.packages.list.length > 0) {
      const pkgRows = snapshot.packages.list
        .map(
          (p, i) =>
            `${i + 1}. **${p.title}** (${p.category}) — Pricing: **${p.pricingModel === "negotiated" ? "Custom Quote" : p.price ? p.price.toLocaleString() + " ETB" : "Starting From"}** | Timeline: \`${p.timeline}\``
        )
        .join("\n");

      return `### 💼 Active Commercial Service Packages:

**Overview**: ${snapshot.packages.total} Published Packages

${pkgRows}

**Operational Actions**:
- To create a new service package, click **"+ Add New..."** -> select **"💼 Post Service Package"** in \`/admin/training\`.
- Packages display transparent pricing and direct booking forms on the public website under **#services**.`;
    }

    return `### 💼 How to Add a New Service Package with Pricing:

1. **Go to Services CMS**: Click **Offerings** in the sidebar (\`/admin/training\`).
2. **Click Add New**: Click **"+ Add New..."** -> select **"💼 Post Service Package"**.
3. **Configure Details**:
   - Set Title, Category, Pricing Model (*Fixed*, *Starting From*, or *Custom Quote*), and Price in ETB.
   - Add scope deliverables (e.g. *"Equipment diagnostic"*, *"SOP manual"*).
   - Select which fields clients will fill out when booking.
4. **Publish**: Click **"Publish Service Package"**.`;
  }

  // 10. Excel Export Guide
  if (
    q.includes("export") ||
    q.includes("excel") ||
    q.includes("xlsx") ||
    q.includes("spreadsheet")
  ) {
    return `### How to Export Data to Excel (.xlsx):

1. **Contact Messages**:
   - Visit **Messages** (\`/admin/leads\`).
   - Click the **"Export to Excel"** button in the top right.
2. **Student Applications & Service Bookings**:
   - Visit **Offerings** (\`/admin/training\`).
   - Click the **"All Registrations & Bookings"** tab.
   - Click the golden **"Export All to Excel (.xlsx)"** button in the top right.
   - To export a single course or service package, expand its drawer and click **"Export Excel"** on that card.`;
  }

  // 11. Intelligent Default Response Synthesized from Real-Time Records
  return `### Ethiopian Signature Dashboard Status:

Here is the current real-time status of your platform:
- ✉️ **Contact Inquiries**: ${snapshot?.inquiries?.total ?? 0} total messages (${snapshot?.inquiries?.newCount ?? 0} new)
- 🎓 **Training Courses**: ${snapshot?.programs?.total ?? 0} published academy programs
- 📅 **Active Cohorts**: ${snapshot?.cohorts?.totalActive ?? 0} scheduled sessions
- 👥 **Student Registrations**: ${snapshot?.enrollments?.total ?? 0} registered applicants (${snapshot?.enrollments?.pendingCount ?? 0} pending)
- 💼 **Service Packages**: ${snapshot?.packages?.total ?? 0} active packages (${snapshot?.serviceBookings?.total ?? 0} bookings)

**How can I assist you right now?**
- Ask about specific data (e.g. *"who applied recently?"*, *"show me new leads"*, *"what courses are open?"*)
- Ask for operational guidance (e.g. *"how to revert a photo"*, *"how to delete a package"*, *"how to add key in Vercel"*)
- Ask: *"Summarize recent activity"* for an executive operational report.`;
}
