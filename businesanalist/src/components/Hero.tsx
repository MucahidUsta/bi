import React from 'react';
import { Lightbulb, Users, TrendingUp, FileText, CheckSquare, GitBranch, Calendar, Database } from 'lucide-react';

const Hero: React.FC = () => {
  const features = [
    { icon: FileText, title: 'Gereksinim Analizi', desc: 'Kullanıcı hikayeleri ve gereksinim dokümanları' },
    { icon: GitBranch, title: 'Süreç Analizi', desc: 'İş süreçlerini optimize edin' },
    { icon: Database, title: 'Veri Analizi', desc: 'Trendleri keşfedin ve raporlar oluşturun' },
    { icon: Lightbulb, title: 'Çözüm Önerileri', desc: 'Akıllı çözüm tavsiyeleri' },
    { icon: CheckSquare, title: 'Test Senaryoları', desc: 'Kapsamlı test planları' },
    { icon: Calendar, title: 'Proje Planlama', desc: 'Risk analizi ve planlama' },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            İş Analizi Süreçlerinizi 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Hızlandırın</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Yapay zeka destekli iş analisti asistanı ile gereksinim analizi, süreç optimizasyonu, 
            veri analizi ve çözüm geliştirme süreçlerinizi otomatikleştirin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                </div>
              </div>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="text-gray-700 font-medium">Paydaşlarınızla Etkili İletişim Kurun</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;