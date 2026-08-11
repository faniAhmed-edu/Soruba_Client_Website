import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type BlogRow = {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  content: string[];
  image_url: string | null;
  tags: string[];
  author: string;
  created_at: string;
  updated_at: string;
};

export type ChatHistoryRow = {
  id: string;
  question: string;
  answer: string | null;
  error: string | null;
  visitor_ip: string | null;
  created_at: string;
};
