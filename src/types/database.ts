export interface PlanTier {
  id: string
  name: string
  user_limit: number
  client_limit: number
  custom_subdomain: boolean
  accent_color: boolean
  full_brand_kit: boolean
  custom_font: boolean
  notifications: boolean
  monthly_price: number
}

export interface Agency {
  id: string
  plan_tier_id: string | null
  name: string
  subdomain: string
  logo_url: string | null
  brand_primary_color: string | null
  brand_accent_color: string | null
  brand_background_color: string | null
  brand_text_color: string | null
  brand_font_url: string | null
  created_at: string
}

export interface AgencyUser {
  id: string
  agency_id: string
  auth_user_id: string | null
  name: string
  email: string
  role: 'owner' | 'staff'
  created_at: string
}

export interface Client {
  id: string
  agency_id: string
  auth_user_id: string | null
  name: string
  contact_name: string | null
  contact_email: string | null
  phone: string | null
  invite_status: 'pending' | 'accepted'
  services: string | null
  retainer_value: number | null
  contract_start_date: string | null
  campaign_goals: string | null
  internal_notes: string | null
  invited_at: string | null
  created_at: string
}

export interface DriveFolder {
  id: string
  client_id: string
  folder_name: string
  drive_folder_id: string
  folder_type: 'assets' | 'reports' | 'deliverables'
  created_at: string
}

export interface ReportEmbed {
  id: string
  client_id: string
  embed_url: string
  label: string | null
  updated_at: string
}

export interface Notification {
  id: string
  client_id: string | null
  agency_id: string | null
  type: 'file_uploaded' | 'report_ready' | 'invite_sent'
  message: string
  is_read: boolean
  created_at: string
}
