import {useEffect, useMemo, useState} from 'react';
import {Bell, ClipboardList, HardDrive, LifeBuoy, ShieldCheck, Wrench, FileText, Search, Activity} from 'lucide-react';
import {apiFetch, login} from './lib/api';
import type {DashboardData, Device, Maintenance, Task, Ticket} from './types/models';

type Page = 'dashboard' | 'tasks' | 'tickets' | 'devices' | 'maintenance' | 'reports';

const modules = [
  {key: 'dashboard', label: 'لوحة التحكم', icon: Activity},
  {key: 'tasks', label: 'المهام اليومية', icon: ClipboardList},
  {key: 'tickets', label: 'التذاكر', icon: LifeBuoy},
  {key: 'devices', label: 'الأجهزة', icon: HardDrive},
  {key: 'maintenance', label: 'الصيانة', icon: Wrench},
  {key: 'reports', label: 'التقارير', icon: FileText}
] as const;

const requirements = [
  'إدارة المهام والتذاكر والأجهزة والصيانة في منصة واحدة.',
  'نظام صلاحيات وتسجيل دخول آمن مع سجل نشاطات.',
  'لوحة معلومات رئيسية مع مؤشرات أداء ورسوم بيانية.',
  'بحث وفلترة متقدمة وتنبيهات للمواعيد والمهام المتأخرة.',
  'أرشفة مرفقات وملفات وربطها بالتذاكر أو الصيانة.'
];

const dbTables = [
  'users',
  'tasks',
  'tickets',
  'devices',
  'maintenance',
  'alerts',
  'attachments',
  'activity_logs'
];

function StatCard({label, value, icon: Icon}: {label: string; value: number; icon: any}) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function App() {
  const [token, setToken] = useState('');
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [maintenance, setMaintenance] = useState<Maintenance[]>([]);

  const [query, setQuery] = useState('');

  const filteredTasks = useMemo(() => tasks.filter((task) => `${task.title} ${task.description}`.includes(query)), [tasks, query]);

  async function loadData(authToken: string) {
    setLoading(true);
    try {
      const [dashboardData, tasksData, ticketsData, devicesData, maintenanceData] = await Promise.all([
        apiFetch<DashboardData>('/dashboard', authToken),
        apiFetch<Task[]>('/tasks', authToken),
        apiFetch<Ticket[]>('/tickets', authToken),
        apiFetch<Device[]>('/devices', authToken),
        apiFetch<Maintenance[]>('/maintenance', authToken)
      ]);

      setDashboard(dashboardData);
      setTasks(tasksData);
      setTickets(ticketsData);
      setDevices(devicesData);
      setMaintenance(maintenanceData);
      setError('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) return;
    loadData(token);
  }, [token]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    try {
      const result = await login(String(form.get('email')), String(form.get('password')));
      setToken(result.token);
      setError('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
          <h1 className="text-2xl font-black mb-2">نظام WorkDesk Pro</h1>
          <p className="text-slate-500 mb-6">إدارة العمل اليومي لقسم تقنية المعلومات</p>
          <div className="space-y-4">
            <input name="email" defaultValue="admin@workdesk.local" className="w-full rounded-xl border border-slate-200 px-4 py-3" />
            <input name="password" type="password" defaultValue="Admin@123" className="w-full rounded-xl border border-slate-200 px-4 py-3" />
            <button className="w-full rounded-xl bg-blue-600 text-white py-3 font-bold">تسجيل الدخول</button>
          </div>
          <p className="text-xs text-slate-400 mt-3">بيانات تجريبية: admin@workdesk.local / Admin@123</p>
          {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="grid lg:grid-cols-[270px_1fr] min-h-screen">
        <aside className="bg-slate-900 text-white p-5 space-y-3">
          <h1 className="text-xl font-black">WorkDesk Pro</h1>
          <p className="text-xs text-slate-400">نظام إدارة IT Administration</p>
          {modules.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.key;
            return (
              <button
                key={item.key}
                className={`w-full text-right px-3 py-2 rounded-xl flex items-center gap-3 ${active ? 'bg-blue-600' : 'bg-slate-800'}`}
                onClick={() => setActivePage(item.key as Page)}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </aside>

        <main className="p-6 space-y-6">
          <section className="bg-white rounded-2xl border border-slate-200 p-5">
            <h2 className="font-black text-xl">وصف المشروع والمتطلبات</h2>
            <p className="text-slate-600 mt-2">منصة ويب عربية (RTL) لإدارة المهام والدعم الفني والأصول والصيانة مع تقارير تفصيلية.</p>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <h3 className="font-bold mb-2">Software Requirements</h3>
                <ul className="list-disc mr-5 space-y-1 text-sm text-slate-600">
                  {requirements.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">هيكل قاعدة البيانات</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                  {dbTables.map((table) => <span key={table} className="px-3 py-1 rounded-full bg-slate-100 border">{table}</span>)}
                </div>
              </div>
            </div>
          </section>

          {dashboard && activePage === 'dashboard' && (
            <>
              <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard label="المهام المفتوحة" value={dashboard.summary.openTasks} icon={ClipboardList} />
                <StatCard label="التذاكر المفتوحة" value={dashboard.summary.openTickets} icon={LifeBuoy} />
                <StatCard label="الأجهزة النشطة" value={dashboard.summary.activeDevices} icon={HardDrive} />
                <StatCard label="الصيانة المجدولة" value={dashboard.summary.plannedMaintenance} icon={Bell} />
              </section>
              <section className="grid lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-slate-200">
                  <h3 className="font-bold mb-3">حالة التذاكر</h3>
                  {dashboard.charts.ticketsByStatus.map((item) => (
                    <div key={item.label} className="mb-2">
                      <div className="flex justify-between text-sm"><span>{item.label}</span><span>{item.value}</span></div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500" style={{width: `${item.value * 25}%`}} /></div>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-2xl p-5 border border-slate-200">
                  <h3 className="font-bold mb-3">أولوية المهام</h3>
                  {dashboard.charts.tasksByPriority.map((item) => (
                    <div key={item.label} className="mb-2 flex justify-between border-b pb-2"><span>{item.label}</span><span className="font-bold">{item.value}</span></div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activePage === 'tasks' && (
            <section className="bg-white rounded-2xl p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">إدارة المهام اليومية</h3>
                <div className="relative">
                  <Search className="absolute right-2 top-2.5 w-4 h-4 text-slate-400" />
                  <input value={query} onChange={(e) => setQuery(e.target.value)} className="border rounded-lg pr-8 pl-3 py-2" placeholder="بحث في المهام" />
                </div>
              </div>
              <table className="w-full text-sm">
                <thead><tr className="text-right border-b"><th>العنوان</th><th>الحالة</th><th>الأولوية</th><th>المسؤول</th><th>تاريخ الانتهاء</th></tr></thead>
                <tbody>
                  {filteredTasks.map((task) => <tr key={task.id} className="border-b"><td className="py-2">{task.title}</td><td>{task.status}</td><td>{task.priority}</td><td>{task.assignee_name}</td><td>{task.due_date}</td></tr>)}
                </tbody>
              </table>
            </section>
          )}

          {activePage === 'tickets' && (
            <section className="bg-white rounded-2xl p-5 border border-slate-200 overflow-auto">
              <h3 className="font-bold mb-3">طلبات الدعم والتذاكر</h3>
              <table className="w-full text-sm">
                <thead><tr className="text-right border-b"><th>رقم التذكرة</th><th>النوع</th><th>الوصف</th><th>الحالة</th><th>الأولوية</th></tr></thead>
                <tbody>
                  {tickets.map((ticket) => <tr key={ticket.id} className="border-b"><td className="py-2">{ticket.ticket_number}</td><td>{ticket.issue_type}</td><td>{ticket.description}</td><td>{ticket.status}</td><td>{ticket.priority}</td></tr>)}
                </tbody>
              </table>
            </section>
          )}

          {activePage === 'devices' && (
            <section className="bg-white rounded-2xl p-5 border border-slate-200 overflow-auto">
              <h3 className="font-bold mb-3">إدارة الأجهزة والمعدات</h3>
              <table className="w-full text-sm">
                <thead><tr className="text-right border-b"><th>الجهاز</th><th>النوع</th><th>الموديل</th><th>الرقم التسلسلي</th><th>المستخدم</th><th>الحالة</th></tr></thead>
                <tbody>
                  {devices.map((device) => <tr key={device.id} className="border-b"><td className="py-2">{device.name}</td><td>{device.type}</td><td>{device.model}</td><td>{device.serial_number}</td><td>{device.assigned_user_name || '-'}</td><td>{device.status}</td></tr>)}
                </tbody>
              </table>
            </section>
          )}

          {activePage === 'maintenance' && (
            <section className="bg-white rounded-2xl p-5 border border-slate-200">
              <h3 className="font-bold mb-3">الصيانة الدورية</h3>
              {maintenance.map((item) => (
                <div key={item.id} className="border rounded-xl p-3 mb-3 bg-slate-50">
                  <p className="font-bold">{item.device_name}</p>
                  <p className="text-sm">{item.maintenance_type} - {item.maintenance_date}</p>
                  <p className="text-sm text-slate-500">الفني: {item.technician_name} | الحالة: {item.status}</p>
                </div>
              ))}
            </section>
          )}

          {activePage === 'reports' && (
            <section className="bg-white rounded-2xl p-5 border border-slate-200">
              <h3 className="font-bold mb-3">التقارير والإحصائيات</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• تقرير أداء فريق الدعم حسب عدد التذاكر المغلقة.</li>
                <li>• تقرير الأجهزة المعطلة والمتكررة الأعطال.</li>
                <li>• تقرير الالتزام بخطط الصيانة الدورية.</li>
                <li>• تقرير المهام المتأخرة ونسب الإنجاز الأسبوعية.</li>
              </ul>
              <div className="mt-4 p-4 rounded-xl bg-blue-50 text-blue-800 border border-blue-100 flex gap-2">
                <ShieldCheck className="w-5 h-5" />
                <p className="text-sm">تم تصميم النظام ببنية قابلة للتوسع (REST API + SQLite) ويمكن الترقية لاحقًا إلى PostgreSQL وRBAC متقدم.</p>
              </div>
            </section>
          )}

          {loading && <p className="text-sm text-slate-500">جارِ تحميل البيانات...</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </main>
      </div>
    </div>
  );
}

export default App;
