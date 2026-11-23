import * as XLSX from "xlsx";

export interface ApplicantExportItem {
  id: string;
  created_at: string;
  student_name: string;
  phone: string;
  email?: string | null;
  course_level?: string | null;
  experience_level?: string | null;
  organization?: string | null;
  notes?: string | null;
  custom_answers?: Record<string, any> | null;
  status?: string | null;
  program_title?: string | null;
  cohort_dates?: string | null;
}

export interface InquiryExportItem {
  id: string;
  created_at: string;
  full_name: string;
  phone: string;
  email?: string | null;
  service: string;
  notes?: string | null;
  status?: string | null;
}

/**
 * Downloads a worksheet as a native Excel .xlsx file in the browser.
 */
function downloadWorkbook(workbook: XLSX.WorkBook, filename: string) {
  const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".xlsx") ? filename : `${filename}.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Automatically sets column widths based on longest cell content.
 */
function autoFitColumns(rows: Record<string, any>[]): { wch: number }[] {
  if (rows.length === 0) return [];
  const keys = Object.keys(rows[0]);
  return keys.map((key) => {
    let maxLen = key.length;
    rows.forEach((row) => {
      const val = row[key] ? String(row[key]) : "";
      if (val.length > maxLen) maxLen = Math.min(val.length, 60);
    });
    return { wch: Math.max(maxLen + 3, 12) };
  });
}

/**
 * Exports applicants for a specific training program or cohort.
 */
export function exportProgramApplicantsToExcel(
  programTitle: string,
  applicants: ApplicantExportItem[]
) {
  const sanitizedTitle = programTitle.replace(/[^a-zA-Z0-9_-]/g, "_");
  const dateStr = new Date().toISOString().split("T")[0];
  const filename = `${sanitizedTitle}_Applicants_${dateStr}.xlsx`;

  const rows = applicants.map((app, index) => {
    let customNotes = app.notes || "";
    if (app.custom_answers && Object.keys(app.custom_answers).length > 0) {
      const qa = Object.entries(app.custom_answers)
        .map(([q, a]) => `${q}: ${a}`)
        .join(" | ");
      customNotes = customNotes ? `${customNotes} [QA: ${qa}]` : qa;
    }

    return {
      "No.": index + 1,
      "Applicant Name": app.student_name,
      "Phone / WhatsApp": app.phone,
      "Email Address": app.email || "N/A",
      "Course Program": app.program_title || programTitle,
      "Selected Cohort": app.cohort_dates || "Open / Next Available",
      "Experience Level": app.experience_level || "Not Specified",
      "Café / Organization": app.organization || "Independent",
      "Notes / Message": customNotes || "None",
      "Registration Date": new Date(app.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      "Status": (app.status || "pending").toUpperCase(),
    };
  });

  const ws = XLSX.utils.json_to_sheet(rows);
  ws["!cols"] = autoFitColumns(rows);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Applicants");
  downloadWorkbook(wb, filename);
}

/**
 * Exports all registered applicants across all courses and cohorts.
 */
export function exportAllApplicantsToExcel(applicants: ApplicantExportItem[]) {
  const dateStr = new Date().toISOString().split("T")[0];
  const filename = `Ethiopian_Signature_All_Applicants_${dateStr}.xlsx`;

  const rows = applicants.map((app, index) => {
    let customNotes = app.notes || "";
    if (app.custom_answers && Object.keys(app.custom_answers).length > 0) {
      const qa = Object.entries(app.custom_answers)
        .map(([q, a]) => `${q}: ${a}`)
        .join(" | ");
      customNotes = customNotes ? `${customNotes} [QA: ${qa}]` : qa;
    }

    return {
      "No.": index + 1,
      "Student Name": app.student_name,
      "Phone Number": app.phone,
      "Email": app.email || "N/A",
      "Training Program": app.program_title || app.course_level || "Specialty Course",
      "Cohort Dates": app.cohort_dates || "Upcoming Session",
      "Experience Level": app.experience_level || "General",
      "Organization": app.organization || "Independent",
      "Notes & Custom Answers": customNotes || "None",
      "Applied On": new Date(app.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      "Enrollment Status": (app.status || "pending").toUpperCase(),
    };
  });

  const ws = XLSX.utils.json_to_sheet(rows);
  ws["!cols"] = autoFitColumns(rows);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "All Registrations");
  downloadWorkbook(wb, filename);
}

/**
 * Exports website contact messages & inquiries to Excel.
 */
export function exportInquiriesToExcel(inquiries: InquiryExportItem[]) {
  const dateStr = new Date().toISOString().split("T")[0];
  const filename = `Ethiopian_Signature_Contact_Messages_${dateStr}.xlsx`;

  const rows = inquiries.map((inq, index) => ({
    "No.": index + 1,
    "Client Name": inq.full_name,
    "Phone Number": inq.phone,
    "Email": inq.email || "N/A",
    "Service Area": inq.service,
    "Client Message Note": inq.notes || "None",
    "Submission Date": new Date(inq.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    "Status": (inq.status || "new").toUpperCase(),
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  ws["!cols"] = autoFitColumns(rows);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Contact Messages");
  downloadWorkbook(wb, filename);
}
