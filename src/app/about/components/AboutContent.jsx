'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useT } from '@/i18n/useTranslation';

const VALUES = {
  fr: [
    { icon:'ShieldCheckIcon', title:'Confiance & Sécurité', desc:'Tous nos fournisseurs sont vérifiés et certifiés. Transactions sécurisées garanties.' },
    { icon:'LanguageIcon', title:'Multilingue', desc:'Plateforme disponible en 6 langues pour une portée internationale maximale.' },
    { icon:'GlobeAltIcon', title:'Connectivité globale', desc:'Reliez acheteurs et vendeurs à travers le monde avec des outils B2B et B2C performants.' },
    { icon:'CurrencyDollarIcon', title:'Prix compétitifs', desc:'Accédez aux meilleurs prix grâce aux achats en gros et aux offres directes fournisseurs.' },
  ],
  en: [
    { icon:'ShieldCheckIcon', title:'Trust & Security', desc:'All our suppliers are verified and certified. Guaranteed secure transactions.' },
    { icon:'LanguageIcon', title:'Multilingual', desc:'Platform available in 6 languages for maximum international reach.' },
    { icon:'GlobeAltIcon', title:'Global connectivity', desc:'Connect buyers and sellers worldwide with powerful B2B and B2C tools.' },
    { icon:'CurrencyDollarIcon', title:'Competitive pricing', desc:'Access the best prices through bulk purchases and direct supplier offers.' },
  ],
  es: [
    { icon:'ShieldCheckIcon', title:'Confianza y Seguridad', desc:'Todos nuestros proveedores están verificados y certificados. Transacciones seguras garantizadas.' },
    { icon:'LanguageIcon', title:'Multilingüe', desc:'Plataforma disponible en 6 idiomas para alcance internacional máximo.' },
    { icon:'GlobeAltIcon', title:'Conectividad global', desc:'Conecta compradores y vendedores en todo el mundo con herramientas B2B y B2C.' },
    { icon:'CurrencyDollarIcon', title:'Precios competitivos', desc:'Accede a los mejores precios mediante compras al por mayor y ofertas directas.' },
  ],
  pt: [
    { icon:'ShieldCheckIcon', title:'Confiança e Segurança', desc:'Todos os nossos fornecedores são verificados e certificados. Transações seguras garantidas.' },
    { icon:'LanguageIcon', title:'Multilíngue', desc:'Plataforma disponível em 6 idiomas para alcance internacional máximo.' },
    { icon:'GlobeAltIcon', title:'Conectividade global', desc:'Conecte compradores e vendedores em todo o mundo com ferramentas B2B e B2C.' },
    { icon:'CurrencyDollarIcon', title:'Preços competitivos', desc:'Acesse os melhores preços por meio de compras no atacado e ofertas diretas.' },
  ],
  ar: [
    { icon:'ShieldCheckIcon', title:'الثقة والأمان', desc:'جميع مورديّنا محققون ومعتمدون. معاملات آمنة مضمونة.' },
    { icon:'LanguageIcon', title:'متعدد اللغات', desc:'المنصة متاحة بـ 6 لغات للوصول الدولي الأقصى.' },
    { icon:'GlobeAltIcon', title:'الاتصال العالمي', desc:'يربط المشترين والبائعين في جميع أنحاء العالم بأدوات B2B و B2C فعّالة.' },
    { icon:'CurrencyDollarIcon', title:'أسعار تنافسية', desc:'الوصول إلى أفضل الأسعار من خلال المشتريات بالجملة والعروض المباشرة.' },
  ],
  zh: [
    { icon:'ShieldCheckIcon', title:'信任与安全', desc:'我们所有供应商均经过核实和认证。保证安全交易。' },
    { icon:'LanguageIcon', title:'多语言', desc:'平台提供6种语言，实现最大国际覆盖。' },
    { icon:'GlobeAltIcon', title:'全球连接', desc:'通过强大的B2B和B2C工具连接全球买家和卖家。' },
    { icon:'CurrencyDollarIcon', title:'竞争性价格', desc:'通过批量采购和直接供应商报价获得最优价格。' },
  ],
};

const STATS_DATA = {
  fr: [{ label:'Pays couverts', value:'15+' },{ label:'Fournisseurs vérifiés', value:'500+' },{ label:'Catégories', value:'50+' },{ label:'Transactions sécurisées', value:'100%' }],
  en: [{ label:'Countries covered', value:'15+' },{ label:'Verified suppliers', value:'500+' },{ label:'Categories', value:'50+' },{ label:'Secure transactions', value:'100%' }],
  es: [{ label:'Países cubiertos', value:'15+' },{ label:'Proveedores verificados', value:'500+' },{ label:'Categorías', value:'50+' },{ label:'Transacciones seguras', value:'100%' }],
  pt: [{ label:'Países cobertos', value:'15+' },{ label:'Fornecedores verificados', value:'500+' },{ label:'Categorias', value:'50+' },{ label:'Transações seguras', value:'100%' }],
  ar: [{ label:'البلدان المغطاة', value:'+15' },{ label:'موردون موثقون', value:'+500' },{ label:'الفئات', value:'+50' },{ label:'معاملات آمنة', value:'100%' }],
  zh: [{ label:'覆盖国家', value:'15+' },{ label:'认证供应商', value:'500+' },{ label:'产品类别', value:'50+' },{ label:'安全交易', value:'100%' }],
};

const MISSIONS = {
  fr: 'Bimark a pour mission de simplifier le commerce international en offrant une plateforme intuitive, sécurisée et multilingue qui rapproche les acheteurs et vendeurs des marchés mondiaux.',
  en: 'Bimark\'s mission is to simplify international trade by offering an intuitive, secure and multilingual platform that connects buyers and sellers in global markets.',
  es: 'La misión de Bimark es simplificar el comercio internacional ofreciendo una plataforma intuitiva, segura y multilingüe que conecta compradores y vendedores en los mercados globales.',
  pt: 'A missão da Bimark é simplificar o comércio internacional, oferecendo uma plataforma intuitiva, segura e multilíngue que conecta compradores e vendedores nos mercados globais.',
  ar: 'مهمة بيمارك هي تبسيط التجارة الدولية من خلال تقديم منصة سهلة الاستخدام وآمنة ومتعددة اللغات تربط المشترين والبائعين في الأسواق العالمية.',
  zh: 'Bimark的使命是通过提供直观、安全和多语言的平台来简化国际贸易，将全球市场的买家和卖家连接起来。',
};

export default function AboutContent() {
  const { t, lang } = useT();
  const values = VALUES[lang] || VALUES.fr;
  const stats = STATS_DATA[lang] || STATS_DATA.fr;
  const mission = MISSIONS[lang] || MISSIONS.fr;

  return (
    <main className="pt-16 min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <Icon name="ShoppingBagIcon" size={30} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold">Bimark</h1>
          </div>
          <p className="text-xl text-white/90 mb-4">{t('about.title')}</p>
          <p className="text-white/70 max-w-2xl mx-auto text-sm">{mission}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-primary mb-1">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">{t('about.values')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 flex space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name={v.icon} size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-14 px-4 bg-muted">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">{t('about.mission')}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{mission}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">{t('about.joinToday')}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/user-registration" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth">
              {t('about.createAccount')}
            </Link>
            <Link href="/contact" className="px-6 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-smooth">
              {t('footer.contact')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
