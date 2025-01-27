import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vrwrmsgldvbiwgpcdclq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyd3Jtc2dsZHZiaXdncGNkY2xxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NjM1MTMsImV4cCI6MjA1MjQzOTUxM30.ffnEfp3Xx004OTLOB5R-33T7XSRrA2kUPiKekvxW2EE";

export const supabase = createClient(supabaseUrl, supabaseKey);
