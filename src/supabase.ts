import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tzlkzsqdkbpsfyqdqffk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6bGt6c3Fka2Jwc2Z5cWRxZmZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNjg4NzksImV4cCI6MjA2Mzg0NDg3OX0.vXXzoi45N1evxFaOxckik4N2n-oUTM6qqWuhaCwoD58';

export const supabase = createClient(supabaseUrl, supabaseKey);
