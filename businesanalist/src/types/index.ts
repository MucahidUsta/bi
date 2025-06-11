export interface Requirement {
  id: string;
  title: string;
  description: string;
  priority: 'Düşük' | 'Orta' | 'Yüksek' | 'Kritik';
  status: 'Taslak' | 'İnceleme' | 'Onaylandı' | 'Reddedildi';
  stakeholder: string;
  createdAt: Date;
}

export interface UserStory {
  id: string;
  title: string;
  asA: string;
  iWant: string;
  soThat: string;
  acceptanceCriteria: string[];
  priority: 'Düşük' | 'Orta' | 'Yüksek' | 'Kritik';
  estimatedEffort: string;
}

export interface ProcessStep {
  id: string;
  name: string;
  description: string;
  duration: string;
  responsible: string;
  inputs: string[];
  outputs: string[];
  issues?: string[];
}

export interface ProcessAnalysis {
  processName: string;
  currentSteps: ProcessStep[];
  inefficiencies: string[];
  recommendations: string[];
  expectedBenefits: string[];
}

export interface TestScenario {
  id: string;
  title: string;
  description: string;
  preconditions: string[];
  steps: string[];
  expectedResult: string;
  priority: 'Düşük' | 'Orta' | 'Yüksek' | 'Kritik';
}

export interface ProjectRisk {
  id: string;
  description: string;
  probability: 'Düşük' | 'Orta' | 'Yüksek';
  impact: 'Düşük' | 'Orta' | 'Yüksek';
  mitigation: string;
}

export interface DataAnalysisResult {
  summary: string;
  trends: string[];
  recommendations: string[];
  visualizations?: any[];
}