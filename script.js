const DB_KEY="klu_erp_db_v1";
const SESSION_KEY="klu_erp_session";
let db=JSON.parse(localStorage.getItem(DB_KEY)||"null")||{
 students:[{
  id:"2500031331",name:"Uday Kiran",program:"B.Tech · CSE",dept:"CSE",year:"2nd Year",batch:"2024–2028",
  email:"uday.kiran@klu.ac.in",phone:"+91 98765 43210",dob:"18 May 2006",gender:"Male",address:"Vijayawada, Andhra Pradesh",
  cgpa:8.62,sgpa:8.74,attendance:86,classesHeld:112,classesAttended:96,
  subjects:[
   {code:"CSE401",name:"Java Programming",credits:4,faculty:"Dr. Rao",att:91,internal:36,external:52,total:88,grade:"A"},
   {code:"CSE402",name:"Data Structures",credits:4,faculty:"Dr. Kumar",att:84,internal:34,external:49,total:83,grade:"A"},
   {code:"CSE403",name:"Database Systems",credits:4,faculty:"Dr. Priya",att:87,internal:35,external:51,total:86,grade:"A"},
   {code:"MAT401",name:"Engineering Mathematics",credits:4,faculty:"Dr. Reddy",att:74,internal:29,external:42,total:71,grade:"B"}
  ],
  fees:{total:85000,paid:72500,history:[["18 Aug 2026","REC-2026-0818","Semester Fee","₹50,000","Paid"],["04 Sep 2026","REC-2026-0904","Transport Fee","₹12,500","Paid"],["12 Sep 2026","REC-2026-0912","Tuition Fee","₹10,000","Paid"]]}
 },{
  id:"2500031332",name:"Rahul Kumar",program:"B.Tech · CSE",dept:"CSE",year:"2nd Year",batch:"2024–2028",
  email:"rahul.kumar@klu.ac.in",phone:"+91 98765 43211",dob:"10 Feb 2006",gender:"Male",address:"Guntur, Andhra Pradesh",
  cgpa:8.11,sgpa:8.25,attendance:82,classesHeld:112,classesAttended:92,
  subjects:[
   {code:"CSE401",name:"Java Programming",credits:4,faculty:"Dr. Rao",att:84,internal:33,external:47,total:80,grade:"A"},
   {code:"CSE402",name:"Data Structures",credits:4,faculty:"Dr. Kumar",att:81,internal:31,external:45,total:76,grade:"B"},
   {code:"CSE403",name:"Database Systems",credits:4,faculty:"Dr. Priya",att:83,internal:32,external:48,total:80,grade:"A"},
   {code:"MAT401",name:"Engineering Mathematics",credits:4,faculty:"Dr. Reddy",att:79,internal:30,external:43,total:73,grade:"B"}
  ],
  fees:{total:85000,paid:85000,history:[["05 Aug 2026","REC-2026-0805","Semester Fee","₹85,000","Paid"]]}
 }],
 notices:[
  {title:"Mid-Term Examination",text:"Mid-term examinations begin from 10 October 2026.",date:"24 Sep 2026",type:"Exam"},
  {title:"Fee Payment",text:"Pay pending semester fees before the due date.",date:"22 Sep 2026",type:"Finance"},
  {title:"Academic Registration",text:"Course registration window is open.",date:"20 Sep 2026",type:"Academic"},
  {title:"Campus Placement Drive",text:"Registration is open for eligible final-year students.",date:"18 Sep 2026",type:"Placement"}
 ],
 assignments:[
  {subject:"Java Programming",title:"JDBC Mini Project",due:"28 Sep 2026",status:"Pending"},
  {subject:"Data Structures",title:"Graph Algorithms",due:"30 Sep 2026",status:"Submitted"},
  {subject:"Database Systems",title:"SQL Optimization Report",due:"03 Oct 2026",status:"Pending"},
  {subject:"Engineering Mathematics",title:"Fourier Series Assignment",due:"05 Oct 2026",status:"Submitted"},
  {subject:"Java Programming",title:"Collections Practice",due:"08 Oct 2026",status:"Pending"},
  {subject:"Database Systems",title:"ER Diagram",due:"12 Oct 2026",status:"Submitted"}
 ],
 timetable:[
  ["09:00–10:00","Java Programming","Data Structures","Database Systems","Java Programming","Mathematics"],
  ["10:00–11:00","Database Systems","Java Programming","Mathematics","Data Structures","Database Systems"],
  ["11:15–12:15","Data Structures","Mathematics","Java Programming","Database Systems","Java Lab"],
  ["12:15–01:15","Lunch","Lunch","Lunch","Lunch","Lunch"],
  ["02:00–03:00","Mathematics","Database Lab","Data Structures","Mathematics","Library"],
  ["03:00–04:00","Java Lab","Project","Seminar","Database Lab","Sports"]
 ],
 activity:["Marks updated for CSE402 · 5 min ago","Attendance imported · 18 min ago","New notice published · 42 min ago","Fee receipt generated · 1 hr ago"]
};
function save(){localStorage.setItem(DB_KEY,JSON.stringify(db))}
let session=JSON.parse(localStorage.getItem(SESSION_KEY)||"null");
let role=session?.role||null;

const $=id=>document.getElementById(id);
function toast(msg){$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2600)}
function currentStudent(){return db.students.find(s=>s.id===session?.id)||db.students[0]}
function initials(n){return n.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase()}
function money(n){return "₹"+Number(n).toLocaleString("en-IN")}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

document.querySelectorAll(".login-tab").forEach(t=>t.onclick=()=>{
 document.querySelectorAll(".login-tab").forEach(x=>x.classList.remove("active"));t.classList.add("active");
 const admin=t.dataset.role==="admin"; $("loginTitle").textContent=admin?"Administrator Login":"Welcome back 👋";
 $("loginSubtitle").textContent=admin?"Manage the complete ERP control center":"Sign in to access your student dashboard";
 $("loginUserLabel").textContent=admin?"Admin Username":"Student ID";
 $("loginUser").value=admin?"admin":"2500031331";$("loginPass").value=admin?"admin123":"student123";
 $("loginHint").innerHTML=admin?"Admin demo: <b>admin</b> / <b>admin123</b>":"Student demo: <b>2500031331</b> / <b>student123</b>";
});
$("loginForm").onsubmit=e=>{e.preventDefault();const admin=document.querySelector(".login-tab.active").dataset.role==="admin";const u=$("loginUser").value.trim(),p=$("loginPass").value;
 if((admin&&u==="admin"&&p==="admin123")||(!admin&&db.students.some(s=>s.id===u)&&p==="student123")){
  role=admin?"admin":"student";session={role,id:admin?null:u};localStorage.setItem(SESSION_KEY,JSON.stringify(session));loadApp();toast("Signed in successfully");
 }else toast("Invalid credentials. Use the demo credentials shown below.")};
function demoCredentials(e){e.preventDefault();toast("Student: 2500031331 / student123 · Admin: admin / admin123")}
function loadApp(){
 $("loginScreen").classList.add("hidden");$("app").classList.remove("hidden");
 if(role==="admin"){$("studentNav").classList.add("hidden");$("adminNav").classList.remove("hidden");$("sideName").textContent="Administrator";$("sideId").textContent="ERP Admin";$("sideAvatar").textContent="AD";$("topName").textContent="Administrator";$("topAvatar").textContent="AD";openPage("adminDashboard")}
 else{$("studentNav").classList.remove("hidden");$("adminNav").classList.add("hidden");updateUser();openPage("dashboard")}
 renderCommon();
}
function updateUser(){let s=currentStudent();$("sideName").textContent=s.name;$("sideId").textContent=s.id;$("topName").textContent=s.name;$("topAvatar").textContent=initials(s.name);$("sideAvatar").textContent=initials(s.name);$("welcomeName").textContent=s.name.split(" ")[0];$("profileAvatar").textContent=initials(s.name);$("profileName").textContent=s.name;$("profileProgram").textContent=s.program;$("profileId").textContent=s.id}
function renderCommon(){renderNotices();renderSubjects();renderAttendance();renderResults();renderFees();renderAssignments();renderTimetable();renderProfile();renderAdmin();drawChart();renderDashboard();save()}
function openPage(name){
 document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));$("page-"+name)?.classList.add("active");
 document.querySelectorAll(".nav-item").forEach(n=>n.classList.toggle("active",n.dataset.page===name));
 const titles={dashboard:["Student Dashboard","Overview of your academic journey"],profile:["My Profile","Personal and academic information"],academics:["Academics","Current semester subjects and performance"],attendance:["Attendance","Subject-wise attendance status"],results:["Results","Semester results and grades"],fees:["Fee Details","Track semester fee payments"],timetable:["Time Table","Weekly class schedule"],assignments:["Assignments","Track submissions and deadlines"],notices:["Notices","Official announcements"],reports:["Reports","Generate academic documents"],adminDashboard:["Admin Dashboard","ERP control center"],manageStudents:["Student Management","Manage student records"],manageAcademics:["Marks & Results","Update academic performance"],manageAttendance:["Attendance Management","Update attendance records"],manageFees:["Fee Management","Monitor fee payments"],manageNotices:["Notice Management","Publish campus announcements"]};
 if(titles[name]){$("pageTitle").textContent=titles[name][0];$("pageSubtitle").textContent=titles[name][1]}
 $("sidebar").classList.remove("open");window.scrollTo({top:0,behavior:"smooth"});if(name==="dashboard")setTimeout(drawChart,20)
}
document.querySelectorAll(".nav-item[data-page]").forEach(n=>n.onclick=()=>openPage(n.dataset.page));
function toggleSidebar(){$("sidebar").classList.toggle("open")}
function goProfile(){openPage(role==="admin"?"adminDashboard":"profile")}
function logout(){localStorage.removeItem(SESSION_KEY);location.reload()}
function toggleTheme(){document.body.classList.toggle("dark");localStorage.setItem("dark",document.body.classList.contains("dark"))}
if(localStorage.getItem("dark")==="true")document.body.classList.add("dark");

function renderDashboard(){
 if(role!=="student")return;let s=currentStudent();$("statCgpa").textContent=s.cgpa.toFixed(2);$("statAttendance").textContent=s.attendance+"%";$("statAssignments").textContent=db.assignments.filter(a=>a.status==="Submitted").length+"/"+db.assignments.length;$("statFee").textContent=money(s.fees.total-s.fees.paid);
 $("dashboardNotices").innerHTML=db.notices.slice(0,3).map(n=>`<div class="notice"><h3>${esc(n.title)}</h3><p>${esc(n.text)}</p><time>${n.date}</time></div>`).join("");
 $("dashboardSubjects").innerHTML=s.subjects.map(x=>`<tr><td>${x.code}</td><td><b>${x.name}</b></td><td>${x.credits}</td><td>${x.faculty}</td><td>${x.att}%</td><td><span class="status-pill ${x.att<75?"warning":"success"}">${x.att<75?"Improve":"Good"}</span></td></tr>`).join("")
}
function renderProfile(){if(role!=="student")return;let s=currentStudent();$("profileInfo").innerHTML=[["Full Name",s.name],["Student ID",s.id],["Program",s.program],["Department",s.dept],["Year",s.year],["Batch",s.batch],["Email",s.email],["Phone",s.phone],["Date of Birth",s.dob],["Gender",s.gender],["Address",s.address],["Account Status","Active"]].map(x=>`<div><small>${x[0]}</small><b>${esc(x[1])}</b></div>`).join("")}
function renderSubjects(){if(role!=="student")return;let s=currentStudent();$("subjectCards").innerHTML=s.subjects.map(x=>`<div class="subject-card"><small>${x.code} · ${x.credits} Credits</small><h3>${x.name}</h3><div class="subject-score">${x.total}%</div><small>${x.faculty} · ${x.grade}</small></div>`).join("");$("subjectFilter").innerHTML='<option>All Subjects</option>'+s.subjects.map(x=>`<option>${x.name}</option>`).join("");$("academicTable").innerHTML=s.subjects.map(x=>`<tr><td>${x.code}</td><td>${x.name}</td><td>${x.faculty}</td><td>${x.credits}</td><td>${x.internal}/40</td><td>${x.external}/60</td><td><b>${x.total}</b>/100</td><td><span class="status-pill success">${x.grade}</span></td></tr>`).join("")}
function renderAttendance(){if(role!=="student")return;let s=currentStudent();$("attendanceBig").textContent=s.attendance+"%";$("classesHeld").textContent=s.classesHeld;$("classesAttended").textContent=s.classesAttended;$("classesAbsent").textContent=s.classesHeld-s.classesAttended;$("attendanceRows").innerHTML=s.subjects.map(x=>`<div class="attendance-row"><div class="att-top"><span><b>${x.name}</b> <small>${x.code}</small></span><b class="${x.att<75?"danger":"green-text"}">${x.att}%</b></div><div class="progress"><i style="width:${x.att}%"></i></div><small>${x.att<75?"⚠ Below required 75%":"✓ Good attendance"}</small></div>`).join("")}
function renderResults(){if(role!=="student")return;let s=currentStudent();$("resultsTable").innerHTML=s.subjects.map(x=>`<tr><td>${x.code}</td><td>${x.name}</td><td>${x.internal}/40</td><td>${x.external}/60</td><td><b>${x.total}</b></td><td><span class="status-pill success">${x.grade}</span></td><td>${x.grade==="A"?9:x.grade==="B"?8:7}</td></tr>`).join("")}
function renderFees(){if(role!=="student")return;let s=currentStudent();$("feeDue").textContent=money(s.fees.total-s.fees.paid);$("feeTable").innerHTML=s.fees.history.map(x=>`<tr>${x.map((v,i)=>`<td>${i===4?`<span class="status-pill success">${v}</span>`:v}</td>`).join("")}</tr>`).join("")}
function renderTimetable(){$("timetableBody").innerHTML=db.timetable.map(r=>`<tr>${r.map((v,i)=>`<td>${i===0?`<b>${v}</b>`:v==="Lunch"?`<span class="status-pill warning">Lunch</span>`:`<b>${v}</b>`}</td>`).join("")}</tr>`).join("")}
function renderAssignments(){$("assignmentGrid").innerHTML=db.assignments.map(a=>`<div class="assignment-card"><small>${a.subject}</small><h3>${a.title}</h3><small class="due">Due: <b>${a.due}</b></small><br><span class="status-pill ${a.status==="Submitted"?"success":"warning"}">${a.status==="Submitted"?"✓ Submitted":"⏳ Pending"}</span></div>`).join("")}
function renderNotices(){$("noticeList").innerHTML=db.notices.map(n=>`<div class="notice"><h3>📢 ${esc(n.title)}</h3><p>${esc(n.text)}</p><time>${n.date} · ${n.type}</time></div>`).join("");if($("adminNoticeList"))$("adminNoticeList").innerHTML=$("noticeList").innerHTML}
function drawChart(){let c=$("performanceChart");if(!c)return;let d=[7.8,8.1,8.4,8.62],ctx=c.getContext("2d"),w=c.clientWidth,h=c.clientHeight,ratio=devicePixelRatio||1;c.width=w*ratio;c.height=h*ratio;ctx.scale(ratio,ratio);ctx.clearRect(0,0,w,h);let pad=30,max=10,base=h-35;ctx.strokeStyle="#e4ebf3";ctx.lineWidth=1;for(let i=0;i<5;i++){let y=25+i*(base-25)/4;ctx.beginPath();ctx.moveTo(pad,y);ctx.lineTo(w-10,y);ctx.stroke()}ctx.beginPath();d.forEach((v,i)=>{let x=pad+i*(w-pad-30)/(d.length-1),y=base-(v/max)*(base-35);i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.strokeStyle="#1268d8";ctx.lineWidth=3;ctx.stroke();d.forEach((v,i)=>{let x=pad+i*(w-pad-30)/(d.length-1),y=base-(v/max)*(base-35);ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fillStyle="#1268d8";ctx.fill();ctx.fillStyle="#61758c";ctx.font="11px Arial";ctx.textAlign="center";ctx.fillText(v,x,y-12);ctx.fillText(["Sem I","Sem II","Sem III","Current"][i],x,base+18)})}
function renderAdmin(){if(role!=="admin")return;$("adminStudents").textContent=db.students.length;$("adminAttendance").textContent=Math.round(db.students.reduce((a,s)=>a+s.attendance,0)/db.students.length)+"%";$("adminStudentTable").innerHTML=db.students.map(s=>`<tr><td>${s.id}</td><td><b>${s.name}</b></td><td>${s.dept}</td><td>${s.year}</td><td>${s.attendance}%</td><td>${s.cgpa.toFixed(2)}</td><td><span class="status-pill success">Active</span></td><td><button class="secondary-btn" onclick="adminEdit('${s.id}')">Edit</button></td></tr>`).join("");["adminMarkStudent","adminAttStudent"].forEach(id=>{$(id).innerHTML=db.students.map(s=>`<option value="${s.id}">${s.id} — ${s.name}</option>`).join("")});$("adminAlerts").innerHTML=db.students.filter(s=>s.attendance<75).map(s=>`<div class="notice"><b>⚠ ${s.name}</b><p>Attendance is ${s.attendance}% — below required 75%.</p></div>`).join("")||'<div class="notice"><b>✓ No critical attendance alerts</b><p>All students are above the minimum threshold.</p></div>';$("activityFeed").innerHTML=db.activity.map(x=>`<div class="activity"><i></i><span>${x}</span></div>`).join("");$("deptChart").innerHTML=[["CSE",86],["AIML",82],["IT",79],["ECE",76],["EEE",74]].map(x=>`<div class="bar" style="height:${x[1]*2.2}px"><b>${x[1]}%</b><span>${x[0]}</span></div>`).join("")}
function renderAdminStudents(){let q=($("adminSearch")?.value||"").toLowerCase();$("adminStudentTable").innerHTML=db.students.filter(s=>(s.name+" "+s.id+" "+s.dept).toLowerCase().includes(q)).map(s=>`<tr><td>${s.id}</td><td><b>${s.name}</b></td><td>${s.dept}</td><td>${s.year}</td><td>${s.attendance}%</td><td>${s.cgpa.toFixed(2)}</td><td><span class="status-pill success">Active</span></td><td><button class="secondary-btn" onclick="adminEdit('${s.id}')">Edit</button></td></tr>`).join("")}
function adminAddStudent(){let name=prompt("Student full name:");if(!name)return;let id=prompt("Student ID:");if(!id)return;let dept=prompt("Department (CSE/IT/AIML/ECE):","CSE")||"CSE";db.students.push({id,name,program:"B.Tech · "+dept,dept,year:"1st Year",batch:"2026–2030",email:id+"@klu.ac.in",phone:"",dob:"",gender:"",address:"",cgpa:0,sgpa:0,attendance:0,classesHeld:0,classesAttended:0,subjects:[],fees:{total:85000,paid:0,history:[]}});db.activity.unshift(`New student ${name} (${id}) created · just now`);save();renderCommon();toast("Student record created")}
function adminEdit(id){let s=db.students.find(x=>x.id===id);if(!s)return;let name=prompt("Update student name:",s.name);if(name){s.name=name;db.activity.unshift(`Student profile updated · just now`);save();renderCommon();toast("Student updated")}}
function adminSaveMarks(){let s=db.students.find(x=>x.id===$("adminMarkStudent").value),name=$("adminMarkSubject").value,internal=Number($("adminInternal").value),external=Number($("adminExternal").value);if(!s||internal<0||external<0){toast("Enter valid marks");return}let total=internal+external;let x=s.subjects.find(x=>x.name===name);if(!x){x={code:"NEW",name,credits:4,faculty:"Faculty",att:0,internal:0,external:0,total:0,grade:"F"};s.subjects.push(x)}Object.assign(x,{internal,external,total,grade:total>=90?"A+":total>=80?"A":total>=70?"B":total>=60?"C":"F"});s.cgpa=Math.max(0,Math.min(10,s.subjects.reduce((a,x)=>a+(x.total/10),0)/Math.max(1,s.subjects.length)));db.activity.unshift(`Marks updated for ${s.name} · just now`);save();renderCommon();$("adminMarkMsg").innerHTML='<p class="green-text">✓ Result saved successfully.</p>';toast("Marks saved")}
function adminSaveAttendance(){let s=db.students.find(x=>x.id===$("adminAttStudent").value),name=$("adminAttSubject").value,held=Number($("adminHeld").value),att=Number($("adminAttended").value);if(!s||held<=0||att<0||att>held){toast("Enter valid attendance");return}let pct=Math.round(att/held*100);let x=s.subjects.find(x=>x.name===name);if(!x){x={code:"NEW",name,credits:4,faculty:"Faculty",att:pct,internal:0,external:0,total:0,grade:"F"};s.subjects.push(x)}x.att=pct;s.attendance=Math.round(s.subjects.reduce((a,x)=>a+x.att,0)/s.subjects.length);s.classesHeld=held;s.classesAttended=att;db.activity.unshift(`Attendance updated for ${s.name} · just now`);save();renderCommon();$("adminAttMsg").innerHTML='<p class="green-text">✓ Attendance updated.</p>';toast("Attendance updated")}
function publishNotice(){let title=prompt("Notice title:");if(!title)return;let text=prompt("Notice message:");if(!text)return;db.notices.unshift({title,text,date:new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}),type:"Admin"});db.activity.unshift(`New notice published · just now`);save();renderCommon();toast("Notice published")}
function payFee(){toast("Demo payment gateway opened — no real money is charged.");setTimeout(()=>{if(confirm("Simulate payment of ₹12,500?")){let s=currentStudent();s.fees.paid=s.fees.total;s.fees.history.push([new Date().toLocaleDateString("en-IN"),"REC-DEMO","Balance Fee","₹12,500","Paid"]);save();renderCommon();toast("Payment recorded successfully")}},300)}
function submitAssignment(){let pending=db.assignments.find(a=>a.status==="Pending");if(!pending){toast("No pending assignment");return}if(confirm(`Submit "${pending.title}"?`)){pending.status="Submitted";save();renderAssignments();renderDashboard();toast("Assignment submitted successfully")}}
function editProfile(){toast("Profile edit mode is available in the admin panel demo.")}
function printReport(){let s=currentStudent();let win=window.open("","_blank");if(!win){toast("Allow popups to print the report");return}win.document.write(`<html><head><title>Academic Report</title><style>body{font-family:Arial;padding:40px;color:#17324d}h1{text-align:center}table{width:100%;border-collapse:collapse;margin-top:25px}th,td{border:1px solid #ccc;padding:10px}th{background:#eef4fa}.summary{margin-top:25px;padding:18px;background:#f4f7fb}</style></head><body><h1>KLU ERP — Academic Report</h1><p><b>Name:</b> ${esc(s.name)} &nbsp; <b>ID:</b> ${s.id}</p><p><b>Program:</b> ${s.program} &nbsp; <b>CGPA:</b> ${s.cgpa.toFixed(2)}</p><table><tr><th>Subject</th><th>Internal</th><th>External</th><th>Total</th><th>Grade</th></tr>${s.subjects.map(x=>`<tr><td>${x.name}</td><td>${x.internal}</td><td>${x.external}</td><td>${x.total}</td><td>${x.grade}</td></tr>`).join("")}</table><div class="summary"><b>Attendance:</b> ${s.attendance}%<br><b>Semester SGPA:</b> ${s.sgpa}</div><script>window.onload=()=>window.print()<\/script></body></html>`);win.document.close()}
function showNotifications(){toast("🔔 3 new notifications: Mid-term exam, fee reminder, registration")}
function exportStudents(){let rows=[["ID","Name","Department","Year","Attendance","CGPA"],...db.students.map(s=>[s.id,s.name,s.dept,s.year,s.attendance,s.cgpa])];let csv=rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");let a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="students.csv";a.click();URL.revokeObjectURL(a.href);toast("CSV exported")}
document.addEventListener("DOMContentLoaded",()=>{if(session)loadApp();else $("loginScreen").classList.remove("hidden");if($("subjectFilter"))$("subjectFilter").onchange=()=>{};window.addEventListener("resize",drawChart)});
