/**
 * Supabase Database TypeScript Definitions
 * 
 * NOTE: This file represents the strongly-typed TypeScript representation of the
 * Hackup Technology PostgreSQL schema (Migrations 20261029000001 & 20261029000002).
 * When migrations are applied to production, it can be synchronized using:
 * `npx supabase gen types typescript --project-id <project-id> > src/types/database.types.ts`
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type EnquiryStatus = 
  | 'NEW' 
  | 'CONTACTED' 
  | 'IN_SCOPING' 
  | 'PROPOSAL_SENT' 
  | 'WON' 
  | 'CLOSED';

export type TrainingMode = 
  | 'COIMBATORE_LAB' 
  | 'LIVE_ONLINE' 
  | 'HYBRID' 
  | 'CAMPUS_WORKSHOP';

export type CertificateStatus = 
  | 'ACTIVE' 
  | 'REVOKED' 
  | 'EXPIRED';

export type CertificateCategory = 
  | 'STUDENT_TRAINING' 
  | 'INDUSTRIAL_INTERNSHIP' 
  | 'SAFE_TO_HOST_VAPT' 
  | 'FACULTY_DEVELOPMENT';

export type AdminRole = 
  | 'SUPER_ADMIN' 
  | 'ADMIN' 
  | 'AUDITOR' 
  | 'INSTRUCTOR';

export interface Database {
  public: {
    Tables: {
      api_rate_limits: {
        Row: {
          id: string;
          key: string;
          request_count: number;
          reset_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          request_count?: number;
          reset_at: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['api_rate_limits']['Insert']>;
        Relationships: [];
      };
      admin_profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: AdminRole;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role?: AdminRole;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['admin_profiles']['Insert']>;
        Relationships: [];
      };
      service_enquiries: {
        Row: {
          id: string;
          enquiry_code: string;
          source_page: string;
          company_name: string | null;
          contact_name: string;
          work_email: string;
          phone_number: string;
          service_interest: string;
          compliance_goal: string | null;
          target_scope: string | null;
          testing_window: string | null;
          requires_nda: boolean;
          message: string | null;
          status: EnquiryStatus;
          assigned_to: string | null;
          internal_notes: string | null;
          ip_address: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          enquiry_code?: string;
          source_page: string;
          company_name?: string | null;
          contact_name: string;
          work_email: string;
          phone_number: string;
          service_interest: string;
          compliance_goal?: string | null;
          target_scope?: string | null;
          testing_window?: string | null;
          requires_nda?: boolean;
          message?: string | null;
          status?: EnquiryStatus;
          assigned_to?: string | null;
          internal_notes?: string | null;
          ip_address?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['service_enquiries']['Insert']>;
        Relationships: [];
      };
      training_programs: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category: string;
          duration: string;
          level: string;
          is_published: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          category: string;
          duration: string;
          level: string;
          is_published?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['training_programs']['Insert']>;
        Relationships: [];
      };
      training_batches: {
        Row: {
          id: string;
          program_id: string;
          batch_name: string;
          start_date: string;
          mode: TrainingMode;
          seats_total: number;
          seats_available: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          program_id: string;
          batch_name: string;
          start_date: string;
          mode: TrainingMode;
          seats_total?: number;
          seats_available?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['training_batches']['Insert']>;
        Relationships: [];
      };
      training_registrations: {
        Row: {
          id: string;
          registration_code: string;
          candidate_name: string;
          whatsapp_number: string;
          email: string | null;
          college_or_company: string | null;
          program_title: string;
          preferred_mode: TrainingMode;
          status: EnquiryStatus;
          assigned_to: string | null;
          internal_notes: string | null;
          ip_address: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          registration_code?: string;
          candidate_name: string;
          whatsapp_number: string;
          email?: string | null;
          college_or_company?: string | null;
          program_title: string;
          preferred_mode: TrainingMode;
          status?: EnquiryStatus;
          assigned_to?: string | null;
          internal_notes?: string | null;
          ip_address?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['training_registrations']['Insert']>;
        Relationships: [];
      };
      certificates: {
        Row: {
          id: string;
          certificate_id: string;
          category: CertificateCategory;
          recipient_name: string;
          course_or_scope_title: string;
          institution_or_company: string | null;
          issue_date: string;
          expiry_date: string | null;
          grade_or_score: string | null;
          verification_hash: string;
          status: CertificateStatus;
          revocation_reason: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          certificate_id: string;
          category: CertificateCategory;
          recipient_name: string;
          course_or_scope_title: string;
          institution_or_company?: string | null;
          issue_date: string;
          expiry_date?: string | null;
          grade_or_score?: string | null;
          verification_hash: string;
          status?: CertificateStatus;
          revocation_reason?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['certificates']['Insert']>;
        Relationships: [];
      };
      audit_logs: {
        Row: {
          id: string;
          admin_id: string | null;
          action: string;
          entity_type: string;
          entity_id: string | null;
          details: Json | null;
          ip_address: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          admin_id?: string | null;
          action: string;
          entity_type: string;
          entity_id?: string | null;
          details?: Json | null;
          ip_address?: string | null;
          created_at?: string;
        };
        Update: never; // Audit logs are immutable
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      verify_certificate_public: {
        Args: {
          p_certificate_id: string;
        };
        Returns: {
          certificate_id: string;
          category: CertificateCategory;
          recipient_name: string;
          course_or_scope_title: string;
          institution_or_company: string | null;
          issue_date: string;
          expiry_date: string | null;
          status: CertificateStatus;
          verification_hash: string;
        }[];
      };
      check_and_increment_rate_limit: {
        Args: {
          p_key: string;
          p_limit: number;
          p_window_seconds: number;
        };
        Returns: {
          allowed: boolean;
          remaining: number;
          reset_at: string;
        }[];
      };
    };
    Enums: {
      enquiry_status: EnquiryStatus;
      training_mode: TrainingMode;
      certificate_status: CertificateStatus;
      certificate_category: CertificateCategory;
      admin_role: AdminRole;
    };
  };
}
