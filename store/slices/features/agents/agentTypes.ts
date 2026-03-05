/* ================= AGENT TYPE ================= */

export interface Agent {
  agent_id: number;
  name: string;
  agency_name: string;
  email: string;
  phone: string;
  status: number;
  whatsapp_number: string;
  experience_years: number | null;
  rating: string | null;
  address: string;
  languages_spoken: string | null;
  office_address: string | null;
  latitude: string | null;
  longitude: string | null;
  min_ranking: number;
  sponsorship_status: number;
  image_urls: string[];
}

/* ================= API RESPONSE ================= */

export interface AgentsApiResponse {
  success: boolean;
  message: string;
  data: {
    data: Agent[];
  };
}

/* ================= STATE ================= */

export interface AgentState {
  agents: Agent[];
  loading: boolean;
  error: string | null;
}