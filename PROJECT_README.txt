STUDENT REPORT SYSTEM - V2
==========================

This version is based on the supplied KLU ERP-style project and includes:

STUDENT
- Student dashboard
- CGPA/SGPA
- Semester performance chart
- Subject-wise marks and grades
- Attendance tracking
- Assignments
- Fees
- Timetable
- Notices
- Printable reports
- Academic analytics
- Teacher remarks / feedback
- Dark mode

ADMIN
- Admin dashboard
- Student management
- Marks & results
- Attendance management
- Fee management
- Notice management
- Reports

PARENT
- Read-only Parent Dashboard
- Student academic summary
- Attendance
- CGPA
- Teacher remarks
- Student report view
- Print report

PROBLEM STATEMENT
A student report system enables educational institutions to manage and track student performance.
Teachers can input grades, attendance, and remarks, which are compiled into comprehensive progress
reports. Students and parents can access these reports online to monitor academic progress. The system
supports customization for different grading formats and includes analytics for performance trends.

SUGGESTED MODELS / MODULES
1. Student model: ID, profile, program, semester, subjects.
2. Attendance model: classes conducted, attended, percentage.
3. Result model: internal, external, total, grade.
4. Assignment model: due date, submission, evaluation.
5. Fee model: total, paid, pending.
6. Notice model: title, content, date.
7. Remark model: faculty feedback by subject.
8. Analytics model: CGPA trend, attendance risk, weak subjects.
9. Parent access: linked read-only student reports.

IMPORTANT
This is an HTML/CSS/JavaScript prototype using localStorage. It is suitable for a working
frontend demonstration. For real institutional deployment, move authentication and data storage
to a server/database and never keep real passwords in client-side JavaScript.
