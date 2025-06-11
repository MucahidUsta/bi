import React, { useState } from 'react';
import { Lightbulb, Code, Settings, Users, CheckCircle, ArrowRight } from 'lucide-react';

interface Solution {
  id: string;
  title: string;
  description: string;
  category: 'Süreç' | 'Teknoloji' | 'İnsan Kaynağı' | 'Sistem';
  difficulty: 'Düşük' | 'Orta' | 'Yüksek';
  timeframe: string;
  benefits: string[];
  technicalSpecs?: string[];
}

const SolutionSuggestions: React.FC = () => {
  const [problemInput, setProblemInput] = useState('');
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);

  const generateSolutions = async () => {
    if (!problemInput.trim()) return;
    
    setIsGenerating(true);
    
    // Simulated AI solution generation
    setTimeout(() => {
      const mockSolutions: Solution[] = [
        {
          id: '1',
          title: 'Süreç Otomasyonu Sistemi',
          description: 'Manuel süreçleri otomatikleştirerek verimliliği artıran workflow sistemi',
          category: 'Teknoloji',
          difficulty: 'Orta',
          timeframe: '3-6 ay',
          benefits: [
            'İşlem süresinde %60 azalma',
            'Hata oranında %80 düşüş',
            'İnsan kaynağı tasarrufu',
            'Gerçek zamanlı izleme'
          ],
          technicalSpecs: [
            'REST API entegrasyonu',
            'Workflow engine (Apache Airflow)',
            'PostgreSQL veritabanı',
            'React.js frontend'
          ]
        },
        {
          id: '2',
          title: 'Çalışan Eğitim Programı',
          description: 'Süreç verimliliğini artırmak için kapsamlı eğitim ve gelişim programı',
          category: 'İnsan Kaynağı',
          difficulty: 'Düşük',
          timeframe: '2-3 ay',
          benefits: [
            'Personel yetkinliklerinde artış',
            'İş memnuniyetinde iyileşme',
            'Hata oranında azalma',
            'Takım çalışmasında güçlenme'
          ]
        },
        {
          id: '3',
          title: 'Veri Analizi Dashboard\'u',
          description: 'Karar vermeyi destekleyen gerçek zamanlı veri görselleştirme sistemi',
          category: 'Sistem',
          difficulty: 'Yüksek',
          timeframe: '4-8 ay',
          benefits: [
            'Veri odaklı karar verme',
            'Trendlerin erken tespiti',
            'Performans izleme',
            'Raporlama otomasyonu'
          ],
          technicalSpecs: [
            'Power BI / Tableau entegrasyonu',
            'ETL süreçleri',
            'Real-time data streaming',
            'Mobile responsive design'
          ]
        }
      ];

      setSolutions(mockSolutions);
      setIsGenerating(false);
    }, 2500);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Teknoloji': return 'bg-blue-100 text-blue-800';
      case 'Süreç': return 'bg-green-100 text-green-800';
      case 'İnsan Kaynağı': return 'bg-purple-100 text-purple-800';
      case 'Sistem': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Düşük': return 'text-green-600';
      case 'Orta': return 'text-yellow-600';
      case 'Yüksek': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Çözüm Önerileri</h3>
          <p className="text-gray-600">İş ihtiyaçlarınıza özel çözüm önerileri alın</p>
        </div>
      </div>

      {!selectedSolution ? (
        <div className="space-y-6">
          {solutions.length === 0 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İş Problemi veya İhtiyacı
                </label>
                <textarea
                  value={problemInput}
                  onChange={(e) => setProblemInput(e.target.value)}
                  placeholder="Çözmek istediğiniz iş problemini veya ihtiyacını detaylı olarak açıklayın. Örnek: 'Manuel faturalandırma sürecimiz çok zaman alıyor ve hata oranı yüksek...'"
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                />
              </div>
              <button
                onClick={generateSolutions}
                disabled={!problemInput.trim() || isGenerating}
                className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Çözümler Üretiliyor...</span>
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-4 h-4" />
                    <span>Çözüm Önerileri Oluştur</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>{solutions.length} çözüm önerisi</strong> oluşturuldu. Her bir çözümü inceleyerek en uygun olanı seçebilirsiniz.
                </p>
              </div>

              {solutions.map((solution) => (
                <div key={solution.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{solution.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(solution.category)}`}>
                          {solution.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{solution.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Settings className="w-4 h-4" />
                          <span>Zorluk: <span className={getDifficultyColor(solution.difficulty)}>{solution.difficulty}</span></span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ArrowRight className="w-4 h-4" />
                          <span>Süre: {solution.timeframe}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h5 className="font-medium text-gray-900 mb-2">Beklenen Faydalar:</h5>
                        <div className="space-y-1">
                          {solution.benefits.slice(0, 3).map((benefit, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                          {solution.benefits.length > 3 && (
                            <span className="text-sm text-gray-500">
                              +{solution.benefits.length - 3} fayda daha...
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      {solution.category === 'Teknoloji' && <Code className="w-4 h-4" />}
                      {solution.category === 'İnsan Kaynağı' && <Users className="w-4 h-4" />}
                      {solution.category === 'Sistem' && <Settings className="w-4 h-4" />}
                      <span>{solution.category} Çözümü</span>
                    </div>
                    <button
                      onClick={() => setSelectedSolution(solution)}
                      className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                    >
                      Detayları Görüntüle
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setSolutions([]);
                    setProblemInput('');
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Yeni Analiz
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Solution Detail */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-semibold text-gray-900">{selectedSolution.title}</h4>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedSolution.category)}`}>
                {selectedSolution.category}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{selectedSolution.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-900">Zorluk Seviyesi: </span>
                <span className={getDifficultyColor(selectedSolution.difficulty)}>
                  {selectedSolution.difficulty}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Tahmini Süre: </span>
                <span className="text-gray-700">{selectedSolution.timeframe}</span>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h5 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Beklenen Faydalar</span>
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedSolution.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-green-800 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications */}
          {selectedSolution.technicalSpecs && (
            <div>
              <h5 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Code className="w-5 h-5 text-blue-500" />
                <span>Teknik Özellikler</span>
              </h5>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2">
                  {selectedSolution.technicalSpecs.map((spec, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setSelectedSolution(null)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              ← Diğer Çözümler
            </button>
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
              Teknik Döküman İndir
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Proje Planı Oluştur
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolutionSuggestions;