 import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jvirnmqoonkauanvslun.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2aXJubXFvb25rYXVhbnZzbHVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5Mzc5NzcsImV4cCI6MjA2NjUxMzk3N30.FGswJLV_jUUkkGbhuxwJXaSBnpzT9m73Rnw9dBBZ_70';

const supabase = createClient(supabaseUrl, supabaseKey);

async function listBuckets() {
  const { data, error } = await supabase.storage.listBuckets();
  if (error) {
    console.error('Error listing buckets:', error);
    process.exit(1);
  } else {
    console.log('Buckets:', data);
  }
}

listBuckets(); 