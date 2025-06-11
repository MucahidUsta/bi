import React, { useState } from 'react';
import { FileText, Plus, CheckCircle, AlertCircle, Clock, User } from 'lucide-react';
import { Requirement, UserStory } from '../types';

const RequirementAnalysis: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [userStories, setUserStories] = useState<UserStory[]>([]);
  const [activeTab, setActiveTab] = useState<'input' | 'requirements' | 'stories'>('input');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeRequirements = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulated AI analysis
    setTimeout(() => {
      // Mock requirement extraction
      const mockRequirements: Requirement[] = [
        {
          id: '1',
          title: 'Kullanıcı Giriş Sistemi',
          description: 'Sistem, kullanıcıların güvenli bir şekilde giriş yapabilmelerini sağlamalıdır.',
          priority: 'Yüksek',
          status: 'Taslak',
          stakeholder: 'İT Müdürü',
          createdAt: new Date()
        },
        {
          id: '2',
          title: 'Raporlama Modülü',
          description: 'Kullanıcılar detaylı raporlar oluşturabilmeli ve dışa aktarabilmelidir.',
          priority: 'Orta',
          status: 'Taslak',
          stakeholder: 'İş Analisti',
          createdAt: new Date()
        }
      ];

      const mockUserStories: UserStory[] = [
        {
          id: '1',
          title: 'Kullanıcı olarak güvenli giriş yapabilmek istiyorum',
          asA: 'Sistem kullanıcısı',
          iWant: 'Güvenli bir şekilde sisteme giriş yapmak',
          soThat: 'Verilerime güvenli bir şekilde erişebilirim',
          acceptanceCriteria: [
            'Kullanıcı adı ve şifre ile giriş yapabilmeli',
            'Hatalı giriş durumunda uygun hata mesajı gösterilmeli',
            'Başarılı giriş sonrası ana sayfaya yönlendirilmeli'
          ],
          priority: 'Yüksek',
          estimatedEffort: '5 gün'
        }
      ];

      setRequirements(mockRequirements);
      setUserStories(mockUserStories);
      setIsAnalyzing(false);
      setActiveTab('requirements');
    }, 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Kritik': return 'text-red-600 bg-red-100';
      case 'Yüksek': return 'text-orange-600 bg-orange-100';
      case 'Orta': return 'text-yellow-600 bg-yellow-100';
      case 'Düşük': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Onaylandı': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'İnceleme': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Reddedildi': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Gereksinim Analizi</h3>
          <p className="text-gray-600">Paydaş girdilerini analiz edin ve gereksinimleri çıkarın</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('input')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'input' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Girdi Metni
        </button>
        <button
          onClick={() => setActiveTab('requirements')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'requirements' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Gereksinimler ({requirements.length})
        </button>
        <button
          onClick={() => setActiveTab('stories')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'stories' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Kullanıcı Hikayeleri ({userStories.length})
        </button>
      </div>

      {/* Input Tab */}
      {activeTab === 'input' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paydaş Girdileri ve İhtiyaçlar
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paydaşlardan gelen ihtiyaçları, istekleri ve açıklamaları buraya yazın. Örnek: 'Müşterilerimiz sisteme daha hızlı giriş yapmak istiyorlar ve raporları Excel formatında indirmek istiyorlar...'"
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
          <button
            onClick={analyzeRequirements}
            disabled={!inputText.trim() || isAnalyzing}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Analiz Ediliyor...</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Gereksinimleri Analiz Et</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Requirements Tab */}
      {activeTab === 'requirements' && (
        <div className="space-y-4">
          {requirements.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Henüz analiz edilmiş gereksinim bulunmuyor.</p>
              <p className="text-sm">Girdi metni sekmesinden analiz başlatın.</p>
            </div>
          ) : (
            requirements.map((req) => (
              <div key={req.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(req.status)}
                    <div>
                      <h4 className="font-semibold text-gray-900">{req.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{req.description}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(req.priority)}`}>
                    {req.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{req.stakeholder}</span>
                  </div>
                  <span>{req.createdAt.toLocaleDateString('tr-TR')}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* User Stories Tab */}
      {activeTab === 'stories' && (
        <div className="space-y-4">
          {userStories.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Henüz kullanıcı hikayesi bulunmuyor.</p>
              <p className="text-sm">Girdi metni sekmesinden analiz başlatın.</p>
            </div>
          ) : (
            userStories.map((story) => (
              <div key={story.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{story.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(story.priority)}`}>
                    {story.priority}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Kullanıcı olarak:</strong> {story.asA}</p>
                  <p><strong>İstiyorum ki:</strong> {story.iWant}</p>
                  <p><strong>Böylece:</strong> {story.soThat}</p>
                </div>
                <div className="mt-3">
                  <h5 className="font-medium text-gray-900 mb-2">Kabul Kriterleri:</h5>
                  <ul className="space-y-1">
                    {story.acceptanceCriteria.map((criterion, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 text-sm text-gray-500">
                  <span>Tahmini Süre: {story.estimatedEffort}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default RequirementAnalysis;