import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aupuitairmcptolkajsc.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1cHVpdGFpcm1jcHRvbGthanNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU2NTYyMjksImV4cCI6MjAwMTIzMjIyOX0.SCwwYbK5sz7AH8zDrc2GnPI6fj6c2rhMZPUquMsM0Xs';
const supabase = createClient(supabaseUrl, supabaseKey);

console.log(process.env);
console.log('Init supabase: ', supabase);

export default function useSupabase() {
  return { supabase };
}
