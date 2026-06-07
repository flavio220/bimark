// ─── Bimark – Fichier central de traductions ───────────────────────────────
// Langues : fr, en, es, pt, ar, zh
// Ajouter une langue : ajouter un bloc avec la même structure que 'fr'

export const SUPPORTED_LANGUAGES = [
  { code: 'fr', label: 'Français',    flag: '🇫🇷', dir: 'ltr' },
  { code: 'en', label: 'English',     flag: '🇬🇧', dir: 'ltr' },
  { code: 'es', label: 'Español',     flag: '🇪🇸', dir: 'ltr' },
  { code: 'pt', label: 'Português',   flag: '🇧🇷', dir: 'ltr' },
  { code: 'ar', label: 'العربية',     flag: '🇸🇦', dir: 'rtl' },
  { code: 'zh', label: '中文',        flag: '🇨🇳', dir: 'ltr' },
];

export const DEFAULT_LANG = 'fr';

const T = {
  // ─── Navigation ────────────────────────────────────────────────────────────
  nav: {
    home:        { fr:'Accueil',         en:'Home',           es:'Inicio',       pt:'Início',        ar:'الرئيسية',   zh:'首页' },
    products:    { fr:'Produits',        en:'Products',       es:'Productos',    pt:'Produtos',      ar:'المنتجات',   zh:'产品' },
    buyer:       { fr:'Espace Acheteur', en:'Buyer Space',    es:'Espacio Comprador', pt:'Espaço Comprador', ar:'مساحة المشتري', zh:'买家空间' },
    seller:      { fr:'Espace Vendeur',  en:'Seller Space',   es:'Espacio Vendedor',  pt:'Espaço Vendedor',  ar:'مساحة البائع',  zh:'卖家空间' },
    login:       { fr:'Connexion',       en:'Sign In',        es:'Iniciar sesión', pt:'Entrar',       ar:'تسجيل الدخول', zh:'登录' },
    register:    { fr:'S\'inscrire',     en:'Sign Up',        es:'Registrarse',  pt:'Cadastrar',     ar:'إنشاء حساب', zh:'注册' },
    logout:      { fr:'Se déconnecter', en:'Sign Out',        es:'Cerrar sesión', pt:'Sair',         ar:'تسجيل الخروج', zh:'退出' },
    profile:     { fr:'Mon Profil',     en:'My Profile',      es:'Mi Perfil',    pt:'Meu Perfil',    ar:'ملفي',       zh:'我的资料' },
    settings:    { fr:'Paramètres',     en:'Settings',        es:'Configuración', pt:'Configurações', ar:'الإعدادات',  zh:'设置' },
  },

  // ─── Commun ────────────────────────────────────────────────────────────────
  common: {
    save:        { fr:'Enregistrer',    en:'Save',            es:'Guardar',      pt:'Salvar',        ar:'حفظ',        zh:'保存' },
    cancel:      { fr:'Annuler',        en:'Cancel',          es:'Cancelar',     pt:'Cancelar',      ar:'إلغاء',      zh:'取消' },
    edit:        { fr:'Modifier',       en:'Edit',            es:'Editar',       pt:'Editar',        ar:'تعديل',      zh:'编辑' },
    delete:      { fr:'Supprimer',      en:'Delete',          es:'Eliminar',     pt:'Excluir',       ar:'حذف',        zh:'删除' },
    add:         { fr:'Ajouter',        en:'Add',             es:'Agregar',      pt:'Adicionar',     ar:'إضافة',      zh:'添加' },
    search:      { fr:'Rechercher',     en:'Search',          es:'Buscar',       pt:'Pesquisar',     ar:'بحث',        zh:'搜索' },
    loading:     { fr:'Chargement...',  en:'Loading...',      es:'Cargando...',  pt:'Carregando...', ar:'جارٍ التحميل...', zh:'加载中...' },
    back:        { fr:'Retour',         en:'Back',            es:'Volver',       pt:'Voltar',        ar:'رجوع',       zh:'返回' },
    confirm:     { fr:'Confirmer',      en:'Confirm',         es:'Confirmar',    pt:'Confirmar',     ar:'تأكيد',      zh:'确认' },
    send:        { fr:'Envoyer',        en:'Send',            es:'Enviar',       pt:'Enviar',        ar:'إرسال',      zh:'发送' },
    view:        { fr:'Voir',           en:'View',            es:'Ver',          pt:'Ver',           ar:'عرض',        zh:'查看' },
    required:    { fr:'obligatoire',    en:'required',        es:'obligatorio',  pt:'obrigatório',   ar:'مطلوب',      zh:'必填' },
    yes:         { fr:'Oui',            en:'Yes',             es:'Sí',           pt:'Sim',           ar:'نعم',        zh:'是' },
    no:          { fr:'Non',            en:'No',              es:'No',           pt:'Não',           ar:'لا',         zh:'否' },
    all:         { fr:'Tous',           en:'All',             es:'Todos',        pt:'Todos',         ar:'الكل',       zh:'全部' },
    none:        { fr:'Aucun',          en:'None',            es:'Ninguno',      pt:'Nenhum',        ar:'لا يوجد',    zh:'无' },
    status:      { fr:'Statut',         en:'Status',          es:'Estado',       pt:'Status',        ar:'الحالة',     zh:'状态' },
    date:        { fr:'Date',           en:'Date',            es:'Fecha',        pt:'Data',          ar:'التاريخ',    zh:'日期' },
    total:       { fr:'Total',          en:'Total',           es:'Total',        pt:'Total',         ar:'الإجمالي',   zh:'总计' },
    price:       { fr:'Prix',           en:'Price',           es:'Precio',       pt:'Preço',         ar:'السعر',      zh:'价格' },
    quantity:    { fr:'Quantité',       en:'Quantity',        es:'Cantidad',     pt:'Quantidade',    ar:'الكمية',     zh:'数量' },
    name:        { fr:'Nom',            en:'Name',            es:'Nombre',       pt:'Nome',          ar:'الاسم',      zh:'名称' },
    description: { fr:'Description',   en:'Description',     es:'Descripción',  pt:'Descrição',     ar:'الوصف',      zh:'描述' },
    category:    { fr:'Catégorie',      en:'Category',        es:'Categoría',    pt:'Categoria',     ar:'الفئة',      zh:'类别' },
    country:     { fr:'Pays',           en:'Country',         es:'País',         pt:'País',          ar:'البلد',      zh:'国家' },
    city:        { fr:'Ville',          en:'City',            es:'Ciudad',       pt:'Cidade',        ar:'المدينة',    zh:'城市' },
    email:       { fr:'Email',          en:'Email',           es:'Correo electrónico', pt:'Email',  ar:'البريد الإلكتروني', zh:'邮箱' },
    phone:       { fr:'Téléphone',      en:'Phone',           es:'Teléfono',     pt:'Telefone',      ar:'الهاتف',     zh:'电话' },
    address:     { fr:'Adresse',        en:'Address',         es:'Dirección',    pt:'Endereço',      ar:'العنوان',    zh:'地址' },
    website:     { fr:'Site web',       en:'Website',         es:'Sitio web',    pt:'Website',       ar:'الموقع الإلكتروني', zh:'网站' },
    message:     { fr:'Message',        en:'Message',         es:'Mensaje',      pt:'Mensagem',      ar:'رسالة',      zh:'消息' },
    seeAll:      { fr:'Voir tout',      en:'See all',         es:'Ver todo',     pt:'Ver tudo',      ar:'عرض الكل',   zh:'查看全部' },
    manage:      { fr:'Gérer',          en:'Manage',          es:'Gestionar',    pt:'Gerenciar',     ar:'إدارة',      zh:'管理' },
    close:       { fr:'Fermer',         en:'Close',           es:'Cerrar',       pt:'Fechar',        ar:'إغلاق',      zh:'关闭' },
    apply:       { fr:'Appliquer',      en:'Apply',           es:'Aplicar',      pt:'Aplicar',       ar:'تطبيق',      zh:'应用' },
    reset:       { fr:'Réinitialiser',  en:'Reset',           es:'Restablecer',  pt:'Redefinir',     ar:'إعادة تعيين', zh:'重置' },
    welcome:     { fr:'Bienvenue',      en:'Welcome',         es:'Bienvenido',   pt:'Bem-vindo',     ar:'مرحباً',     zh:'欢迎' },
    noData:      { fr:'Aucune donnée',  en:'No data',         es:'Sin datos',    pt:'Sem dados',     ar:'لا توجد بيانات', zh:'暂无数据' },
    success:     { fr:'Succès !',       en:'Success!',        es:'¡Éxito!',      pt:'Sucesso!',      ar:'نجاح!',      zh:'成功！' },
    error:       { fr:'Erreur',         en:'Error',           es:'Error',        pt:'Erro',          ar:'خطأ',        zh:'错误' },
  },

  // ─── Header / Footer ───────────────────────────────────────────────────────
  header: {
    searchPlaceholder: { fr:'Rechercher des produits...', en:'Search products...', es:'Buscar productos...', pt:'Pesquisar produtos...', ar:'ابحث عن منتجات...', zh:'搜索产品...' },
    darkMode:  { fr:'Mode sombre',  en:'Dark mode',  es:'Modo oscuro', pt:'Modo escuro', ar:'الوضع الداكن', zh:'暗色模式' },
    lightMode: { fr:'Mode clair',   en:'Light mode', es:'Modo claro',  pt:'Modo claro',  ar:'الوضع الفاتح', zh:'亮色模式' },
  },
  footer: {
    rights:    { fr:'Tous droits réservés.', en:'All rights reserved.', es:'Todos los derechos reservados.', pt:'Todos os direitos reservados.', ar:'جميع الحقوق محفوظة.', zh:'版权所有。' },
    privacy:   { fr:'Politique de confidentialité', en:'Privacy Policy', es:'Política de privacidad', pt:'Política de privacidade', ar:'سياسة الخصوصية', zh:'隐私政策' },
    terms:     { fr:'CGU', en:'Terms of Use', es:'Términos de uso', pt:'Termos de uso', ar:'شروط الاستخدام', zh:'使用条款' },
    support:   { fr:'Assistance', en:'Support', es:'Soporte', pt:'Suporte', ar:'الدعم', zh:'支持' },
    marketplace: { fr:'Marketplace', en:'Marketplace', es:'Mercado', pt:'Mercado', ar:'السوق', zh:'市场' },
    platforms: { fr:'Plateformes', en:'Platforms', es:'Plataformas', pt:'Plataformas', ar:'المنصات', zh:'平台' },
    buyerSpace: { fr:'Espace Acheteur', en:'Buyer Space', es:'Espacio Comprador', pt:'Espaço Comprador', ar:'مساحة المشتري', zh:'买家空间' },
    sellerSpace: { fr:'Espace Vendeur', en:'Seller Space', es:'Espacio Vendedor', pt:'Espaço Vendedor', ar:'مساحة البائع', zh:'卖家空间' },
    about:     { fr:'À propos', en:'About Us', es:'Acerca de', pt:'Sobre nós', ar:'من نحن', zh:'关于我们' },
    contact:   { fr:'Contact', en:'Contact', es:'Contacto', pt:'Contato', ar:'اتصل بنا', zh:'联系我们' },
  },

  // ─── Recherche ─────────────────────────────────────────────────────────────
  search: {
    title:        { fr:'Recherche de produits', en:'Product Search', es:'Búsqueda de productos', pt:'Pesquisa de produtos', ar:'بحث عن المنتجات', zh:'产品搜索' },
    startTitle:   { fr:'Lancez votre recherche', en:'Start your search', es:'Inicia tu búsqueda', pt:'Inicie sua pesquisa', ar:'ابدأ بحثك', zh:'开始搜索' },
    startHint:    { fr:'Entrez le nom d\'un produit, une catégorie ou un mot-clé.', en:'Enter a product name, category or keyword.', es:'Ingresa un nombre de producto, categoría o palabra clave.', pt:'Digite um nome de produto, categoria ou palavra-chave.', ar:'أدخل اسم منتج أو فئة أو كلمة مفتاحية.', zh:'输入产品名称、类别或关键词。' },
    suggestions:  { fr:'Suggestions populaires', en:'Popular suggestions', es:'Sugerencias populares', pt:'Sugestões populares', ar:'اقتراحات شائعة', zh:'热门建议' },
    resultsFor:   { fr:'Résultats pour', en:'Results for', es:'Resultados para', pt:'Resultados para', ar:'نتائج البحث عن', zh:'搜索结果：' },
    noResults:    { fr:'Aucun résultat', en:'No results', es:'Sin resultados', pt:'Sem resultados', ar:'لا توجد نتائج', zh:'无结果' },
    noResultsHint:{ fr:'Aucun produit trouvé.', en:'No product found.', es:'No se encontraron productos.', pt:'Nenhum produto encontrado.', ar:'لم يتم العثور على منتجات.', zh:'未找到产品。' },
    tryInstead:   { fr:'Vous pourriez aussi aimer', en:'You might also like', es:'También te puede gustar', pt:'Você também pode gostar', ar:'قد يعجبك أيضاً', zh:'您可能也喜欢' },
    clearSearch:  { fr:'Nouvelle recherche', en:'New search', es:'Nueva búsqueda', pt:'Nova pesquisa', ar:'بحث جديد', zh:'新搜索' },
    found:        { fr:'produit(s) trouvé(s)', en:'product(s) found', es:'producto(s) encontrado(s)', pt:'produto(s) encontrado(s)', ar:'منتج(ات) وُجدت', zh:'个产品' },
    filters:      { fr:'Filtres', en:'Filters', es:'Filtros', pt:'Filtros', ar:'عوامل التصفية', zh:'筛选' },
    sortBy:       { fr:'Trier par', en:'Sort by', es:'Ordenar por', pt:'Ordenar por', ar:'ترتيب حسب', zh:'排序方式' },
    relevance:    { fr:'Pertinence', en:'Relevance', es:'Relevancia', pt:'Relevância', ar:'الصلة', zh:'相关性' },
    priceAsc:     { fr:'Prix croissant', en:'Price: Low to High', es:'Precio: Menor a Mayor', pt:'Preço: Menor a Maior', ar:'السعر: الأقل أولاً', zh:'价格由低到高' },
    priceDesc:    { fr:'Prix décroissant', en:'Price: High to Low', es:'Precio: Mayor a Menor', pt:'Preço: Maior a Menor', ar:'السعر: الأعلى أولاً', zh:'价格由高到低' },
    topRated:     { fr:'Mieux notés', en:'Top Rated', es:'Mejor valorados', pt:'Mais bem avaliados', ar:'الأعلى تقييماً', zh:'评分最高' },
    gridView:     { fr:'Grille', en:'Grid', es:'Cuadrícula', pt:'Grade', ar:'شبكة', zh:'网格' },
    listView:     { fr:'Liste', en:'List', es:'Lista', pt:'Lista', ar:'قائمة', zh:'列表' },
    wholesale:    { fr:'Prix gros', en:'Wholesale', es:'Precio mayorista', pt:'Preço atacado', ar:'سعر الجملة', zh:'批发价' },
    retail:       { fr:'Prix détail', en:'Retail', es:'Precio al por menor', pt:'Preço varejo', ar:'سعر التجزئة', zh:'零售价' },
    moq:          { fr:'Qté min.', en:'MOQ', es:'Cant. mín.', pt:'Qtd. mín.', ar:'الحد الأدنى', zh:'最低起订量' },
    freeShipping: { fr:'Livraison offerte', en:'Free Shipping', es:'Envío gratis', pt:'Frete grátis', ar:'شحن مجاني', zh:'免费配送' },
    verified:     { fr:'Fournisseur vérifié', en:'Verified Supplier', es:'Proveedor verificado', pt:'Fornecedor verificado', ar:'مورد موثق', zh:'已认证供应商' },
    viewDetails:  { fr:'Voir le produit', en:'View Details', es:'Ver detalles', pt:'Ver detalhes', ar:'عرض التفاصيل', zh:'查看详情' },
    bulkInquiry:  { fr:'Demande en gros', en:'Bulk Inquiry', es:'Consulta al por mayor', pt:'Consulta em atacado', ar:'استفسار الجملة', zh:'批量询价' },
    compare:      { fr:'Comparer', en:'Compare', es:'Comparar', pt:'Comparar', ar:'مقارنة', zh:'比较' },
    removeCompare:{ fr:'Retirer', en:'Remove', es:'Quitar', pt:'Remover', ar:'إزالة', zh:'移除' },
    addWishlist:  { fr:'Ajouter aux favoris', en:'Add to Wishlist', es:'Agregar a favoritos', pt:'Adicionar à lista de desejos', ar:'أضف إلى المفضلة', zh:'加入收藏' },
    removeWishlist:{ fr:'Retirer des favoris', en:'Remove from Wishlist', es:'Quitar de favoritos', pt:'Remover da lista de desejos', ar:'إزالة من المفضلة', zh:'从收藏中移除' },
  },

  // ─── Dashboards commun ────────────────────────────────────────────────────
  dashboard: {
    overview:    { fr:'Tableau de bord', en:'Dashboard', es:'Panel de control', pt:'Painel', ar:'لوحة التحكم', zh:'仪表板' },
    orders:      { fr:'Commandes', en:'Orders', es:'Pedidos', pt:'Pedidos', ar:'الطلبات', zh:'订单' },
    messages:    { fr:'Messages', en:'Messages', es:'Mensajes', pt:'Mensagens', ar:'الرسائل', zh:'消息' },
    settings:    { fr:'Paramètres', en:'Settings', es:'Configuración', pt:'Configurações', ar:'الإعدادات', zh:'设置' },
    noOrders:    { fr:'Aucune commande', en:'No orders', es:'Sin pedidos', pt:'Sem pedidos', ar:'لا توجد طلبات', zh:'暂无订单' },
    noMessages:  { fr:'Aucun message', en:'No messages', es:'Sin mensajes', pt:'Sem mensagens', ar:'لا توجد رسائل', zh:'暂无消息' },
    writeMessage:{ fr:'Écrire un message...', en:'Write a message...', es:'Escribir un mensaje...', pt:'Escrever uma mensagem...', ar:'اكتب رسالة...', zh:'写消息...' },
    sendMsg:     { fr:'Envoyer', en:'Send', es:'Enviar', pt:'Enviar', ar:'إرسال', zh:'发送' },
    noConvSelected: { fr:'Sélectionnez une conversation', en:'Select a conversation', es:'Selecciona una conversación', pt:'Selecione uma conversa', ar:'اختر محادثة', zh:'选择对话' },
    today:       { fr:'Aujourd\'hui', en:'Today', es:'Hoy', pt:'Hoje', ar:'اليوم', zh:'今天' },
    yesterday:   { fr:'Hier', en:'Yesterday', es:'Ayer', pt:'Ontem', ar:'أمس', zh:'昨天' },
    searchConv:  { fr:'Rechercher...', en:'Search...', es:'Buscar...', pt:'Pesquisar...', ar:'بحث...', zh:'搜索...' },
  },

  // ─── Vendeur ──────────────────────────────────────────────────────────────
  seller: {
    myShop:      { fr:'Ma Boutique', en:'My Shop', es:'Mi Tienda', pt:'Minha Loja', ar:'متجري', zh:'我的店铺' },
    myProducts:  { fr:'Mes Produits', en:'My Products', es:'Mis Productos', pt:'Meus Produtos', ar:'منتجاتي', zh:'我的产品' },
    addProduct:  { fr:'Ajouter un produit', en:'Add a product', es:'Agregar producto', pt:'Adicionar produto', ar:'إضافة منتج', zh:'添加产品' },
    editProduct: { fr:'Modifier le produit', en:'Edit product', es:'Editar producto', pt:'Editar produto', ar:'تعديل المنتج', zh:'编辑产品' },
    customers:   { fr:'Mes Clients', en:'My Customers', es:'Mis Clientes', pt:'Meus Clientes', ar:'عملائي', zh:'我的客户' },
    analytics:   { fr:'Statistiques', en:'Analytics', es:'Estadísticas', pt:'Estatísticas', ar:'الإحصاءات', zh:'统计分析' },
    available:   { fr:'Disponible', en:'Available', es:'Disponible', pt:'Disponível', ar:'متاح', zh:'有货' },
    unavailable: { fr:'Indisponible', en:'Unavailable', es:'No disponible', pt:'Indisponível', ar:'غير متاح', zh:'缺货' },
    inStock:     { fr:'En stock', en:'In stock', es:'En stock', pt:'Em estoque', ar:'في المخزون', zh:'有库存' },
    lowStock:    { fr:'Stock bas', en:'Low stock', es:'Stock bajo', pt:'Estoque baixo', ar:'مخزون منخفض', zh:'库存不足' },
    outOfStock:  { fr:'Rupture', en:'Out of stock', es:'Sin stock', pt:'Sem estoque', ar:'نفد المخزون', zh:'缺货' },
    pending:     { fr:'En attente', en:'Pending', es:'Pendiente', pt:'Pendente', ar:'قيد الانتظار', zh:'待处理' },
    confirmed:   { fr:'Confirmée', en:'Confirmed', es:'Confirmado', pt:'Confirmado', ar:'مؤكد', zh:'已确认' },
    shipped:     { fr:'Expédiée', en:'Shipped', es:'Enviado', pt:'Enviado', ar:'تم الشحن', zh:'已发货' },
    delivered:   { fr:'Livrée', en:'Delivered', es:'Entregado', pt:'Entregue', ar:'تم التسليم', zh:'已送达' },
    cancelled:   { fr:'Annulée', en:'Cancelled', es:'Cancelado', pt:'Cancelado', ar:'ملغى', zh:'已取消' },
    tracking:    { fr:'Numéro de suivi', en:'Tracking number', es:'Número de seguimiento', pt:'Número de rastreio', ar:'رقم التتبع', zh:'跟踪号' },
    noProducts:  { fr:'Aucun produit listé', en:'No products listed', es:'Sin productos', pt:'Sem produtos', ar:'لا توجد منتجات', zh:'暂无产品' },
    noCustomers: { fr:'Aucun client', en:'No customers', es:'Sin clientes', pt:'Sem clientes', ar:'لا يوجد عملاء', zh:'暂无客户' },
    revenue:     { fr:'Revenus', en:'Revenue', es:'Ingresos', pt:'Receita', ar:'الإيرادات', zh:'收入' },
    totalRevenue:{ fr:'Revenus totaux', en:'Total Revenue', es:'Ingresos totales', pt:'Receita total', ar:'إجمالي الإيرادات', zh:'总收入' },
    publishProduct: { fr:'Publier le produit', en:'Publish product', es:'Publicar producto', pt:'Publicar produto', ar:'نشر المنتج', zh:'发布产品' },
    saveChanges: { fr:'Enregistrer les modifications', en:'Save changes', es:'Guardar cambios', pt:'Salvar alterações', ar:'حفظ التغييرات', zh:'保存更改' },
    shopName:    { fr:'Nom de la boutique', en:'Shop name', es:'Nombre de la tienda', pt:'Nome da loja', ar:'اسم المتجر', zh:'店铺名称' },
    shopDesc:    { fr:'Description de la boutique', en:'Shop description', es:'Descripción de la tienda', pt:'Descrição da loja', ar:'وصف المتجر', zh:'店铺描述' },
    verified:    { fr:'Vendeur vérifié', en:'Verified seller', es:'Vendedor verificado', pt:'Vendedor verificado', ar:'بائع موثق', zh:'已认证卖家' },
    verifyPending: { fr:'Vérification en cours', en:'Verification pending', es:'Verificación pendiente', pt:'Verificação pendente', ar:'التحقق جارٍ', zh:'验证中' },
  },

  // ─── Acheteur ─────────────────────────────────────────────────────────────
  buyer: {
    myOrders:    { fr:'Mes Commandes', en:'My Orders', es:'Mis Pedidos', pt:'Meus Pedidos', ar:'طلباتي', zh:'我的订单' },
    mySuppliers: { fr:'Mes Fournisseurs', en:'My Suppliers', es:'Mis Proveedores', pt:'Meus Fornecedores', ar:'مورديّ', zh:'我的供应商' },
    myFavorites: { fr:'Mes Favoris', en:'My Favorites', es:'Mis Favoritos', pt:'Meus Favoritos', ar:'مفضلاتي', zh:'我的收藏' },
    requestQuote:{ fr:'Demander un devis', en:'Request a Quote', es:'Solicitar cotización', pt:'Solicitar cotação', ar:'طلب عرض سعر', zh:'询价' },
    trackOrder:  { fr:'Suivre la commande', en:'Track order', es:'Rastrear pedido', pt:'Rastrear pedido', ar:'تتبع الطلب', zh:'跟踪订单' },
    cancelOrder: { fr:'Annuler la commande', en:'Cancel order', es:'Cancelar pedido', pt:'Cancelar pedido', ar:'إلغاء الطلب', zh:'取消订单' },
    noFavorites: { fr:'Aucun favori', en:'No favorites', es:'Sin favoritos', pt:'Sem favoritos', ar:'لا مفضلات', zh:'暂无收藏' },
    noSuppliers: { fr:'Aucun fournisseur', en:'No suppliers', es:'Sin proveedores', pt:'Sem fornecedores', ar:'لا موردين', zh:'暂无供应商' },
    totalSpent:  { fr:'Total dépensé', en:'Total Spent', es:'Total gastado', pt:'Total gasto', ar:'إجمالي المنفق', zh:'总花费' },
  },

  // ─── Contact ──────────────────────────────────────────────────────────────
  contact: {
    title:       { fr:'Contactez-nous', en:'Contact Us', es:'Contáctanos', pt:'Contate-nos', ar:'اتصل بنا', zh:'联系我们' },
    subtitle:    { fr:'Notre équipe vous répond sous 24h.', en:'Our team replies within 24h.', es:'Nuestro equipo responde en 24h.', pt:'Nossa equipe responde em 24h.', ar:'يرد فريقنا خلال 24 ساعة.', zh:'我们的团队在24小时内回复。' },
    fullName:    { fr:'Nom complet', en:'Full name', es:'Nombre completo', pt:'Nome completo', ar:'الاسم الكامل', zh:'全名' },
    subject:     { fr:'Sujet', en:'Subject', es:'Asunto', pt:'Assunto', ar:'الموضوع', zh:'主题' },
    yourMessage: { fr:'Votre message', en:'Your message', es:'Tu mensaje', pt:'Sua mensagem', ar:'رسالتك', zh:'您的消息' },
    send:        { fr:'Envoyer le message', en:'Send message', es:'Enviar mensaje', pt:'Enviar mensagem', ar:'إرسال الرسالة', zh:'发送消息' },
    sent:        { fr:'Message envoyé !', en:'Message sent!', es:'¡Mensaje enviado!', pt:'Mensagem enviada!', ar:'تم الإرسال!', zh:'消息已发送！' },
    sentDesc:    { fr:'Nous vous répondrons dans les plus brefs délais.', en:'We\'ll get back to you shortly.', es:'Te responderemos pronto.', pt:'Entraremos em contato em breve.', ar:'سنرد عليك قريباً.', zh:'我们将尽快回复您。' },
    newMessage:  { fr:'Envoyer un autre message', en:'Send another message', es:'Enviar otro mensaje', pt:'Enviar outra mensagem', ar:'إرسال رسالة أخرى', zh:'发送另一条消息' },
    hours:       { fr:'Horaires', en:'Hours', es:'Horario', pt:'Horário', ar:'ساعات العمل', zh:'营业时间' },
    hoursVal:    { fr:'Lun–Ven 8h–18h · Sam 9h–14h', en:'Mon–Fri 8am–6pm · Sat 9am–2pm', es:'Lun–Vie 8h–18h · Sáb 9h–14h', pt:'Seg–Sex 8h–18h · Sáb 9h–14h', ar:'الإثنين–الجمعة 8–18 · السبت 9–14', zh:'周一至周五 8:00–18:00 · 周六 9:00–14:00' },
    needHelp:    { fr:'Besoin d\'aide ?', en:'Need help?', es:'¿Necesitas ayuda?', pt:'Precisa de ajuda?', ar:'تحتاج مساعدة؟', zh:'需要帮助？' },
  },

  // ─── À propos ─────────────────────────────────────────────────────────────
  about: {
    title:       { fr:'À propos de Bimark', en:'About Bimark', es:'Acerca de Bimark', pt:'Sobre a Bimark', ar:'عن بيمارك', zh:'关于Bimark' },
    mission:     { fr:'Notre mission', en:'Our mission', es:'Nuestra misión', pt:'Nossa missão', ar:'مهمتنا', zh:'我们的使命' },
    values:      { fr:'Nos valeurs', en:'Our values', es:'Nuestros valores', pt:'Nossos valores', ar:'قيمنا', zh:'我们的价值观' },
    joinToday:   { fr:'Rejoignez Bimark aujourd\'hui', en:'Join Bimark today', es:'Únete a Bimark hoy', pt:'Junte-se à Bimark hoje', ar:'انضم إلى بيمارك اليوم', zh:'今天加入Bimark' },
    createAccount: { fr:'Créer un compte', en:'Create an account', es:'Crear una cuenta', pt:'Criar uma conta', ar:'إنشاء حساب', zh:'创建账户' },
  },

  // ─── Auth ─────────────────────────────────────────────────────────────────
  auth: {
    signIn:      { fr:'Se connecter', en:'Sign In', es:'Iniciar sesión', pt:'Entrar', ar:'تسجيل الدخول', zh:'登录' },
    signUp:      { fr:'Créer un compte', en:'Create Account', es:'Crear cuenta', pt:'Criar conta', ar:'إنشاء حساب', zh:'创建账户' },
    password:    { fr:'Mot de passe', en:'Password', es:'Contraseña', pt:'Senha', ar:'كلمة المرور', zh:'密码' },
    forgotPwd:   { fr:'Mot de passe oublié ?', en:'Forgot password?', es:'¿Olvidaste tu contraseña?', pt:'Esqueceu a senha?', ar:'نسيت كلمة المرور؟', zh:'忘记密码？' },
    noAccount:   { fr:'Pas encore de compte ?', en:'No account yet?', es:'¿Sin cuenta?', pt:'Sem conta?', ar:'ليس لديك حساب؟', zh:'还没有账号？' },
    hasAccount:  { fr:'Déjà un compte ?', en:'Already have an account?', es:'¿Ya tienes cuenta?', pt:'Já tem conta?', ar:'هل لديك حساب بالفعل؟', zh:'已有账号？' },
    buyer:       { fr:'Acheteur', en:'Buyer', es:'Comprador', pt:'Comprador', ar:'مشتري', zh:'买家' },
    seller:      { fr:'Vendeur', en:'Seller', es:'Vendedor', pt:'Vendedor', ar:'بائع', zh:'卖家' },
  },

  // ─── Profil / Paramètres ──────────────────────────────────────────────────
  profile: {
    title:       { fr:'Mon Profil', en:'My Profile', es:'Mi Perfil', pt:'Meu Perfil', ar:'ملفي الشخصي', zh:'我的资料' },
    personal:    { fr:'Informations personnelles', en:'Personal Information', es:'Información personal', pt:'Informações pessoais', ar:'المعلومات الشخصية', zh:'个人信息' },
    company:     { fr:'Entreprise', en:'Company', es:'Empresa', pt:'Empresa', ar:'الشركة', zh:'公司' },
    security:    { fr:'Sécurité', en:'Security', es:'Seguridad', pt:'Segurança', ar:'الأمان', zh:'安全' },
    preferences: { fr:'Préférences', en:'Preferences', es:'Preferencias', pt:'Preferências', ar:'التفضيلات', zh:'偏好设置' },
    addresses:   { fr:'Adresses', en:'Addresses', es:'Direcciones', pt:'Endereços', ar:'العناوين', zh:'地址' },
    firstName:   { fr:'Prénom', en:'First name', es:'Nombre', pt:'Nome', ar:'الاسم الأول', zh:'名' },
    lastName:    { fr:'Nom de famille', en:'Last name', es:'Apellido', pt:'Sobrenome', ar:'اسم العائلة', zh:'姓' },
    currentPwd:  { fr:'Mot de passe actuel', en:'Current password', es:'Contraseña actual', pt:'Senha atual', ar:'كلمة المرور الحالية', zh:'当前密码' },
    newPwd:      { fr:'Nouveau mot de passe', en:'New password', es:'Nueva contraseña', pt:'Nova senha', ar:'كلمة المرور الجديدة', zh:'新密码' },
    confirmPwd:  { fr:'Confirmer le mot de passe', en:'Confirm password', es:'Confirmar contraseña', pt:'Confirmar senha', ar:'تأكيد كلمة المرور', zh:'确认密码' },
    language:    { fr:'Langue', en:'Language', es:'Idioma', pt:'Idioma', ar:'اللغة', zh:'语言' },
    currency:    { fr:'Devise', en:'Currency', es:'Moneda', pt:'Moeda', ar:'العملة', zh:'货币' },
    theme:       { fr:'Thème', en:'Theme', es:'Tema', pt:'Tema', ar:'المظهر', zh:'主题' },
    darkMode:    { fr:'Mode sombre activé', en:'Dark mode on', es:'Modo oscuro activado', pt:'Modo escuro ativado', ar:'الوضع الداكن مفعّل', zh:'暗色模式已开启' },
    lightMode:   { fr:'Mode clair activé', en:'Light mode on', es:'Modo claro activado', pt:'Modo claro ativado', ar:'الوضع الفاتح مفعّل', zh:'亮色模式已开启' },
    notifications: { fr:'Notifications', en:'Notifications', es:'Notificaciones', pt:'Notificações', ar:'الإشعارات', zh:'通知' },
    saved:       { fr:'Modifications enregistrées !', en:'Changes saved!', es:'¡Cambios guardados!', pt:'Alterações salvas!', ar:'تم الحفظ!', zh:'更改已保存！' },
  },

  // ─── 404 ──────────────────────────────────────────────────────────────────
  notFound: {
    title:    { fr:'Page introuvable', en:'Page Not Found', es:'Página no encontrada', pt:'Página não encontrada', ar:'الصفحة غير موجودة', zh:'页面未找到' },
    subtitle: { fr:'La page que vous cherchez n\'existe pas.', en:'The page you\'re looking for doesn\'t exist.', es:'La página que buscas no existe.', pt:'A página que você procura não existe.', ar:'الصفحة التي تبحث عنها غير موجودة.', zh:'您查找的页面不存在。' },
    goHome:   { fr:'Retour à l\'accueil', en:'Go to Homepage', es:'Ir al inicio', pt:'Ir para o início', ar:'الذهاب إلى الرئيسية', zh:'返回首页' },
    contactUs:{ fr:'Nous contacter', en:'Contact Us', es:'Contáctanos', pt:'Contate-nos', ar:'اتصل بنا', zh:'联系我们' },
    support:  { fr:'Assistance disponible :', en:'Support available:', es:'Soporte disponible:', pt:'Suporte disponível:', ar:'الدعم متاح:', zh:'支持服务：' },
  },
};

export default T;

// Helper : t(key.subkey, lang) → string
export function t(path, lang) {
  const keys = path.split('.');
  let node = T;
  for (const k of keys) {
    if (!node[k]) return path;
    node = node[k];
  }
  return node[lang] || node['fr'] || path;
}
