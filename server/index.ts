import express from 'express';
import {db, initDb} from './db';
import {seedDb} from './seed';

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

initDb();
seedDb();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
app.use(express.json());

const AUTH_TOKEN = 'workdesk-demo-token';

app.post('/api/auth/login', (req, res) => {
  const {email, password} = req.body as {email?: string; password?: string};

  if (!email || !password) {
    return res.status(400).json({message: 'يرجى إدخال البريد الإلكتروني وكلمة المرور.'});
  }

  if (email !== 'admin@workdesk.local' || password !== 'Admin@123') {
    return res.status(401).json({message: 'بيانات الدخول غير صحيحة.'});
  }

  return res.json({
    token: AUTH_TOKEN,
    user: {
      id: 1,
      fullName: 'أحمد محمود',
      role: 'مدير النظام'
    }
  });
});

app.use('/api', (req, res, next) => {
  if (req.path.startsWith('/auth')) {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${AUTH_TOKEN}`) {
    return res.status(401).json({message: 'غير مصرح. يرجى تسجيل الدخول.'});
  }

  return next();
});

app.get('/api/dashboard', (_req, res) => {
  const summary = {
    openTasks: (db.prepare("SELECT COUNT(*) as count FROM tasks WHERE status != 'مكتمل'").get() as {count: number}).count,
    openTickets: (db.prepare("SELECT COUNT(*) as count FROM tickets WHERE status != 'مغلقة'").get() as {count: number}).count,
    activeDevices: (db.prepare("SELECT COUNT(*) as count FROM devices WHERE status = 'قيد الاستخدام'").get() as {count: number}).count,
    plannedMaintenance: (db.prepare("SELECT COUNT(*) as count FROM maintenance WHERE status = 'مجدولة'").get() as {count: number}).count
  };

  const byStatus = db.prepare(`SELECT status as label, COUNT(*) as value FROM tickets GROUP BY status`).all();
  const byPriority = db.prepare(`SELECT priority as label, COUNT(*) as value FROM tasks GROUP BY priority`).all();

  return res.json({summary, charts: {ticketsByStatus: byStatus, tasksByPriority: byPriority}});
});

const buildFilterClause = (query: any, allowed: string[]) => {
  const conditions: string[] = [];
  const params: Record<string, string> = {};

  allowed.forEach((field) => {
    if (query[field]) {
      conditions.push(`${field} = @${field}`);
      params[field] = String(query[field]);
    }
  });

  if (query.q) {
    conditions.push(`(title LIKE @q OR description LIKE @q)`);
    params.q = `%${String(query.q)}%`;
  }

  return {
    sql: conditions.length ? `WHERE ${conditions.join(' AND ')}` : '',
    params
  };
};

app.get('/api/tasks', (req, res) => {
  const filter = buildFilterClause(req.query, ['status', 'priority']);
  const rows = db
    .prepare(`SELECT tasks.*, users.full_name as assignee_name FROM tasks LEFT JOIN users ON users.id = tasks.assignee_id ${filter.sql} ORDER BY tasks.id DESC`)
    .all(filter.params);
  res.json(rows);
});

app.post('/api/tasks', (req, res) => {
  const {title, description, priority, dueDate} = req.body;
  if (!title || !priority) {
    return res.status(400).json({message: 'الحقول المطلوبة: العنوان والأولوية.'});
  }

  const result = db
    .prepare(`INSERT INTO tasks (title, description, status, priority, start_date, due_date, assignee_id) VALUES (@title, @description, 'جديد', @priority, DATE('now'), @dueDate, 1)`)
    .run({title, description: description ?? '', priority, dueDate: dueDate ?? null});

  return res.status(201).json({id: result.lastInsertRowid});
});

app.get('/api/tickets', (_req, res) => {
  const rows = db
    .prepare(`SELECT tickets.*, users.full_name as requester_name FROM tickets LEFT JOIN users ON users.id = tickets.requester_id ORDER BY tickets.id DESC`)
    .all();
  res.json(rows);
});

app.get('/api/devices', (_req, res) => {
  const rows = db
    .prepare(`SELECT devices.*, users.full_name as assigned_user_name FROM devices LEFT JOIN users ON users.id = devices.assigned_user_id ORDER BY devices.id DESC`)
    .all();
  res.json(rows);
});

app.get('/api/maintenance', (_req, res) => {
  const rows = db
    .prepare(`
      SELECT maintenance.*, devices.name as device_name, users.full_name as technician_name
      FROM maintenance
      LEFT JOIN devices ON devices.id = maintenance.device_id
      LEFT JOIN users ON users.id = maintenance.technician_id
      ORDER BY maintenance.id DESC
    `)
    .all();
  res.json(rows);
});

app.get('/api/users', (_req, res) => {
  const rows = db.prepare(`SELECT * FROM users ORDER BY id DESC`).all();
  res.json(rows);
});

app.get('/api/alerts', (_req, res) => {
  const rows = db.prepare(`SELECT * FROM alerts ORDER BY alert_date ASC`).all();
  res.json(rows);
});

app.get('/api/attachments', (_req, res) => {
  const rows = db
    .prepare(`SELECT attachments.*, users.full_name as uploaded_by_name FROM attachments LEFT JOIN users ON users.id = attachments.uploaded_by ORDER BY id DESC`)
    .all();
  res.json(rows);
});

app.get('/api/activity-logs', (_req, res) => {
  const rows = db
    .prepare(`SELECT activity_logs.*, users.full_name as actor_name FROM activity_logs LEFT JOIN users ON users.id = activity_logs.actor_id ORDER BY activity_logs.id DESC`)
    .all();
  res.json(rows);
});

app.listen(PORT, () => {
  console.log(`WorkDesk API running on http://localhost:${PORT}`);
});
