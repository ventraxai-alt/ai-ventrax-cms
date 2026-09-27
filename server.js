const express=require("express"),crypto=require("crypto"),fs=require("fs"),path=require("path");
const app=express();app.use(express.json({limit:"2mb"}));app.use(express.static(path.join(__dirname,"public")));
const DB=path.join(__dirname,"data.json");
let db=fs.existsSync(DB)?JSON.parse(fs.readFileSync(DB,"utf8")):{posts:[]};
const save=()=>fs.writeFileSync(DB,JSON.stringify(db,null,2));
const ADMIN_PASSWORD=process.env.ADMIN_PASSWORD||"CHANGE_THIS_PASSWORD";
const sessions=new Map();
function auth(req,res,next){let h=req.headers.authorization||"",t=h.replace("Bearer ","");if(!t||!sessions.has(t))return res.status(401).json({error:"Unauthorized"});next()}
app.post("/api/login",(req,res)=>{if(req.body.password!==ADMIN_PASSWORD)return res.status(401).json({error:"Invalid password"});let t=crypto.randomBytes(32).toString("hex");sessions.set(t,Date.now());res.json({token:t})});
app.get("/api/posts",(req,res)=>res.json(db.posts.filter(p=>p.status==="published").sort((a,b)=>String(b.date).localeCompare(String(a.date)))));
app.get("/api/admin/posts",auth,(req,res)=>res.json(db.posts));
app.post("/api/admin/posts",auth,(req,res)=>{let b=req.body;if(!b.title)return res.status(400).json({error:"Title required"});let p={...b,id:crypto.randomUUID(),date:new Date().toISOString().slice(0,10)};db.posts.push(p);save();res.json(p)});
app.put("/api/admin/posts/:id",auth,(req,res)=>{let i=db.posts.findIndex(p=>p.id===req.params.id);if(i<0)return res.status(404).json({error:"Not found"});db.posts[i]={...db.posts[i],...req.body,id:req.params.id};save();res.json(db.posts[i])});
app.delete("/api/admin/posts/:id",auth,(req,res)=>{db.posts=db.posts.filter(p=>p.id!==req.params.id);save();res.json({ok:true})});
app.get("/health",(req,res)=>res.status(200).json({ok:true}));
app.get("/admin",(req,res)=>res.sendFile(path.join(__dirname,"public/admin.html")));
app.listen(process.env.PORT||3000,()=>console.log("AI Ventrax CMS running"));
