import React, { useState } from 'react';
import { Calendar, AlertTriangle, TrendingUp, Users, Clock, Target } from 'lucide-react';
import { ProjectRisk } from '../types';

interface ProjectPlan {
  name: string;
  duration: string;
  phases: {
    name: string;
    duration: string;
    tasks: string[];
    deliverables: string[];
  }[];
  resources: string[];
  risks: ProjectRisk[];
  milestones: {
    name: string;
    date: string;
    description: string;
  }[];
}

const ProjectPlanning: React.FC = () => {
  const [projectInput, setProjectInput] = useState('');
  const [projectPlan, setProjectPlan] = useState<ProjectPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateProjectPlan = async () => {
    if (!projectInput.trim()) return;
    
    setIsGenerating(true);
    
    // Simulated AI project planning
    setTimeout(() => {
      const mockPlan: ProjectPlan = {
        name: 'Müşteri Yönetim Sistemi',
        duration: '6 ay',
        phases: [
          {
            name: 'Analiz ve Tasarım',
            duration: '6 hafta',
            tasks: [
              'Gereksinim analizi',
              'Sistem tasarımı',
              'Veritabanı tasarımı',
              'UI/UX tasarımı'
            ],
            deliverables: [
              'Gereksinim dokümanı',
              'Sistem tasarım dokümanı',
              'Prototip'
            ]
          },
          {
            name: 'Geliştirme',
            duration: '12 hafta',
            tasks: [
              'Backend geliştirme',
              'Frontend geliştirme',
              'Veritabanı kurulumu',
              'API entegrasyonu'
            ],
            deliverables: [
              'MVP sistem',
              'Teknik dokümantasyon',
              'Test veritabanı'
            ]
          },
          {
            name: 'Test ve Dağıtım',
            duration: '6 hafta',
            tasks: [
              'Birim testleri',
              'Entegrasyon testleri',
              'Kullanıcı kabul testleri',
              'Canlı ortama dağıtım'
            ],
            deliverables: [
              'Test raporu',
              'Canlı sistem',
              'Kullanım kılavuzu'
            ]
          }
        ],
        resources: [
          'Proje Yöneticisi (1 kişi)',
          'Backend Developer (2 kişi)',
          'Frontend Developer (2 kişi)',
          'UI/UX Designer (1 kişi)',
          'Test Uzmanı (1 kişi)'
        ],
        risks: [
          {
            id: '1',
            description: 'Gereksinim değişiklikleri',
            probability: 'Yüksek',
            impact: 'Orta',
            mitigation: 'Agile metodoloji kullanarak esnek planlama yapılmalı'
          },
          {
            id: '2',
            description: 'Teknik zorluklar',
            probability: 'Orta',
            impact: 'Yüksek',
            mitigation: 'Proof of concept çalışmaları yapılmalı'
          },
          {
            id: '3',
            description: 'Kaynak yetersizliği',
            probability: 'Düşük',
            impact: 'Yüksek',
            mitigation: 'Alternatif kaynak planları hazırlanmalı'
          }
        ],
        milestones: [
          {
            name: 'Gereksinim Onayı',
            date: '2024-02-15',
            description: 'Tüm gereksinimler paydaşlar tarafından onaylanır'
          },
          {
            name: 'MVP Tamamlanması',
            date: '2024-05-01',
            description: 'Minimum viable product hazır olur'
          },
          {
            name: 'Canlıya Geçiş',
            date: '2024-06-15',
            description: 'Sistem canlı ortamda kullanıma açılır'
          }
        ]
      };

      setProjectPlan(mockPlan);
      setIsGenerating(false);
    }, 3000);
  };

  const getRiskColor = (probability: string, impact: string) => {
    if ((probability === 'Yüksek' && impact === 'Yüksek') || 
        (probability === 'Yüksek' && impact === 'Orta') ||
        (probability === 'Orta' && impact === 'Yüksek')) {
      return 'bg-red-100 border-red-300 text-red-800';
    } else if (probability === 'Orta' || impact === 'Orta') {
      return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    } else {
      return 'bg-green-100 border-green-300 text-green-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Proje Planlama</h3>
          <p className="text-gray-600">Projeleriniz için detaylı plan ve risk analizi oluşturun</p>
        </div>
      </div>

      {!projectPlan ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proje Açıklaması
            </label>
            <textarea
              value={projectInput}
              onChange={(e) => setProjectInput(e.target.value)}
              placeholder="Planlamak istediğiniz projeyi detaylı olarak açıklayın. Projenin amacı, kapsamı, beklenen süre ve kaynak ihtiyaçlarını belirtin..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>
          <button
            onClick={generateProjectPlan}
            disabled={!projectInput.trim() || isGenerating}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Proje Planı Oluşturuluyor...</span>
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4" />
                <span>Proje Planı Oluştur</span>
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Project Overview */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">{projectPlan.name}</h4>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Süre: {projectPlan.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>{projectPlan.phases.length} Faz</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>{projectPlan.resources.length} Kaynak</span>
              </div>
            </div>
          </div>

          {/* Project Phases */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5 text-indigo-500" />
              <span>Proje Fazları</span>
            </h4>
            <div className="space-y-4">
              {projectPlan.phases.map((phase, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-gray-900">{phase.name}</h5>
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {phase.duration}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-sm font-medium text-gray-700 mb-2">Görevler:</h6>
                      <ul className="space-y-1">
                        {phase.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-sm font-medium text-gray-700 mb-2">Çıktılar:</h6>
                      <ul className="space-y-1">
                        {phase.deliverables.map((deliverable, delIndex) => (
                          <li key={delIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span>İhtiyaç Duyulan Kaynaklar</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projectPlan.resources.map((resource, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-blue-800 text-sm">{resource}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Risks */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span>Risk Analizi</span>
            </h4>
            <div className="space-y-3">
              {projectPlan.risks.map((risk) => (
                <div key={risk.id} className={`border rounded-lg p-4 ${getRiskColor(risk.probability, risk.impact)}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium">{risk.description}</h5>
                    <div className="flex space-x-2 text-xs">
                      <span className="bg-white bg-opacity-50 px-2 py-1 rounded">
                        Olasılık: {risk.probability}
                      </span>
                      <span className="bg-white bg-opacity-50 px-2 py-1 rounded">
                        Etki: {risk.impact}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm">
                    <strong>Önlem:</strong> {risk.mitigation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span>Kilometre Taşları</span>
            </h4>
            <div className="space-y-3">
              {projectPlan.milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white text-xs font-bold rounded-full flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-medium text-green-900">{milestone.name}</h5>
                      <span className="text-sm text-green-700">{milestone.date}</span>
                    </div>
                    <p className="text-sm text-green-800">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                setProjectPlan(null);
                setProjectInput('');
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Yeni Plan
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Proje Planını İndir
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Gantt Çizelgesi Oluştur
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPlanning;