import Header from '@/components/common/Header';
import HomepageInteractive from './components/HomepageInteractive';
import Footer from '@/components/common/Footer';

export const metadata = {
  title: 'Bimark - Global B2B & B2C Marketplace',
  description: 'Connect with verified suppliers and manufacturers worldwide. Browse thousands of products with bilingual French-English support for seamless international trade.'
};

export default function Homepage() {
  const pageData = {
    heroSlides: [
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_122b22f9d-1764654516001.png",
      alt: 'Modern warehouse with organized inventory shelves and logistics equipment',
      title: {
        en: 'Connect with Global Suppliers',
        fr: 'Connectez-vous avec des fournisseurs mondiaux'
      },
      description: {
        en: 'Access thousands of verified manufacturers and wholesalers worldwide',
        fr: 'Accédez à des milliers de fabricants et grossistes vérifiés dans le monde entier'
      }
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d1c32be2-1764692413988.png",
      alt: 'Business professionals shaking hands in modern office setting',
      title: {
        en: 'Trusted B2B Marketplace',
        fr: 'Marché B2B de confiance'
      },
      description: {
        en: 'Secure transactions with verified suppliers and buyer protection',
        fr: 'Transactions sécurisées avec des fournisseurs vérifiés et protection des acheteurs'
      }
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1142ff08a-1764838507884.png",
      alt: 'Person working on laptop with e-commerce dashboard and analytics',
      title: {
        en: 'Start Your Business Today',
        fr: 'Démarrez votre entreprise aujourd\'hui'
      },
      description: {
        en: 'Join thousands of successful sellers on our platform',
        fr: 'Rejoignez des milliers de vendeurs prospères sur notre plateforme'
      }
    }],


    trustMetrics: [
    {
      icon: 'BuildingStorefrontIcon',
      value: '50,000+',
      label: {
        en: 'Verified Suppliers',
        fr: 'Fournisseurs vérifiés'
      }
    },
    {
      icon: 'ShoppingBagIcon',
      value: '2M+',
      label: {
        en: 'Products Listed',
        fr: 'Produits répertoriés'
      }
    },
    {
      icon: 'UserGroupIcon',
      value: '500K+',
      label: {
        en: 'Active Buyers',
        fr: 'Acheteurs actifs'
      }
    },
    {
      icon: 'CheckBadgeIcon',
      value: '99.8%',
      label: {
        en: 'Success Rate',
        fr: 'Taux de réussite'
      }
    }],


    categories: [
    {
      id: 1,
      slug: 'electronics',
      image: "https://images.unsplash.com/photo-1622625375705-7a2a61819cbf",
      alt: 'Modern electronic devices including smartphones and tablets on white surface',
      name: {
        en: 'Electronics',
        fr: 'Électronique'
      },
      productCount: 45230
    },
    {
      id: 2,
      slug: 'industrial',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_167d7cfd4-1764659144088.png",
      alt: 'Industrial machinery and manufacturing equipment in factory setting',
      name: {
        en: 'Industrial Equipment',
        fr: 'Équipement industriel'
      },
      productCount: 32150
    },
    {
      id: 3,
      slug: 'office',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b825184b-1765123476358.png",
      alt: 'Organized office desk with computer, stationery and supplies',
      name: {
        en: 'Office Supplies',
        fr: 'Fournitures de bureau'
      },
      productCount: 28940
    },
    {
      id: 4,
      slug: 'furniture',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_14316be1a-1764793771309.png",
      alt: 'Modern minimalist furniture in contemporary office space',
      name: {
        en: 'Furniture',
        fr: 'Meubles'
      },
      productCount: 19870
    },
    {
      id: 5,
      slug: 'safety',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_175d0358f-1764915506433.png",
      alt: 'Safety equipment including hard hats and protective gear',
      name: {
        en: 'Safety Equipment',
        fr: 'Équipement de sécurité'
      },
      productCount: 15620
    },
    {
      id: 6,
      slug: 'packaging',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_151023a74-1764700093180.png",
      alt: 'Various packaging materials and shipping boxes stacked neatly',
      name: {
        en: 'Packaging',
        fr: 'Emballage'
      },
      productCount: 12340
    },
    {
      id: 7,
      slug: 'textiles',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1576b21ed-1765123192311.png",
      alt: 'Colorful textile fabrics and materials arranged in rolls',
      name: {
        en: 'Textiles',
        fr: 'Textiles'
      },
      productCount: 21560
    },
    {
      id: 8,
      slug: 'automotive',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f203749f-1765038361202.png",
      alt: 'Automotive parts and components displayed on workbench',
      name: {
        en: 'Automotive Parts',
        fr: 'Pièces automobiles'
      },
      productCount: 18790
    }],


    featuredProducts: [
    {
      id: 1,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_12a4d5808-1764677183408.png",
      alt: 'Professional wireless headphones with noise cancellation in black color',
      name: {
        en: 'Wireless Noise-Cancelling Headphones',
        fr: 'Casque sans fil à réduction de bruit'
      },
      price: 89.99,
      originalPrice: 129.99,
      currency: 'CAD',
      rating: 4.5,
      reviews: 1234,
      minOrder: '10 units',
      location: 'Toronto, CA',
      badge: {
        en: 'Hot Deal',
        fr: 'Offre spéciale'
      }
    },
    {
      id: 2,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b87d8618-1764752237339.png",
      alt: 'Ergonomic office chair with adjustable height and lumbar support',
      name: {
        en: 'Ergonomic Office Chair',
        fr: 'Chaise de bureau ergonomique'
      },
      price: 249.99,
      currency: 'CAD',
      rating: 4.8,
      reviews: 856,
      minOrder: '5 units',
      location: 'Montreal, CA'
    },
    {
      id: 3,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b5c9ef77-1764992372502.png",
      alt: 'Slim laptop computer with high-resolution display on wooden desk',
      name: {
        en: 'Business Laptop 15.6"',
        fr: 'Ordinateur portable professionnel 15,6"'
      },
      price: 899.99,
      originalPrice: 1099.99,
      currency: 'CAD',
      rating: 4.6,
      reviews: 2341,
      minOrder: '3 units',
      location: 'Vancouver, CA',
      badge: {
        en: 'Best Seller',
        fr: 'Meilleure vente'
      }
    },
    {
      id: 4,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a3b77717-1765261313016.png",
      alt: 'Industrial LED lighting fixtures with energy-efficient design',
      name: {
        en: 'LED Industrial Lighting',
        fr: 'Éclairage industriel LED'
      },
      price: 159.99,
      currency: 'CAD',
      rating: 4.7,
      reviews: 567,
      minOrder: '20 units',
      location: 'Calgary, CA'
    },
    {
      id: 5,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a273412f-1765190456284.png",
      alt: 'Protective safety gloves for industrial work in bright orange',
      name: {
        en: 'Industrial Safety Gloves',
        fr: 'Gants de sécurité industriels'
      },
      price: 24.99,
      currency: 'CAD',
      rating: 4.4,
      reviews: 423,
      minOrder: '50 pairs',
      location: 'Ottawa, CA'
    },
    {
      id: 6,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_13a2cb6ec-1764668102442.png",
      alt: 'Organized desk organizer with multiple compartments for office supplies',
      name: {
        en: 'Desk Organizer Set',
        fr: 'Ensemble d\'organisateur de bureau'
      },
      price: 34.99,
      currency: 'CAD',
      rating: 4.3,
      reviews: 789,
      minOrder: '25 sets',
      location: 'Quebec City, CA'
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1525218019234-1a4f3fbe050d",
      alt: 'Durable cardboard shipping boxes in various sizes stacked together',
      name: {
        en: 'Shipping Boxes Bundle',
        fr: 'Lot de boîtes d\'expédition'
      },
      price: 49.99,
      currency: 'CAD',
      rating: 4.6,
      reviews: 1123,
      minOrder: '100 boxes',
      location: 'Winnipeg, CA'
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1604915523937-037ced0b1f60",
      alt: 'Professional business briefcase in black leather with metal clasps',
      name: {
        en: 'Professional Briefcase',
        fr: 'Mallette professionnelle'
      },
      price: 129.99,
      originalPrice: 179.99,
      currency: 'CAD',
      rating: 4.5,
      reviews: 634,
      minOrder: '10 units',
      location: 'Halifax, CA',
      badge: {
        en: 'New Arrival',
        fr: 'Nouvelle arrivée'
      }
    }],


    trendingSuppliers: [
    {
      id: 1,
      name: 'TechGlobal Industries',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_15cb0303c-1764656703640.png",
      alt: 'Modern tech company logo with blue and white color scheme',
      location: 'Toronto, Canada',
      rating: 4.8,
      reviews: 2341,
      productCount: 1250,
      responseRate: 98,
      verified: true
    },
    {
      id: 2,
      name: 'Premier Office Solutions',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1da34a256-1764699059206.png",
      alt: 'Professional office supplies company logo in green and gray',
      location: 'Montreal, Canada',
      rating: 4.7,
      reviews: 1876,
      productCount: 890,
      responseRate: 95,
      verified: true
    },
    {
      id: 3,
      name: 'Industrial Supply Co.',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_178188a18-1764699062239.png",
      alt: 'Industrial equipment supplier logo with orange and black design',
      location: 'Vancouver, Canada',
      rating: 4.9,
      reviews: 3124,
      productCount: 2340,
      responseRate: 99,
      verified: true
    },
    {
      id: 4,
      name: 'SafeWork Equipment',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_124b5d685-1765261311951.png",
      alt: 'Safety equipment company logo with yellow and black warning colors',
      location: 'Calgary, Canada',
      rating: 4.6,
      reviews: 1567,
      productCount: 670,
      responseRate: 96,
      verified: true
    },
    {
      id: 5,
      name: 'PackPro Solutions',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1370e3e03-1764635327727.png",
      alt: 'Packaging solutions company logo with brown and green earth tones',
      location: 'Ottawa, Canada',
      rating: 4.5,
      reviews: 1234,
      productCount: 540,
      responseRate: 94,
      verified: true
    },
    {
      id: 6,
      name: 'FurniturePlus Wholesale',
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1bdafbe7d-1765261313501.png",
      alt: 'Furniture wholesale company logo with wood texture and modern design',
      location: 'Quebec City, Canada',
      rating: 4.7,
      reviews: 1890,
      productCount: 780,
      responseRate: 97,
      verified: true
    }],


    quickActions: [
    {
      icon: 'ClipboardDocumentListIcon',
      href: '/product-search-results',
      title: {
        en: 'Request Bulk Quotation',
        fr: 'Demander un devis en gros'
      },
      description: {
        en: 'Get competitive quotes from multiple verified suppliers instantly',
        fr: 'Obtenez des devis compétitifs de plusieurs fournisseurs vérifiés instantanément'
      }
    },
    {
      icon: 'CheckBadgeIcon',
      href: '/user-registration',
      title: {
        en: 'Become Verified Supplier',
        fr: 'Devenir fournisseur vérifié'
      },
      description: {
        en: 'Join our marketplace and reach thousands of potential buyers',
        fr: 'Rejoignez notre marché et atteignez des milliers d\'acheteurs potentiels'
      }
    },
    {
      icon: 'ChatBubbleLeftRightIcon',
      href: '/buyer-dashboard',
      title: {
        en: 'Live Chat Support',
        fr: 'Support par chat en direct'
      },
      description: {
        en: 'Connect with suppliers in real-time for instant answers',
        fr: 'Connectez-vous avec les fournisseurs en temps réel pour des réponses instantanées'
      }
    }]

  };

  return (
    <>
      <Header />
      <HomepageInteractive pageData={pageData} />
      <Footer />
    </>);

}