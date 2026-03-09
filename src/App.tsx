import { motion } from "motion/react";
import { 
  Cpu, 
  Network, 
  ShieldCheck, 
  Zap, 
  MessageCircle, 
  Server, 
  Monitor, 
  Wrench, 
  Headphones,
  ExternalLink,
  CheckCircle2,
  ChevronLeft
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.4)]">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter neon-text-blue">المبرمج</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#hero" className="hover:text-neon-blue transition-colors">الرئيسية</a>
          <a href="#services" className="hover:text-neon-blue transition-colors">خدماتنا</a>
          <a href="#features" className="hover:text-neon-blue transition-colors">لماذا نحن؟</a>
          <a href="#contact" className="px-5 py-2 bg-neon-blue/10 border border-neon-blue/30 rounded-full text-neon-blue hover:bg-neon-blue hover:text-dark-bg transition-all">تواصل معنا</a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-blue/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-purple/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-xs font-bold mb-6">
              <Zap className="w-3 h-3" />
              <span>أفضل دعم فني للسايبر كافيه في مصر</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              نحن نجعل أجهزة <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">الجيمنج</span> تعمل بأقصى طاقتها
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
              متخصصون في صيانة وتطوير مقاهي الإنترنت. نوفر لك حلولاً تقنية متكاملة، من صيانة الهاردوير إلى إدارة الشبكات والسيرفرات، لضمان استمرارية عملك دون توقف.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://wa.me/201515049844" 
                className="flex items-center gap-2 px-8 py-4 bg-neon-blue text-dark-bg font-bold rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,243,255,0.3)]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>اطلب الدعم الآن</span>
              </a>
              <a 
                href="#services" 
                className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 font-bold rounded-xl hover:bg-white/10 transition-colors"
              >
                <span>استكشف خدماتنا</span>
                <ChevronLeft className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000" 
                alt="Gaming Cafe Setup" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-2xl border border-neon-blue/30 shadow-xl z-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center">
                  <ShieldCheck className="text-neon-blue w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">+50</div>
                  <div className="text-xs text-gray-400">سايبر كافيه تحت إدارتنا</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon: Icon, title, description, features }: { icon: any, title: string, description: string, features: string[] }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="glass-card p-8 rounded-3xl border border-white/5 hover:border-neon-blue/30 transition-all group"
  >
    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-neon-blue/10 transition-colors">
      <Icon className="w-8 h-8 text-gray-400 group-hover:text-neon-blue transition-colors" />
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-400 mb-6 text-sm leading-relaxed">{description}</p>
    <ul className="space-y-3">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-center gap-2 text-xs text-gray-300">
          <CheckCircle2 className="w-4 h-4 text-neon-blue" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const Services = () => {
  const services = [
    {
      icon: Wrench,
      title: "صيانة الهاردوير",
      description: "صيانة دورية وشاملة لجميع أجهزة الكمبيوتر والشاشات والملحقات لضمان أفضل أداء.",
      features: ["تنظيف الأجهزة وتغيير المعجون الحراري", "إصلاح أعطال البور سبلاي والماذربورد", "تطوير قطع الأجهزة (RAM, SSD)"]
    },
    {
      icon: Network,
      title: "إدارة الشبكات",
      description: "تصميم وتنفيذ شبكات احترافية تضمن أقل Ping ممكن للاعبين واستقرار تام.",
      features: ["تركيب وبرمجة الراوترات والسويتشات", "توزيع السرعات ومنع التقطيع", "تأمين الشبكة من الاختراق"]
    },
    {
      icon: Server,
      title: "أنظمة السيرفرات",
      description: "إعداد سيرفرات Diskless وسيرفرات الألعاب لتوفير التكاليف وسهولة الإدارة.",
      features: ["تركيب نظام CCBoot أو iCafeCloud", "تحديث الألعاب بضغطة واحدة", "توفير استهلاك الكهرباء والهاردات"]
    },
    {
      icon: Monitor,
      title: "الدعم البرمجي",
      description: "تثبيت وتفعيل أنظمة التشغيل والبرامج والألعاب مع ضبط الإعدادات المثالية.",
      features: ["نسخ ويندوز معدلة للألعاب", "حل مشاكل الكراش واللاج", "تثبيت برامج المحاسبة والإدارة"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-black/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-neon-purple uppercase tracking-widest mb-4">خدماتنا التقنية</h2>
          <p className="text-4xl md:text-5xl font-black mb-6">حلول متكاملة لمشروعك</p>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-neon-purple/5 blur-[100px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-2xl border-white/5">
                <div className="w-12 h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center mb-4">
                  <Headphones className="text-neon-blue w-6 h-6" />
                </div>
                <h4 className="font-bold mb-2">دعم 24/7</h4>
                <p className="text-xs text-gray-400">نحن معك في أي وقت لحل المشاكل الطارئة.</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border-white/5 translate-y-8">
                <div className="w-12 h-12 rounded-xl bg-neon-purple/10 flex items-center justify-center mb-4">
                  <ExternalLink className="text-neon-purple w-6 h-6" />
                </div>
                <h4 className="font-bold mb-2">دعم عن بعد</h4>
                <p className="text-xs text-gray-400">حل المشاكل البرمجية فوراً عبر TeamViewer.</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border-white/5">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="text-green-500 w-6 h-6" />
                </div>
                <h4 className="font-bold mb-2">ضمان حقيقي</h4>
                <p className="text-xs text-gray-400">ضمان على جميع قطع الغيار وأعمال الصيانة.</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border-white/5 translate-y-8">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                  <Zap className="text-orange-500 w-6 h-6" />
                </div>
                <h4 className="font-bold mb-2">استجابة سريعة</h4>
                <p className="text-xs text-gray-400">نصل إليك في أسرع وقت ممكن داخل القاهرة والجيزة.</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-sm font-bold text-neon-blue uppercase tracking-widest mb-4">لماذا تختار المبرمج؟</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight">شريكك التقني في رحلة <span className="neon-text-purple">النجاح</span></h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              نحن لا نقوم فقط بالإصلاح، بل نقوم بتحسين بيئة العمل بالكامل. خبرتنا الطويلة في إدارة كبرى مقاهي الألعاب تجعلنا نفهم احتياجاتك واحتياجات عملائك بدقة.
            </p>
            <ul className="space-y-4">
              {[
                "تقليل وقت تعطل الأجهزة بنسبة 90%",
                "توفير في استهلاك الإنترنت والكهرباء",
                "تحديثات دورية للألعاب والبرامج",
                "استشارات تقنية مجانية لعملائنا"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-neon-blue/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-neon-blue" />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="glass-card rounded-[40px] p-12 text-center relative overflow-hidden border border-neon-blue/20">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-purple" />
          
          <h2 className="text-4xl md:text-5xl font-black mb-6">هل أنت جاهز لتطوير السايبر الخاص بك؟</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            لا تترك عملك للصدفة. تواصل معنا اليوم للحصول على عرض سعر مخصص لصيانة وتطوير مقهى الإنترنت الخاص بك.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a 
              href="https://wa.me/201515049844" 
              className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-[#25D366] text-white font-bold rounded-2xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(37,211,102,0.2)]"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-lg">تواصل عبر واتساب</span>
            </a>
            <div className="flex flex-col items-center md:items-start">
              <span className="text-sm text-gray-500">أو اتصل بنا مباشرة:</span>
              <span className="text-xl font-bold text-neon-blue">01515049844</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
            <Cpu className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-black neon-text-blue">المبرمج</span>
        </div>
        
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} المبرمج للدعم الفني. جميع الحقوق محفوظة.
        </p>
        
        <div className="flex items-center gap-6 text-gray-500 text-sm">
          <a href="#" className="hover:text-neon-blue transition-colors">سياسة الخصوصية</a>
          <a href="#" className="hover:text-neon-blue transition-colors">الشروط والأحكام</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-neon-blue selection:text-dark-bg">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
