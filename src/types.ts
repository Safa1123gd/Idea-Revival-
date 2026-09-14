export type Stage = 'concept' | 'revived' | 'teamed_up' | 'building' | 'live';

export type Category =
  | 'Education'
  | 'Environment'
  | 'Agriculture'
  | 'Technology'
  | 'Health'
  | 'Business'
  | 'Community'
  | 'Sustainability'
  | 'Productivity'
  | 'Other';

export type Difficulty = 'Beginner' | 'Moderate' | 'Advanced';

export type Visibility = 'Public' | 'Protected Preview' | 'Private';

export interface Persona {
  id: 'elena' | 'ayan';
  name: string;
  role: string;
  badge: string;
  avatar: string;
  bio: string;
  skills: string[];
  location: string;
  submittedCount: number;
  adoptedCount: number;
}

export interface RevivalScoreBreakdown {
  problemImportance: number; // 25%
  feasibility: number; // 20%
  innovation: number; // 20%
  potentialImpact: number; // 20%
  resourceRequirements: number; // 15%
  totalScore: number;
  assessmentNotice: string;
}

export interface MilestoneUpdate {
  id: string;
  stage: Stage;
  title: string;
  notes: string;
  author: string;
  authorRole: string;
  timestamp: string;
}

export interface AdoptionRequest {
  id: string;
  ideaId: string;
  applicantId: string;
  applicantName: string;
  applicantRole: string;
  applicantAvatar: string;
  proposal: string;
  skillsOffered: string[];
  weeklyCommitmentHours: number;
  portfolioUrl?: string;
  status: 'pending' | 'accepted' | 'declined';
  submittedAt: string;
}

export interface IdeaCollaborator {
  id: string;
  name: string;
  role: string;
  avatar: string;
  joinedDate: string;
  weeklyHours?: number;
}

export interface Idea {
  id: string; // e.g. "IR-000127"
  title: string;
  tagline: string;
  category: Category;
  problemStatement: string;
  proposedMechanism: string;
  impactProjection: string;
  stage: Stage;
  difficulty: Difficulty;
  visibility: Visibility;
  skillsNeeded: string[];
  resourcesNeeded: string[];
  creatorId: string;
  creatorName: string;
  creatorRole: string;
  creatorAvatar: string;
  submittedDate: string;
  viewsCount: number;
  revivalScore: RevivalScoreBreakdown;
  adopters: IdeaCollaborator[];
  milestones: MilestoneUpdate[];
  adoptionRequests: AdoptionRequest[];
  collaborationPreferences: string;
  ipNotice: string;
}

export interface Challenge {
  id: string;
  title: string;
  organizer: string;
  organizerType: 'University' | 'Foundation' | 'Corporate Sponsor' | 'NGO';
  organizerLogo: string;
  tagline: string;
  description: string;
  category: Category;
  prizeOrGrant: string;
  deadline: string;
  ideasCount: number;
  targetOutcomes: string[];
  featured: boolean;
}

export interface SustainabilityTier {
  id: string;
  name: string;
  price: string;
  billingPeriod: string;
  description: string;
  targetAudience: string;
  features: string[];
  ctaLabel: string;
  isPopular?: boolean;
}
