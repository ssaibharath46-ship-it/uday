const content=document.getElementById("content"), title=document.getElementById("pageTitle");
const pages={
dashboard:`<div class="main-content">
<div class="cards">
${stat("👨‍🎓","1,248","Total Students")}
${stat("📅","87.9%","Average Attendance")}
${stat("📈","8.42","Average CGPA")}
${stat("💳","₹2.84L","Pending Fees")}
</div>
<div class="section-row">
<div class="card"><h2>Semester Performance</h2><div class="chart"><div class="bar" style="height:52%"><span>7.8</span></div><div class="bar" style="height:66%"><span>8.1</span></div><div class="bar" style="height:74%"><span>8.4</span></div><div class="bar" style="height:83%"><span>8.62</span></div></div><div class="labels"><span>Sem I</span><span>Sem II</span><span>Sem III</span><span>Current</span></div></div>
<div class="card"><h2>Latest Notices</h2>${notice("Mid-Term Examination","Examinations begin from 10 October 2026.")}${notice("Fee Payment","Pay pending semester fees before the due date.")}${notice("Academic Registration","Course registration window is open.")}</div>
</div>
${studentTable()}
</div>`,
students:`${tablePage("Students","Add Student",["ID","Student Name","Department","Year","Attendance","Status"],[["2500031331","Uday Kiran","CSE","3rd Year","91%","Good"],["2500031332","Rahul Kumar","CSE","3rd Year","84%","Good"],["2500031333","Priya Sharma","ECE","2nd Year","87%","Good"],["2500031334","Sai Bharat","CSIT","3rd Year","74%","Improve"]])}`,
attendance:`${tablePage("Attendance Management","Update Attendance",["Subject","Faculty","Conducted","Present","Percentage","Status"],[["Java Programming","Dr. Rao","44","40","91%","Good"],["Data Structures","Dr. Kumar","43","36","84%","Good"],["Database Systems","Dr. Priya","46","40","87%","Good"],["Engineering Mathematics","Dr. Reddy","46","34","74%","Improve"]])}`,
results:`${tablePage("Results & Marks","Add Result",["Student","Subject","Internal","External","Total","Grade"],[["Uday Kiran","Java Programming","28","64","92","A+"],["Rahul Kumar","Data Structures","25","58","83","A"],["Priya Sharma","Database Systems","27","61","88","A+"]])}`,
assignments:`${tablePage("Assignments","Create Assignment",["Title","Subject","Due Date","Submitted","Pending","Status"],[["Unit-3 Questions","Java","28 Sep 2026","102","18","Active"],["Lab Record","DS","30 Sep 2026","96","24","Active"],["DBMS Mini Project","DBMS","05 Oct 2026","72","48","Active"]])}`,
fees:`${tablePage("Fee Management","Add Fee Record",["Student","Semester","Total","Paid","Pending","Status"],[["Uday Kiran","III","₹48,000","₹48,000","₹0","Paid"],["Rahul Kumar","III","₹48,000","₹35,000","₹13,000","Pending"],["Priya Sharma","II","₹45,000","₹45,000","₹0","Paid"]])}`,
notices:`<div class="main-content"><div class="page-card"><div class="toolbar"><h2>Notice Management</h2><button class="add-btn" onclick="toast('New notice form opened')">+ Publish Notice</button></div>${notice("Mid-Term Examination","Mid-term examinations begin from 10 October 2026.")}${notice("Fee Payment","Semester fee payment deadline is 30 September 2026.")}${notice("Academic Registration","Course registration is currently open.")}</div></div>`,
reports:`${tablePage("Academic Reports","Generate Report",["Student","Attendance","CGPA","Assignments","Risk Level","Action"],[["Uday Kiran","91%","8.62","92%","Low","View"],["Rahul Kumar","84%","8.10","86%","Low","View"],["Priya Sharma","87%","8.40","91%","Low","View"],["Sai Bharat","74%","7.20","68%","Medium","Review"]])}`,
settings:`<div class="main-content"><div class="settings"><div class="setting"><h2>Institution Settings</h2><p>Manage academic year, departments and semesters.</p><button class="add-btn" onclick="toast('Settings saved')">Save Changes</button></div><div class="setting"><h2>Security</h2><p>Role-based access, session timeout and login security.</p><button class="add-btn" onclick="toast('Security settings saved')">Update Security</button></div></div></div>`
};
function stat(i,n,l){return `<div class="card stat"><div><p>${l}</p><h3>${n}</h3></div><div class="stat-icon">${i}</div></div>`}
function notice(t,d){return `<div class="notice"><b>${t}</b><small>${d}</small></div>`}
function studentTable(){return `<div class="card table-card"><h2>Recent Students</h2><div class="table-wrap"><table><thead><tr><th>ID</th><th>Name</th><th>Department</th><th>Attendance</th><th>CGPA</th><th>Status</th></tr></thead><tbody><tr><td>2500031331</td><td>Uday Kiran</td><td>CSE</td><td>91%</td><td>8.62</td><td><span class="pill good">Good</span></td></tr><tr><td>2500031332</td><td>Rahul Kumar</td><td>CSE</td><td>84%</td><td>8.10</td><td><span class="pill good">Good</span></td></tr><tr><td>2500031333</td><td>Priya Sharma</td><td>ECE</td><td>87%</td><td>8.40</td><td><span class="pill good">Good</span></td></tr><tr><td>2500031334</td><td>Sai Bharat</td><td>CSIT</td><td>74%</td><td>7.20</td><td><span class="pill warn">Improve</span></td></tr></tbody></table></div></div>`}
function tablePage(name,button,heads,rows){return `<div class="main-content"><div class="page-card"><div class="toolbar"><h2>${name}</h2><button class="add-btn" onclick="toast('${button} form opened')">+ ${button}</button></div><div class="table-wrap"><table><thead><tr>${heads.map(x=>`<th>${x}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((x,i)=>`<td>${i===r.length-1?`<span class="pill ${x==="Good"||x==="Paid"||x==="Active"||x.startsWith("A")?"good":x==="Improve"||x==="Pending"||x==="Medium"?"warn":"good"}">${x}</span>`:x}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div></div>`}
function load(p){content.innerHTML=pages[p];title.textContent=p==="dashboard"?"Admin Dashboard":p[0].toUpperCase()+p.slice(1);document.querySelectorAll(".nav").forEach(x=>x.classList.toggle("active",x.dataset.page===p))}
document.querySelectorAll(".nav[data-page]").forEach(x=>x.onclick=()=>load(x.dataset.page));
function toast(t){const x=document.getElementById("toast");x.textContent=t;x.style.display="block";setTimeout(()=>x.style.display="none",1800)}
function logout(){location.href="index.html"}
load("dashboard");
