
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mouvegojknmgjydgwnwa.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vdXZlZ29qa25tZ2p5ZGd3bndhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NzQ5OTQsImV4cCI6MjA1NzI1MDk5NH0.ePal4ideayjpOUuQutDTZNSET9EI-tldQ0E147d15B0";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
