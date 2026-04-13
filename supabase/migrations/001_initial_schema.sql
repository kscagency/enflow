-- Plan tiers
CREATE TABLE plan_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  user_limit int NOT NULL,
  client_limit int NOT NULL,
  custom_subdomain boolean DEFAULT false,
  accent_color boolean DEFAULT false,
  full_brand_kit boolean DEFAULT false,
  custom_font boolean DEFAULT false,
  notifications boolean DEFAULT false,
  monthly_price decimal NOT NULL
);

-- Agencies
CREATE TABLE agencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_tier_id uuid REFERENCES plan_tiers(id),
  name text NOT NULL,
  subdomain text UNIQUE NOT NULL,
  logo_url text,
  brand_primary_color text DEFAULT '#0A7B7B',
  brand_accent_color text,
  brand_background_color text,
  brand_text_color text,
  brand_font_url text,
  created_at timestamptz DEFAULT now()
);

-- Agency users
CREATE TABLE agency_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id uuid REFERENCES agencies(id) NOT NULL,
  auth_user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  email text NOT NULL,
  role text NOT NULL DEFAULT 'staff' CHECK (role IN ('owner', 'staff')),
  created_at timestamptz DEFAULT now()
);

-- Clients
CREATE TABLE clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id uuid REFERENCES agencies(id) NOT NULL,
  auth_user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  contact_name text,
  contact_email text,
  phone text,
  invite_status text DEFAULT 'pending' CHECK (invite_status IN ('pending', 'accepted')),
  services text,
  retainer_value decimal,
  contract_start_date date,
  campaign_goals text,
  internal_notes text,
  invited_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Drive folders
CREATE TABLE drive_folders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) NOT NULL,
  folder_name text NOT NULL,
  drive_folder_id text NOT NULL,
  folder_type text NOT NULL CHECK (folder_type IN ('assets', 'reports', 'deliverables')),
  created_at timestamptz DEFAULT now()
);

-- Report embeds
CREATE TABLE report_embeds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) NOT NULL,
  embed_url text NOT NULL,
  label text,
  updated_at timestamptz DEFAULT now()
);

-- Notifications
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  agency_id uuid REFERENCES agencies(id),
  type text NOT NULL CHECK (type IN ('file_uploaded', 'report_ready', 'invite_sent')),
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Row Level Security
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "agency_users_own_agency" ON agencies
  FOR ALL USING (
    id IN (SELECT agency_id FROM agency_users WHERE auth_user_id = auth.uid())
  );

ALTER TABLE agency_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "agency_users_own_records" ON agency_users
  FOR ALL USING (
    agency_id IN (SELECT agency_id FROM agency_users WHERE auth_user_id = auth.uid())
  );

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "clients_scoped_by_agency" ON clients
  FOR ALL USING (
    agency_id IN (SELECT agency_id FROM agency_users WHERE auth_user_id = auth.uid())
  );

ALTER TABLE drive_folders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "drive_folders_scoped_by_agency" ON drive_folders
  FOR ALL USING (
    client_id IN (
      SELECT id FROM clients
      WHERE agency_id IN (SELECT agency_id FROM agency_users WHERE auth_user_id = auth.uid())
    )
  );

ALTER TABLE report_embeds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "report_embeds_scoped_by_agency" ON report_embeds
  FOR ALL USING (
    client_id IN (
      SELECT id FROM clients
      WHERE agency_id IN (SELECT agency_id FROM agency_users WHERE auth_user_id = auth.uid())
    )
  );

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notifications_scoped_by_agency" ON notifications
  FOR ALL USING (
    agency_id IN (SELECT agency_id FROM agency_users WHERE auth_user_id = auth.uid())
  );

-- Seed: Plan tiers
INSERT INTO plan_tiers (name, user_limit, client_limit, custom_subdomain, accent_color, full_brand_kit, custom_font, notifications, monthly_price)
VALUES
  ('Starter', 1, 3, false, false, false, false, false, 49.00),
  ('Growth', 5, 10, true, true, false, false, true, 149.00),
  ('Pro', 25, 100, true, true, true, true, true, 349.00);
